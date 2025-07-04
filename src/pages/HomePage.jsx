import React, { useState, useEffect } from "react";
import { Button, CarBrandCard, CarCard, Layout } from "../components";
import { useBrandsQuery } from "../services/brandApi";
import { useCategoriesQuery } from "../services/carCategoryApi";
import { useLazyCarsQuery } from "../services/carApi";
import { URL } from "../data";

import { useNavigate } from "react-router-dom";
import { CAR_LIST_QUERY } from "../utils/carUtils";
const HomePage = () => {
  const [carsByCategories, setCarsByCategories] = useState({});
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const { data: categoryData, isLoading: isLoadingCategory } =
    useCategoriesQuery({
      fields: ["slug", "cartype"],
      filters: {
        slug: { $ne: "exotic-cars" },
      },
    });
  const categoryList =
    categoryData && categoryData?.data ? categoryData?.data : [];
  const [fetchCars] = useLazyCarsQuery();

  // Fetch cars for each subcategory
  useEffect(() => {
    if (categoryList.length > 0) {
      setIsLoadingCars(true);
      const categoryPromises = categoryList.map((cat) => {
        return fetchCars({
          ...CAR_LIST_QUERY,
          pagination: { limit: 4 },
          filters: {
            car_category: { slug: { $eq: cat.slug } },
          },
        }).unwrap();
      });

      Promise.all(categoryPromises)
        .then((results) => {
          const carsData = {};
          categoryList.forEach((cat, index) => {
            carsData[cat.slug] = {
              cars: results[index]?.data || [],
              cat: cat?.cartype,
            };
          });
          setCarsByCategories(carsData);
        })
        .finally(() => setIsLoadingCars(false));
    }
  }, [categoryList, fetchCars]);
  const { data: brandsData } = useBrandsQuery({
    fields: ["car_Brand", "slug", "id"],
    populate: {
      logo: {
        fields: ["url"],
      },
    },
  });

  const brandList = brandsData?.data ? brandsData?.data : [];
  const navigate = useNavigate();
  return (
    <Layout isHome>
      <div className="bg-white">
        <div className="mb-10 px-6 gap-2 flex flex-col items-center justify-center ">
          <p className="text-xs text-gray-500">
            Rotana Star luxury car rental in Dubai offers a fair and competitive
            pricing service. Our luxury car fleet in Dubai includes all brands
            with FREE delivery. Choose your luxury car from our fleet, including
            Ferrari, Lamborghini, BMW, Audi, McLaren, Mercedes, Rolls Royce,
            Porsche, Range Rover, Bentley, and more. We have a clear zero
            deposit policy, straight forward transactions, and no hidden fees or
            costs.
          </p>
          <div className="flex w-full flex-wrap items-center justify-center md:justify-between gap-4 text-center md:text-left">
            <h1 className="text-lg md:text-2xl font-bold">
              SELECT A CAR FOR RENT BY BRAND
            </h1>
            <button
              className="bg-white hidden md:flex items-center justify-center gap-1 text-sm text-primary cursor-pointer"
              onClick={() => navigate("/car-rental-brands")}
            >
              All Brands <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="w-full">
            {/* Mobile: 2-column grid */}
            <div className="grid grid-cols-2 gap-2 w-full md:hidden">
              {brandList.map((brand, index) => (
                <div
                  key={index}
                  className={
                    index === brandList.length - 1 && brandList.length % 2 !== 0
                      ? "col-span-2 md:col-span-none md:flex-shrink-0"
                      : "md:flex-shrink-0"
                  }
                >
                  <CarBrandCard
                    onClick={() => navigate(`/rent/${brand?.slug}`)}
                    title={brand.car_Brand}
                    imgUrl={URL + brand?.logo?.url}
                  />
                </div>
              ))}
            </div>

            {/* Desktop: Horizontal scroll container */}
            <div className="hidden md:block w-full overflow-x-auto no-scrollbar py-2">
              <div className="inline-flex space-x-4 min-w-max w-full">
                {brandList.map((brand, index) => (
                  <CarBrandCard
                    onClick={() => navigate(`/rent/${brand?.slug}`)}
                    key={index}
                    className="flex-shrink-0"
                    title={brand.car_Brand}
                    imgUrl={URL + brand?.logo?.url}
                  />
                ))}
              </div>
            </div>
          </div>
          <Button
            className="block md:hidden"
            onClick={() => navigate("/car-rental-brands")}
          >
            All Brands <i className="fa-solid fa-arrow-right"></i>
          </Button>
        </div>
        <img
          src="https://www.rotanastar.ae/wp-content/uploads/2025/05/offer-banner-1536x802.webp"
          alt="banner"
        />

        <div className="flex flex-col items-center justify-center">
          {Object.entries(carsByCategories).map(([key, value]) => {
            return value?.cars?.length > 0 ? (
              <div
                className="flex flex-col items-center justify-center py-6 gap-4 w-full px-4 md:px-8"
                key={key}
              >
                <h1 className="text-lg md:text-2xl font-bold uppercase text-center">
                  {value?.cat} FOR RENT IN DUBAI
                </h1>
                <p className="text-xs md:text-sm text-gray-500 text-center">
                  Browse our wide catalog of {value?.cat} for rent by category
                </p>

                {/* Responsive Car Card Container */}
                <div className="w-full">
                  <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
                    {value?.cars.map((carItem, index) => (
                      <CarCard
                        link={`${window.location.origin}/car/${carItem.slug}`}
                        onHandleAction={() => navigate(`/car/${carItem.slug}`)}
                        className={
                          "w-full " + // Full width for small screens
                          "md:w-[calc(50%-1rem)] " + // 2 per row for medium
                          "lg:w-[calc(33.333%-1rem)] " + // 3 per row for large
                          "xl:w-[300px]" // Fixed for very large
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
                            carItem?.brand?.logo?.url
                              ? carItem.brand.logo.url
                              : ""
                          }`
                        }
                        title={carItem.name}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  className="rounded-[1px] md:w-max text-xs border-4"
                  onClick={() => navigate(`/cartype/${key}`)}
                >
                  All {value?.cat}{" "}
                  <i className="fa-solid fa-chevron-right ml-1"></i>
                </Button>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
