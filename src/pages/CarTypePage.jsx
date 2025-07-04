import React, { useState, useEffect } from "react";
import { CarCard, Layout } from "../components";
import { URL } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoriesQuery } from "../services/carCategoryApi";
import { useLazyCarsQuery } from "../services/carApi";
import { CAR_LIST_QUERY } from "../utils/carUtils";
import { useBrandsQuery } from "../services/brandApi";

const CarTypePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [carsBySubCategories, setCarsBySubCategories] = useState({});
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const { data: brandsData } = useBrandsQuery({
    fields: ["car_Brand", "slug", "id"],
    populate: {
      logo: {
        fields: ["url"],
      },
    },
  });

  const brandList = brandsData?.data ? brandsData?.data : [];
  // Fetch category data
  const { data: categoryData, isLoading: isLoadingCategory } =
    useCategoriesQuery({
      populate: {
        car_subcategories: {
          fields: ["id", "categorySubType", "slug"],
        },
      },
      filters: {
        slug: { $eq: params?.type },
      },
    });

  const categoryDetails = categoryData?.data?.[0] || {};
  const [fetchCars] = useLazyCarsQuery();

  // Fetch cars for each subcategory
  useEffect(() => {
    if (categoryDetails?.car_subcategories?.length > 0) {
      setIsLoadingCars(true);
      const subcategoryPromises = categoryDetails.car_subcategories.map(
        (subCat) => {
          return fetchCars({
            ...CAR_LIST_QUERY,
            pagination: { limit: 4 },
            filters: {
              car_subcategory: { slug: { $eq: subCat.slug } },
            },
          }).unwrap();
        }
      );

      Promise.all(subcategoryPromises)
        .then((results) => {
          const carsData = {};
          categoryDetails.car_subcategories.forEach((subCat, index) => {
            carsData[subCat.slug] = {
              cars: results[index]?.data || [],
              subCategory: subCat?.categorySubType,
            };
          });
          setCarsBySubCategories(carsData);
        })
        .finally(() => setIsLoadingCars(false));
    }
  }, [categoryDetails, fetchCars]);
  console.log(carsBySubCategories);
  // Loading state
  if (isLoadingCategory || isLoadingCars) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white">
        <div className="mb-10 px-6 gap-4 flex flex-col items-center justify-center pt-[100px]">
          {/* Subcategory Navigation */}
          <div className="px-4 flex gap-3 overflow-x-auto no-scrollbar">
            {categoryDetails?.car_subcategories?.map((carType) => (
              <span
                key={carType.id}
                onClick={() =>
                  navigate(`/product-category/${params?.type}/${carType.slug}`)
                }
                className="bg-gray-100 px-6 py-4 border-1 border-primary rounded min-w-fit cursor-pointer hover:bg-primary hover:text-white transition-colors"
              >
                {carType.categorySubType}
              </span>
            ))}
          </div>
          {/* Brand Logos */}
          <div className="w-full">
            <div className="flex w-full overflow-x-auto no-scrollbar py-2">
              <div className="inline-flex space-x-4 justify-center w-full">
                {brandList.map((brandItem, index) => (
                  <div
                    onClick={() => navigate(`/rent/${brandItem?.slug}`)}
                    key={index}
                    className="cursor-pointer rounded-lg border-1 flex items-center justify-center px-6 py-3 border-primary hover:bg-gray-100"
                  >
                    <img
                      src={URL + brandItem?.logo?.url}
                      className="w-[40px] h-[40px] object-contain"
                      alt={brandItem?.car_Brand}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Dynamic Subcategory Sections */}
          <div className="w-full px-8">
            {Object.entries(carsBySubCategories).map(([key, value]) => {
              return value && value?.cars && value?.cars.length > 0 ? (
                <div
                  key={key}
                  className="flex items-center justify-center py-6 gap-4 flex-col border-b-2 border-primary border-dotted"
                >
                  <h1 className="text-xl md:text-2xl font-bold text-primary">
                    {value.subCategory}
                  </h1>

                  <div className="w-full px-4">
                    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
                      {value?.cars &&
                        value?.cars.length > 0 &&
                        value?.cars.map((carItem, index) => (
                          <CarCard
                            onHandleActi
                            link={`${window.location.origin}/car/${carItem.slug}`}
                            on={() => navigate(`/car/${carItem.slug}`)}
                            className={
                              "w-[80vw] " + // Mobile: full-width scroll
                              "md:w-[calc(50%-20px)] " + // Tablet: 2 cards per row
                              "lg:w-[calc(25%-20px)] " + // Desktop: 4 cards (when not scrolling)
                              "xl:w-[300px]" // Force desktop horizontal scroll
                            }
                            index={index}
                            price={carItem.pricePerDay}
                            imgUrl={
                              `${URL}` +
                              `${
                                carItem?.images && carItem.images.length > 0
                                  ? carItem.images[0].url
                                  : ""
                              }`
                            }
                            logo={
                              `${URL}` +
                              `${
                                carItem?.brand.logo.url
                                  ? carItem?.brand.logo.url
                                  : ""
                              }`
                            }
                            title={carItem.name}
                          />
                        ))}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/product-category/${params?.type}/${key}`)
                    }
                    className="text-white bg-primary rounded font-bold px-6 py-2 hover:bg-primary-dark transition-colors cursor-pointer"
                  >
                    View More
                  </button>
                </div>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarTypePage;
