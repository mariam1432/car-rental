import React from "react";
import { Button, CarBrandCard, CarCard, Layout } from "../components";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const list = [...Array(11)];
  const carList = [...Array(4)];
  const navigate = useNavigate();
  return (
    <Layout isHome>
      <div className="bg-white">
        <div className="mb-10 px-6 gap-2 flex flex-col items-center justify-center ">
          <p className="text-lg text-gray-500">
            Rotana Star luxury car rental in Dubai offers a fair and competitive
            pricing service. Our luxury car fleet in Dubai includes all brands
            with FREE delivery. Choose your luxury car from our fleet, including
            Ferrari, Lamborghini, BMW, Audi, McLaren, Mercedes, Rolls Royce,
            Porsche, Range Rover, Bentley, and more. We have a clear zero
            deposit policy, straight forward transactions, and no hidden fees or
            costs.
          </p>
          <div className="flex w-full items-center justify-center md:justify-between">
            <h1 className="text-lg md:text-2xl font-bold">
              SELECT A CAR FOR RENT BY BRAND
            </h1>
            <button className=" bg-white hidden md:block flex items-center justify-center gap-1 text-sm text-primary cursor-pointer">
              All Brands <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
          <div className="w-full">
            {/* Mobile: 2-column grid */}
            <div className="grid grid-cols-2 gap-2 w-full md:hidden">
              {list.map((l, index) => (
                <div
                  key={index}
                  className={
                    index === list.length - 1 && list.length % 2 !== 0
                      ? "col-span-2 md:col-span-none md:flex-shrink-0"
                      : "md:flex-shrink-0"
                  }
                >
                  <CarBrandCard
                    title="FORD"
                    imgUrl="https://www.logo.wine/a/logo/Ford_of_Britain/Ford_of_Britain-Logo.wine.svg"
                  />
                </div>
              ))}
            </div>

            {/* Desktop: Horizontal scroll container */}
            <div className="hidden md:block w-full overflow-x-auto no-scrollbar py-2">
              <div className="inline-flex space-x-4 min-w-max w-full">
                {list.map((l, index) => (
                  <CarBrandCard
                    key={index}
                    className="flex-shrink-0"
                    title="FORD"
                    imgUrl="https://www.logo.wine/a/logo/Ford_of_Britain/Ford_of_Britain-Logo.wine.svg"
                  />
                ))}
              </div>
            </div>
          </div>
          <Button className="block md:hidden">
            All Brands <i className="bx bx-right-arrow-alt"></i>
          </Button>
        </div>
        <img
          src="https://www.rotanastar.ae/wp-content/uploads/2025/05/offer-banner-1536x802.webp"
          alt="banner"
        />
        {/* Luxury Car cards section */}
        <div className="flex items-center justify-center py-6 gap-4 flex-col">
          <h1 className="text-lg md:text-2xl font-bold">
            LUXURY CARS FOR RENT IN DUBAI
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            Browse our wide catalog of luxury cars for rent by category
          </p>
          <div className="w-full px-4">
            {/* Mobile & Desktop: Horizontal scroll | Tablet: 2 cards per row */}
            <div className="flex flex-nowrap gap-4 overflow-x-auto no-scrollbar md:flex-wrap md:justify-center">
              {carList.map((l, index) => (
                <CarCard
                  onHandleAction={() => navigate("/car/mercedes-cle")}
                  className={
                    "flex-shrink-0 w-[85vw] " + // Mobile: full-width scroll
                    "md:w-[calc(50%-16px)] " + // Tablet: 2 cards per row
                    "lg:w-[calc(25%-16px)] " + // Desktop: 4 cards (when not scrolling)
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
          <Button className="rounded-[1px] md:w-max text-xs border-4">
            All Luxury Cars <i class="fa-solid fa-chevron-right"></i>
          </Button>
        </div>
        {/* Luxury Car cards section */}
        <div className="flex items-center justify-center py-6 gap-4 flex-col">
          <h1 className="text-lg md:text-2xl font-bold">
            SPORTS CARS FOR RENT IN DUBAI
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            Browse our wide catalog of luxury cars for rent by category
          </p>
          <div className="w-full px-4">
            {/* Mobile & Desktop: Horizontal scroll | Tablet: 2 cards per row */}
            <div className="flex flex-nowrap gap-4 overflow-x-auto no-scrollbar md:flex-wrap md:justify-center">
              {carList.map((l, index) => (
                <CarCard
                  onHandleAction={() => navigate("/car/mercedes-cle")}
                  className={
                    "flex-shrink-0 w-[85vw] " + // Mobile: full-width scroll
                    "md:w-[calc(50%-16px)] " + // Tablet: 2 cards per row
                    "lg:w-[calc(25%-16px)] " + // Desktop: 4 cards (when not scrolling)
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
          <Button className="rounded-[1px] md:w-max text-xs border-4">
            All Sports Cars <i class="fa-solid fa-chevron-right"></i>
          </Button>
        </div>{" "}
        {/* Luxury Car cards section */}
        <div className="flex items-center justify-center py-6 gap-4 flex-col">
          <h1 className="text-lg md:text-2xl font-bold">
            SUV CARS FOR RENT IN DUBAI
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            Browse our wide catalog of luxury cars for rent by category
          </p>
          <div className="w-full px-4">
            {/* Mobile & Desktop: Horizontal scroll | Tablet: 2 cards per row */}
            <div className="flex flex-nowrap gap-4 overflow-x-auto no-scrollbar md:flex-wrap md:justify-center">
              {carList.map((l, index) => (
                <CarCard
                  onHandleAction={() => navigate("/car/mercedes-cle")}
                  className={
                    "flex-shrink-0 w-[85vw] " + // Mobile: full-width scroll
                    "md:w-[calc(50%-16px)] " + // Tablet: 2 cards per row
                    "lg:w-[calc(25%-16px)] " + // Desktop: 4 cards (when not scrolling)
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
          <Button className="rounded-[1px] md:w-max text-xs border-4">
            All SUV Cars <i class="fa-solid fa-chevron-right"></i>
          </Button>
        </div>
        {/* Luxury Car cards section */}
        <div className="flex items-center justify-center py-6 gap-4 flex-col">
          <h1 className="text-lg md:text-2xl font-bold">
            ECONOMY CARS FOR RENT IN DUBAI
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            Browse our wide catalog of luxury cars for rent by category
          </p>
          <div className="w-full px-4">
            {/* Mobile & Desktop: Horizontal scroll | Tablet: 2 cards per row */}
            <div className="flex flex-nowrap gap-4 overflow-x-auto no-scrollbar md:flex-wrap md:justify-center">
              {carList.map((l, index) => (
                <CarCard
                  onHandleAction={() => navigate("/car/mercedes-cle")}
                  className={
                    "flex-shrink-0 w-[85vw] " + // Mobile: full-width scroll
                    "md:w-[calc(50%-16px)] " + // Tablet: 2 cards per row
                    "lg:w-[calc(25%-16px)] " + // Desktop: 4 cards (when not scrolling)
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
          <Button className="rounded-[1px] md:w-max text-xs border-4">
            All Economy Cars <i class="fa-solid fa-chevron-right"></i>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
