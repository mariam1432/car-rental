import React, { useState } from "react";
import {
  Accordion,
  ImageCarousel,
  Layout,
  CarCard,
  ZigzagUnderline,
} from "../components";
import { faqsData, sampleImages } from "../data";
import { useParams } from "react-router-dom";
const CarDetailPage = () => {
  const crumbNavItems = [
    { name: "Home", path: "/" },
    { name: "Luxury", path: "/cartype/luxury-car-rentals" },
    { name: "Luxury SUV", path: "product-category/luxury/luxury-suv/" },
    { name: "Audi 2020", path: "/car/audi-q7-2020" },
  ];
  const features = {
    Model: "2021",
    Insurance: "Full",
    Deposite: "No",
    Delivery: "Free",
    KMs: "900",
    min_age: "18",
  };
  const carFeatures = [
    { icon: "fa-solid fa-car", label: "Car Name", value: "Rolls Royce" },
    { icon: "fa-solid fa-gears", label: "Settings", value: "V12" },
    { icon: "fa-solid fa-oil-can", label: "Oil", value: "Auto" },
    { icon: "fa-solid fa-palette", label: "Color", value: "Black" },
    { icon: "fa-solid fa-users", label: "Users", value: "4" },
    { icon: "fa-solid fa-door-closed", label: "No of doors", value: "4" },
    { icon: "fa-solid fa-briefcase", label: "storage", value: "4" },
    { icon: "fa-solid fa-car-burst", label: "Insurance", value: "Yes" },
    { icon: "fa-solid fa-bluetooth", label: "bluetooth", value: "Yes" },
    { icon: "fa-solid fa-street-view", label: "Streetview", value: "yes" },
    { icon: "fa-solid fa-video", label: "Video camera", value: "yes" },
    { icon: "fa-solid fa-display", label: "display screen", value: "yes" },
    { icon: "fa-solid fa-user-shield", label: "display screen", value: "yes" },
    { icon: "fa-solid fa-volume-high", label: "sound", value: "yes" },
    { icon: "fa-solid fa-music", label: "music", value: "yes" },
  ];

  const duration = ["Daily", "Weekly", "Monthly"];
  const FeatureItem = ({ label, value }) => (
    <div className="flex flex-row items-center gap-2 text-lg font-semibold text-primary">
      <i className="fa-solid fa-check"></i>
      <span className="text-gray-800">{label}</span> <span>{value}</span>
    </div>
  );
  const PriceItem = ({ text }) => (
    <div className="p-5 w-full border-1 border-dashed border-gray-700 text-base font-semibold">
      <p>{text}</p>
      <p className="text-primary">Ask for Price</p>
    </div>
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    <Layout>
      <div className="bg-white ">
        <div className="bg-gray-100 flex flex-col gap-5 text-center px-5 md:px-[15%] py-5 md:py-15">
          <h2 className="text-primary text-2xl font-bold">
            Rent Lamborghini URUS with Rotana Star
          </h2>

          <span className="text-xs text-gray-700">
            {crumbNavItems.map((crumb, index) => (
              <a
                index={index}
                className="hover:text-gray-900"
                href={crumb.path}
              >
                {crumb.name}
                {index === crumbNavItems.length - 1 ? "" : " / "}
              </a>
            ))}
          </span>
          <div className="flex flex-col-reverse md:flex-row gap-10 items-start justify-between">
            <div className="w-[100%] md:w-[60%] flex flex-col gap-5 justify-between">
              <div className="flex flex-col gap-2 md:flex-row justify-between">
                <ZigzagUnderline
                  text="Lamgorgini URUS"
                  color="black"
                  alignSelf={"start"}
                />
                <div className="w-full md:w-fit flex flex-col items-end justify-end text-white text-bold text-lg bg-linear-65 from-white to-primary p-1">
                  <span>Starting from</span>
                  <span className="text-lg">2000 AED/day</span>
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col gap-5">
                  {Object.entries(features)
                    .splice(0, 3)
                    .map(([key, value], index) => (
                      <FeatureItem key={index} label={key} value={value} />
                    ))}
                </div>

                <div className="flex flex-col gap-5">
                  {Object.entries(features)
                    .splice(3, 5)
                    .map(([key, value], index) => (
                      <FeatureItem key={index} label={key} value={value} />
                    ))}
                </div>
              </div>
              <div className="flex gap-5 ">
                {duration.map((d) => (
                  <PriceItem text={d} />
                ))}
              </div>
              <div className="flex items-center gap-5">
                <button
                  className="bg-green-600 text-white flex flex-row items-center gap-1 py-2 px-8 cursor-pointer transition-all duration-300 ease-in-out 
                    hover:-translate-y-1"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>Whatsapp</span>
                </button>
                <button className="bg-primary text-white flex flex-row items-center gap-1 py-2 px-8 cursor-pointer">
                  Contact Us
                </button>
              </div>
            </div>
            <div className="w-[100%] md:w-[40%]">
              <ImageCarousel images={sampleImages} />
            </div>
          </div>
        </div>
        {/* seconds container */}
        <div className="px-5 md:px-[15%] py-10 w-full md:w-[60%]">
          <h1 className="text-xl">Car Features</h1>
          <div className="grid grid-cols-3">
            {carFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600"
              >
                <i className={`${feature.icon} text-primary`} />
                <p className="text-[10px] font-medium text-gray-800">
                  {feature.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 md:px-[15%] py-10 w-full md:w-[75%] flex flex-col gap-2">
          <h1 className="text-lg font-semibold">
            Rent a Rolls Royce Cullinan Black in Dubai with Rotana Star
          </h1>
          <p className="text-sm">
            A special car only for special people.An ultra-impressive, four-seat
            SUV offering high-end exclusivity and the performance we have come
            to expect from the Rolls-Royce car brand. The car has an 8-speed
            automatic gearbox and a powerful 6.8-litre V12 engine, achieving 570
            bhp and 0 to 100 km/h in 5.2 seconds. The Cullinan Black Dubai is
            not all power, however. The exterior has subtle but opulent styling,
            while the interior is plush and full of gadgetry.For high-impact and
            practicality, the Rolls Royce Cullinan Dubai is the lead SUV in the
            pack. One thing is for sure: the car will make a positive first
            impression in Dubai and the UAE. For families and friends, this SUV
            brings a slice of Middle Eastern high-life and an amazingly
            comfortable drive. For business, the Cullinan Dubai makes a
            statement of success and intent – guaranteed to clinch that
            important contract.As an established specialist for Rolls Royce
            Cullinan Black rental in Dubai, at Rotana Star Rent a Car, we ensure
            affordable prices and top-notch service. Our huge range of hire
            vehicles is entirely owned by ourselves. This is why we provide the
            best selection of luxury cars at the lowest possible price.To begin
            the process to secure a Rolls Royce Cullinan for rent, get in touch
            with us by sending in an enquiry. This is easily done on the
            website, but we also accept enquiries by telephone. After, we will
            respond with further details and to complete the sale. At the time
            of delivery, we are flexible and provide two choices: accept a
            door-to-door delivery or collect the car at our Dubai showroom.
          </p>
          <h1 className="text-lg font-semibold">
            Rent a Rolls Royce Cullinan Black from Rotana Star
          </h1>
          <p>
            Rent a Rolls Royce Cullinan in Dubai. We strive to provide the best
            service in the area. At Rotana Star , we have many years of
            experience in the hire car field. As a result, we can bring value
            for money and top-notch service – guaranteed. A key reason for this
            is because we own our entire fleet of vehicles. This means we have
            more flexibility on price, unlike our competitors, who often lease
            their cars on a long-term basis.At Rotana Star, we make the process
            to hire a Rolls Royce Cullinan Black for rent easy. The first step
            is the browse our website to find a suitable price. After this,
            contact us by sending in a request via our online form or by
            telephone. We aim to get back in touch soon after to finalize the
            deal. When the time comes to deliver the car, we offer two options:
            either pick-up the car from our Dubai showroom or take advantage of
            our popular door-to-door delivery service.Our premium car rental
            services allow you the chance to rent a Rolls Royce Cullinan Black
            in Dubai or other Luxury brand cars at affordable rates. Book online
            or over the phone and collect your rent a car or get it delivered in
            Dubai.
          </p>
        </div>
        <div className="px-5 md:px-[15%] py-10">
          <h1 className="text-xl font-bold text-center mb-10">
            Frequently Asked Questions​
          </h1>

          {/* 2-Column Grid Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
            {/* Column 1 - Auto-split items */}
            <div>
              {/* space-y-4 for consistent spacing */}
              {faqsData
                ?.slice(0, Math.ceil(faqsData.length / 2))
                .map((data) => (
                  <Accordion
                    key={data.id}
                    title={data.title}
                    index={data.id}
                    toggleAccordion={() =>
                      setActiveIndex(activeIndex === data.id ? null : data.id)
                    }
                    activeIndex={activeIndex}
                    content={data.content}
                    accordionStyle="secondary"
                  />
                ))}
            </div>

            {/* Column 2 - Remaining items */}
            <div>
              {faqsData?.slice(Math.ceil(faqsData.length / 2)).map((data) => (
                <Accordion
                  key={data.id}
                  title={data.title}
                  index={data.id}
                  toggleAccordion={() =>
                    setActiveIndex(activeIndex === data.id ? null : data.id)
                  }
                  activeIndex={activeIndex}
                  content={data.content}
                  accordionStyle="secondary"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 px-5 md:px-[15%] py-10 w-full">
          <ZigzagUnderline text="Related Cars" />
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {[...Array(6)].map((_, index) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default CarDetailPage;
