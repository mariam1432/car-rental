import React, { useState } from "react";
import { CarCard, Layout, Pagination, Loader, EmptyState } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useCarsQuery } from "../services/carApi";
import { CAR_LIST_QUERY } from "../utils/carUtils";
import { URL } from "../data";

const CarListingByTypePage = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: carsData,
    isLoading,
    isError,
  } = useCarsQuery({
    ...CAR_LIST_QUERY,
    filters: {
      car_category: { slug: { $eq: params?.category } },
      car_subcategory: { slug: { $eq: params?.["sub-category"] } },
    },
    pagination: {
      page: selectedPage,
      pageSize: 15,
    },
  });

  const carList = carsData?.data || [];
  const pagination = carsData?.meta?.pagination || {};
  const totalCars = pagination?.total || 0;
  const categoryName = params?.category?.replace(/-/g, " ") || "";
  const subCategoryName = params?.["sub-category"]?.replace(/-/g, " ") || "";
  const handlePageChange = (page) => {
    setSelectedPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isError) {
    return (
      <Layout>
        <EmptyState
          title="Error Loading Cars"
          message="We couldn't load the car listings. Please try again later."
          actionText="Try Again"
          onAction={() => window.location.reload()}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full min-h-screen">
        {isLoading && <Loader />}

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
              {subCategoryName || categoryName || "Luxury Cars"} in Dubai
            </h1>
            {totalCars > 0 && (
              <p className="text-gray-600 mt-2">
                Showing {carList.length} of {totalCars} available cars
              </p>
            )}
          </div>

          {/* Car Listings */}
          {carList.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {carList.map((carItem) => (
                  <CarCard
                    key={carItem.id}
                    link={`/car/${carItem.slug}`}
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

              {pagination.pageCount > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    noOfPages={pagination.pageCount}
                    selectedPage={selectedPage}
                    handleSelectedPage={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            !isLoading && (
              <EmptyState
                title="No Cars Available"
                message={`We couldn't find any ${
                  subCategoryName || categoryName || ""
                } cars at the moment.`}
                actionText="Browse Other Cars"
                onAction={() => navigate("/")}
              />
            )
          )}

          {/* Promotional Banner */}
          <div className="mt-16 rounded-lg overflow-hidden">
            <div
              className="w-full h-64 md:h-96 flex items-center justify-center bg-cover bg-center relative"
              style={{
                backgroundImage: `url("https://imagecdnsa.zigwheels.ae/large/gallery/exterior/20/214/lamborghini-aventador-front-angle-low-view-689455.jpg")`,
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              >
                <h2 className="text-white text-2xl md:text-4xl font-bold uppercase">
                  {subCategoryName}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarListingByTypePage;
