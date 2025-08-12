import React, { useState, useEffect, useMemo } from "react";
import { CarCard, Layout, Loader, ErrorMessage } from "../components";
import { URL } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoriesQuery } from "../services/carCategoryApi";
import { useLazyCarsQuery } from "../services/carApi";
import { CAR_LIST_QUERY } from "../utils/carUtils";
import { useBrandsQuery } from "../services/brandApi";

const CarTypePage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [carsBySubCategories, setCarsBySubCategories] = useState({});
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const [error, setError] = useState(null);

  // Fetch brands data
  const {
    data: brandsData,
    error: brandsError,
    isLoading: isLoadingBrands,
  } = useBrandsQuery({
    fields: ["car_Brand", "slug", "id"],
    populate: {
      logo: {
        fields: ["url"],
      },
    },
  });

  // Fetch category data
  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    error: categoryError,
  } = useCategoriesQuery({
    populate: {
      car_subcategories: {
        fields: ["id", "categorySubType", "slug"],
      },
    },
    filters: {
      slug: { $eq: type },
    },
  });

  const [fetchCars] = useLazyCarsQuery();

  // Memoized derived data
  const categoryDetails = useMemo(
    () => categoryData?.data?.[0] || {},
    [categoryData]
  );

  const brandList = useMemo(() => brandsData?.data || [], [brandsData]);

  // Fetch cars for each subcategory
  useEffect(() => {
    if (categoryDetails?.car_subcategories?.length > 0) {
      const fetchSubcategoryCars = async () => {
        try {
          setIsLoadingCars(true);
          setError(null);

          const subcategoryPromises = categoryDetails.car_subcategories.map(
            (subCat) =>
              fetchCars({
                ...CAR_LIST_QUERY,
                pagination: { limit: 4 },
                filters: {
                  car_subcategory: { slug: { $eq: subCat.slug } },
                },
              }).unwrap()
          );

          const results = await Promise.all(subcategoryPromises);

          const carsData = {};
          categoryDetails.car_subcategories.forEach((subCat, index) => {
            carsData[subCat.slug] = {
              cars: results[index]?.data || [],
              subCategory: subCat?.categorySubType,
            };
          });

          setCarsBySubCategories(carsData);
        } catch (err) {
          console.error("Failed to fetch cars:", err);
          setError("Failed to load car data. Please try again later.");
        } finally {
          setIsLoadingCars(false);
        }
      };

      fetchSubcategoryCars();
    }
  }, [categoryDetails, fetchCars]);

  // Handle errors
  if (brandsError || categoryError) {
    return (
      <Layout>
        <ErrorMessage
          message="Failed to load page data. Please try again later."
          onRetry={() => window.location.reload()}
        />
      </Layout>
    );
  }

  // Loading state
  if (isLoadingCategory || isLoadingBrands) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  // No category found
  if (!categoryDetails.id) {
    return (
      <Layout>
        <ErrorMessage
          message={`No car category found for "${type}"`}
          onRetry={() => navigate("/")}
          retryText="Back to Home"
        />
      </Layout>
    );
  }

  const renderSubcategoryNavigation = () => (
    <div className="px-4 flex gap-3 overflow-x-auto no-scrollbar pb-4">
      {categoryDetails.car_subcategories?.map((carType) => (
        <button
          key={carType.id}
          onClick={() => navigate(`/product-category/${type}/${carType.slug}`)}
          className="bg-gray-100 px-6 py-4 border-1 border-primary rounded min-w-fit cursor-pointer hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
          aria-label={`View ${carType.categorySubType} cars`}
        >
          {carType.categorySubType}
        </button>
      ))}
    </div>
  );

  const renderBrandLogos = () => (
    <div className="w-full mb-8">
      <h2 className="text-lg font-bold text-center mb-4">Available Brands</h2>
      <div className="flex overflow-x-auto no-scrollbar py-2">
        <div className="inline-flex space-x-4 justify-center w-full">
          {brandList.map((brandItem) => (
            <button
              key={brandItem.id}
              onClick={() => navigate(`/rent/${brandItem.slug}`)}
              className="cursor-pointer rounded-lg border-1 flex items-center justify-center px-6 py-3 border-primary hover:bg-gray-100 transition-colors"
              aria-label={`View ${brandItem.car_Brand} cars`}
            >
              {brandItem?.logo?.url ? (
                <img
                  src={`${brandItem.logo.url}`}
                  className="w-[40px] h-[40px] object-contain"
                  alt={brandItem.car_Brand}
                  loading="lazy"
                />
              ) : (
                <span className="text-sm">{brandItem.car_Brand}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubcategorySections = () => {
    if (error) {
      return (
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
          className="my-8"
        />
      );
    }

    if (Object.keys(carsBySubCategories).length === 0) {
      return (
        <div className="text-center py-8">
          <p>No cars available in this category</p>
        </div>
      );
    }

    return (
      <div className="w-full px-4 md:px-8">
        {Object.entries(carsBySubCategories).map(([key, value]) => {
          if (!value?.cars?.length) return null;

          return (
            <section
              key={key}
              className="flex items-center justify-center py-6 gap-4 flex-col border-b-2 border-primary border-dotted last:border-b-0"
            >
              <h2 className="text-xl md:text-2xl font-bold text-primary text-center">
                {value.subCategory}
              </h2>

              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {value.cars.map((carItem) => (
                    <CarCard
                      key={carItem.id}
                      link={`${window.location.origin}/car/${carItem.slug}`}
                      onHandleAction={() => navigate(`/car/${carItem.slug}`)}
                      price={carItem.pricePerDay}
                      imgUrl={
                        carItem?.images?.[0]?.url
                          ? `${carItem.images[0].url}`
                          : ""
                      }
                      logo={
                        carItem?.brand?.logo?.url
                          ? `${carItem.brand.logo.url}`
                          : ""
                      }
                      title={carItem.name}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate(`/product-category/${type}/${key}`)}
                className="text-white bg-primary rounded font-bold px-6 py-2 hover:bg-primary-dark transition-colors"
                aria-label={`View more ${value.subCategory} cars`}
              >
                View More
              </button>
            </section>
          );
        })}
      </div>
    );
  };

  return (
    <Layout>
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          {renderSubcategoryNavigation()}
          {renderBrandLogos()}
          {renderSubcategorySections()}
        </div>
      </div>
    </Layout>
  );
};

export default CarTypePage;
