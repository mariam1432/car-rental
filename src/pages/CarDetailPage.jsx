import React, { useState, useEffect } from "react";
import {
  Accordion,
  ImageCarousel,
  Layout,
  CarCard,
  ZigzagUnderline,
} from "../components";
import { faqsData, URL } from "../data";
import { useParams, useNavigate } from "react-router-dom";
import { useCarQuery, useLazyCarsQuery } from "../services/carApi";
import {
  CAR_LIST_QUERY,
  handleCallClick,
  handleWhatsAppClick,
} from "../utils/carUtils";

const CarDetailPage = () => {
  const features = {
    Model: "2021",
    Insurance: "Full",
    Deposit: "No",
    Delivery: "Free",
    KMs: "900",
    "Min age": "18",
  };

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
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useCarQuery({
    filters: {
      slug: { $eq: params?.car }, // Dynamic slug from URL
    },
    pagination: { limit: 1 },
    populate: "*",
  });
  const carDetail =
    data && data?.data && data?.data.length > 0 ? data.data[0] : {};
  let relatedCarsfilters = { ...CAR_LIST_QUERY, pagination: { limit: 6 } };
  const [fetchCars, isLoading] = useLazyCarsQuery();
  const [relatedCarsList, setRelatedCarsList] = useState([]);
  useEffect(() => {
    if (
      carDetail &&
      carDetail?.car_category?.slug &&
      carDetail?.car_subcategory?.slug &&
      carDetail?.slug
    ) {
      relatedCarsfilters["filters"] = {
        slug: { $ne: carDetail?.slug },
        car_category: { slug: { $eq: carDetail?.car_category?.slug } },
        car_subcategory: { slug: { $eq: carDetail?.car_subcategory?.slug } },
      };
    }

    if (relatedCarsfilters !== null) {
      fetchCars({ ...relatedCarsfilters }).then((res) => {
        if (res && res?.data) setRelatedCarsList(res?.data?.data);
      });
    }
  }, [carDetail]);
  console.log(relatedCarsList);
  return (
    <Layout>
      <div className="bg-white ">
        <div className="bg-gray-100 flex flex-col gap-5 text-center px-5 md:px-[15%] py-5 md:py-15">
          <h2 className="text-primary text-2xl font-bold">
            Rent {carDetail?.name} with Rotana Star
          </h2>

          <span className="text-xs text-gray-700 cursor-pointer">
            <span className="hover:text-gray-900" onClick={() => navigate("/")}>
              Home {" / "}
            </span>
            <span
              className="hover:text-gray-900"
              onClick={() =>
                navigate(`/cartype/${carDetail?.car_category?.slug}`)
              }
            >
              {carDetail?.car_category?.cartype} {" / "}
            </span>
            <span
              className="hover:text-gray-900"
              onClick={() =>
                navigate(
                  `/product-category/${carDetail?.car_category?.slug}/${carDetail?.car_subcategory?.slug}`
                )
              }
            >
              {carDetail?.car_subcategory?.categorySubType}
            </span>
          </span>
          <div className="flex flex-col-reverse md:flex-row gap-10 items-start justify-between">
            <div className="w-[100%] md:w-[60%] flex flex-col gap-5 justify-between">
              <div className="flex flex-col gap-2 md:flex-row justify-between">
                <ZigzagUnderline
                  text={carDetail?.name}
                  color="black"
                  alignSelf={"start"}
                />
                <div
                  style={{ textShadow: `0 1px 3px rgba(0,0,0,0.5)` }}
                  className="w-full md:w-fit flex flex-col items-end justify-end text-white text-bold text-lg bg-linear-65 from-white to-primary p-1"
                >
                  <span>Starting from</span>
                  <span className="text-lg">
                    {carDetail?.pricePerDay} AED/day
                  </span>
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
                  onClick={() =>
                    handleWhatsAppClick(
                      carDetail?.name,
                      `${window.location.origin}/car/${carDetail?.slug}`
                    )
                  }
                  className="bg-green-600 text-white flex flex-row items-center gap-1 py-2 px-8 cursor-pointer transition-all duration-300 ease-in-out 
                    hover:-translate-y-1"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>Whatsapp</span>
                </button>
                <button
                  onClick={handleCallClick}
                  className="bg-primary text-white flex flex-row items-center gap-1 py-2 px-8 cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="w-[100%] md:w-[40%]">
              <ImageCarousel
                images={
                  carDetail && carDetail.images && carDetail.images.length > 0
                    ? carDetail?.images.map((i) => `${URL + i.url}`)
                    : []
                }
              />
            </div>
          </div>
        </div>
        {/* seconds container */}
        <div className="px-5 md:px-[15%] py-10 w-full md:w-[60%]">
          <h1 className="text-xl">Car Features</h1>
          <div className="grid grid-cols-3">
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-car text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.brand?.car_Brand}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-gears text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.settings ? carDetail.settings : "v12"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-oil-can text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.engineType ? carDetail.engineType : "oil"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-palette text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.color ? carDetail.color : "Black"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-users text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.doors ? carDetail.doors : "4"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-door-closed text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.doors ? carDetail.doors : "4"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-briefcase text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.doors ? carDetail.doors : "4"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-car-burst text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.insurance
                  ? carDetail.insurance
                    ? "Yes"
                    : "No"
                  : "Yes"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-bluetooth text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.bluetooth
                  ? carDetail.bluetooth
                    ? "Yes"
                    : "No"
                  : "Yes"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-street-view text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.streetView ? carDetail.streetView : "Yes"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-video text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.videoCamera ? carDetail.videoCamera : "Yes"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-display text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.displayScreen ? carDetail.displayScreen : "Yes"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-user-shield text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.userShield ? carDetail.userShield : "Yes"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-volume-high text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.soundSystem ? carDetail.soundSystem : "Yes"}
              </p>
            </div>
            <div className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600">
              <i className={`fa-solid fa-music text-primary`} />
              <p className="text-[10px] font-medium text-gray-800">
                {carDetail?.music ? carDetail.music : "Yes"}
              </p>
            </div>
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
        {relatedCarsList && relatedCarsList.length > 0 ? (
          <div className="flex flex-col items-start gap-4 px-5 md:px-[15%] py-10 w-full">
            <ZigzagUnderline text="Related Cars" />
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {relatedCarsList.map((carItem, index) => (
                <CarCard
                  link={`${window.location.origin}/car/${carItem.slug}`}
                  onHandleAction={() => {
                    navigate(`/car/${carItem.slug}`);
                  }}
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
          </div>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default CarDetailPage;
