import React, { useState } from "react";
import { CarCard, Layout, Pagination } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useCarsQuery } from "../services/carApi";
import { CAR_LIST_QUERY } from "../utils/carUtils";
import { URL } from "../data";
const CarListingByTypePage = () => {
  const [selectedPage, setSelectedPage] = useState(1);

  const params = useParams();
  const navigate = useNavigate();
  const { data: carsData } = useCarsQuery({
    ...CAR_LIST_QUERY,
    filters: {
      car_category: { slug: { $eq: params?.category } },
      car_subcategory: { slug: { $eq: params?.["sub-category"] } },
    },
  });
  const carList = carsData?.data ? carsData?.data : [];

  return (
    <Layout>
      <div className="w-full">
        <div className="pt-[50px]">
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {carList.map((carItem, index) => (
              <CarCard
                link={`${window.location.origin}/car/${carItem.slug}`}
                onHandleAction={() => navigate(`/car/${carItem.slug}`)}
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
                  `${carItem?.brand.logo.url ? carItem?.brand.logo.url : ""}`
                }
                title={carItem.name}
              />
            ))}
          </div>
          <Pagination
            noOfPages={4}
            selectedPage={selectedPage}
            handleSelectedPage={(pg) => setSelectedPage(pg)}
          />
          <div
            className="w-full h-[50vh] flex items-center justify-center mt-10 bg-no-repeat bg-center"
            style={{
              backdropFilter: `drop-shadow(8px 8px 10px green)`,

              backgroundSize: "cover",
              backgroundImage: `url("https://imagecdnsa.zigwheels.ae/large/gallery/exterior/20/214/lamborghini-aventador-front-angle-low-view-689455.jpg")`,
            }}
          >
            <h1 className="text-white text-3xl font-bold">LUXURY HIGH END</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarListingByTypePage;
