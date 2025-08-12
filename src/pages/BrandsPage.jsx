import React from "react";
import { Layout, CarBrandCard, Loader } from "../components";
import { useBrandsQuery } from "../services/brandApi";
import { URL } from "../data";
import { useNavigate } from "react-router-dom";

const BrandsPage = () => {
  const { data: brandsData, isLoading } = useBrandsQuery({
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
    <Layout>
      {isLoading && <Loader />}
      <div className="w-full bg-white px-8 sm:px-16 lg:px-25 py-30 sm:py-20 md:py-20 lg:py-10">
        <div className="max-w-7xl mx-auto">
          {/* Centering container */}
          <h1 className="text-3xl text-black font-semibold mb-8 text-center lg:text-left">
            Car Rental Brands
          </h1>
          {brandList && brandList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {brandList.map((brand, index) => (
                <div key={brand.id || index}>
                  <CarBrandCard
                    onClick={() => navigate(`/rent/${brand?.slug}`)}
                    title={brand.car_Brand}
                    imgUrl={URL + brand?.logo?.url}
                    itemsCenter
                    className={"flex items-center justify-center"}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No brands available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BrandsPage;
