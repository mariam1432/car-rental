import React, { useState } from "react";
import { CarCard, Layout, Loader, Pagination } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useCarsQuery } from "../services/carApi";
import { useBrandsQuery } from "../services/brandApi";
import { CAR_LIST_QUERY } from "../utils/carUtils";
import { URL } from "../data";

const RentByBrand = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(1);
  const params = useParams();

  const { data: bData, isLoading: isLoadingBrands } = useBrandsQuery({
    filters: {
      slug: { $eq: params?.brand },
    },
  });

  const { data: carsData, isLoading: isLoadingCars } = useCarsQuery({
    ...CAR_LIST_QUERY,
    filters: {
      brand: { slug: { $eq: params?.brand } },
    },
    pagination: {
      page: selectedPage,
      pageSize: 15,
    },
  });

  const brandData = bData?.data?.[0] || {};
  const carList = carsData?.data || [];
  const pagination = carsData?.meta?.pagination || {};
  const brandName = brandData?.car_Brand || "Luxury Car";

  const handlePageChange = (page) => {
    setSelectedPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      {(isLoadingBrands || isLoadingCars) && <Loader />}

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Car Listings Section */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 capitalize">
            Available {brandName} Models
          </h1>

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
                    className="w-full"
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
            !isLoadingCars && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  No {brandName} cars available at the moment.
                </p>
              </div>
            )
          )}
        </div>

        {/* Promotional Banner */}
        <div className="relative w-full h-64 md:h-96 my-12 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://imagecdnsa.zigwheels.ae/large/gallery/exterior/20/214/lamborghini-aventador-front-angle-low-view-689455.jpg")',
            }}
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
              Rent A {brandName} | Free Delivery
            </h2>
            <p className="text-white text-lg max-w-2xl">
              Rent a {brandName} at the best prices with free delivery option.
              Our fleet includes various models to choose from. Book today!
            </p>
          </div>
        </div>

        {/* Brand Information Section */}
        <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Why Rent {brandName} in Dubai?
          </h2>

          <div className="space-y-6 text-gray-700">
            <p>
              Arab Star's {brandName} rental service in Dubai offers the best
              prices for all models. Whether you're visiting or living in Dubai,
              we've got the best deals on the car of your dreams. We have
              competitive rates for all {brandName} cars available for rental
              service.
            </p>

            <p>
              A real car-lover can't resist this masterpiece. We have a great
              collection of {brandName} models for rent in Dubai, UAE. Get your
              supercar delivered free of charge to your location, and enjoy your
              stay in Dubai with style and comfort.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8">
              What to Expect When Renting {brandName} with Arab Star?
            </h3>

            <p>
              When you rent a {brandName} through Arab Star, you can expect the
              best possible prices with transparent and cost-effective rental
              process. Our mission is to provide top-notch rental services with
              a strong focus on safety. We offer flexible rental options
              including daily and weekly rates.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8">
              Rental Requirements
            </h3>

            <p>
              To rent a vehicle from the 'Supercars' category like {brandName},
              you must be at least 23 years old. We offer a range of unique car
              models at competitive market rates. These models are highly
              popular and frequently rented for self-drive purposes in Dubai.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8">Our Offers</h3>

            <p>
              At Arab Star, we offer the best rental packages starting from AED
              2500. We update our offers daily to provide you with the most
              competitive prices. Don't miss out on the opportunity to drive a
              {brandName} on your next trip to Dubai.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RentByBrand;
