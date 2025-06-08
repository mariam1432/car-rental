import React, { useState } from "react";
import { CarCard, Layout, Pagination } from "../components";
import { useNavigate } from "react-router-dom";

const CarListingByTypePage = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="w-full">
        <div className="pt-[50px]">
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {[...Array(13)].map((_, index) => (
              <CarCard
                onHandleAction={() => navigate("/car/mercedes-cle")}
                className={
                  "w-[80vw] " + // Mobile: full-width scroll
                  "md:w-[calc(50%-20px)] " + // Tablet: 2 cards per row
                  "lg:w-[calc(25%-20px)] " + // Desktop: 4 cards (when not scrolling)
                  "xl:w-[300px]" // Force desktop horizontal scroll
                }
                index={index}
                price={"899"}
                imgUrl={
                  "https://www.rotanastar.ae/wp-content/uploads/2025/02/DSC05378-scaled.jpg"
                }
                logo={
                  "https://www.rotanastar.ae/wp-content/uploads/2021/10/main-06.png"
                }
                title="Mercedes CLE 200 2025"
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
