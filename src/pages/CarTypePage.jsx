import React from "react";
import { CarCard, Layout } from "../components";
import { carBrandList } from "../data";
import { useNavigate } from "react-router-dom";
const CarTypePage = () => {
  const carTypesArray = [
    "Luxury Affordable",
    "Luxury High End",
    "Luxury Sports",
    "Luxury SUV",
  ];
  const navigate = useNavigate();
  const carList = [...Array(4)];
  return (
    <Layout>
      <div className="bg-white">
        <div className="mb-10 px-6 gap-4 flex flex-col items-center justify-center pt-[100px]">
          <div className="px-4 flex gap-3 overflow-x-auto no-scrollbar">
            {carTypesArray.map((carType) => (
              <span className="bg-gray-100 px-6 py-4 border-1 border-primary rounded min-w-fit cursor-pointer">
                {carType}
              </span>
            ))}
          </div>
          <div className="w-full">
            {/* Desktop: Horizontal scroll container */}
            <div className="flex w-full overflow-x-auto no-scrollbar py-2">
              <div className="inline-flex space-x-4 min-w-max w-full">
                {carBrandList.map((carItem, index) => (
                  <div
                    key={index}
                    className={
                      "cursor-pointer rounded-lg border-1 flex items-center justify-center px-6 py-3 border-primary"
                    }
                  >
                    <img src={carItem.logo} className="w-[40px] h-[40px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-8">
          <div className="flex items-center justify-center py-6 gap-4 flex-col border-b-2 border-primary border-dotted">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              LUXURY HIGH END
            </h1>

            <div className="w-full px-4">
              {/* Mobile & Desktop: Horizontal scroll | Tablet: 2 cards per row */}
              <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center ">
                {carList.map((l, index) => (
                  <CarCard
                    onHandleAction={() => navigate("/car/mercedes-cle")}
                    className={
                      "flex-shrink-0 w-[80vw] " + // Mobile: full-width scroll
                      "md:w-[calc(50%-20px)] " + // Tablet: 2 cards per row
                      "lg:w-[calc(25%-20px)] " + // Desktop: 4 cards (when not scrolling)
                      "xl:flex-shrink-0 xl:w-[300px]" // Force desktop horizontal scroll
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
            </div>
            <button className="text-white bg-primary rounded font-bold px-6 py-2">
              View More
            </button>
          </div>
          <div className="flex items-center justify-center py-6 gap-4 flex-col border-b-2 border-primary border-dotted">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              LUXURY MID RANGE
            </h1>
            <div className="w-full px-4">
              {/* Mobile & Desktop: Horizontal scroll | Tablet: 2 cards per row */}
              <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center ">
                {carList.map((l, index) => (
                  <CarCard
                    onHandleAction={() => navigate("/car/mercedes-cle")}
                    className={
                      "flex-shrink-0 w-[80vw] " + // Mobile: full-width scroll
                      "md:w-[calc(50%-20px)] " + // Tablet: 2 cards per row
                      "lg:w-[calc(25%-20px)] " + // Desktop: 4 cards (when not scrolling)
                      "xl:flex-shrink-0 xl:w-[300px]" // Force desktop horizontal scroll
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
            </div>
            <button className="text-white bg-primary rounded font-bold px-6 py-2">
              View More
            </button>
          </div>
          <div className="flex items-center justify-center py-6 gap-4 flex-col border-b-2 border-primary border-dotted">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              LUXURY SPORTS
            </h1>
            <div className="w-full px-4">
              {/* Mobile & Desktop: Horizontal scroll | Tablet: 2 cards per row */}
              <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center ">
                {carList.map((l, index) => (
                  <CarCard
                    onHandleAction={() => navigate("/car/mercedes-cle")}
                    className={
                      "flex-shrink-0 w-[80vw] " + // Mobile: full-width scroll
                      "md:w-[calc(50%-20px)] " + // Tablet: 2 cards per row
                      "lg:w-[calc(25%-20px)] " + // Desktop: 4 cards (when not scrolling)
                      "xl:flex-shrink-0 xl:w-[300px]" // Force desktop horizontal scroll
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
            </div>
            <button className="text-white bg-primary rounded font-bold px-6 py-2">
              View More
            </button>
          </div>
          <div className="flex items-center justify-center py-6 gap-4 flex-col border-b-2 border-primary border-dotted">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              LUXURY SUV'S
            </h1>
            <div className="w-full px-4">
              {/* Mobile & Desktop: Horizontal scroll | Tablet: 2 cards per row */}
              <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center ">
                {carList.map((l, index) => (
                  <CarCard
                    onHandleAction={() => navigate("/car/mercedes-cle")}
                    className={
                      "flex-shrink-0 w-[80vw] " + // Mobile: full-width scroll
                      "md:w-[calc(50%-20px)] " + // Tablet: 2 cards per row
                      "lg:w-[calc(25%-20px)] " + // Desktop: 4 cards (when not scrolling)
                      "xl:flex-shrink-0 xl:w-[300px]" // Force desktop horizontal scroll
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
            </div>
            <button className="text-white bg-primary rounded font-bold px-6 py-2">
              View More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarTypePage;
