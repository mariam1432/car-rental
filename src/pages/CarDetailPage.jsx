import React, { useState, useEffect } from "react";
import {
  Accordion,
  ImageCarousel,
  Layout,
  CarCard,
  ZigzagUnderline,
  Loader,
  EmptyState,
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
  const [isLoading, setIsLoading] = useState(false);
  const {
    data,
    isLoading: isLoadingCarData,
    error: carError,
  } = useCarQuery({
    filters: {
      slug: { $eq: params?.car },
    },
    pagination: { limit: 1 },
    populate: "*",
  });
  const carDetail = data?.data?.[0] || {};
  let relatedCarsfilters = { ...CAR_LIST_QUERY, pagination: { limit: 6 } };
  const [fetchCars] = useLazyCarsQuery();
  const [relatedCarsList, setRelatedCarsList] = useState([]);
  const [fetchError, setFetchError] = useState(null);

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

      setIsLoading(true);
      setFetchError(null);
      fetchCars({ ...relatedCarsfilters })
        .then((res) => {
          if (res?.data) {
            setRelatedCarsList(res.data?.data || []);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch related cars:", err);
          setFetchError("Failed to load related cars. Please try again later.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [carDetail]);

  if (carError) {
    return (
      <Layout>
        <EmptyState
          title="Car Not Found"
          message={`We couldn't find the car with ID: ${params?.car}`}
          actionText="Browse Our Cars"
          onAction={() => navigate("/")}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      {(isLoading || isLoadingCarData) && <Loader />}
      <div className="bg-white">
        {!carDetail?.id && !isLoadingCarData ? (
          <EmptyState
            title="No Car Details Available"
            message="The car you're looking for isn't available at the moment."
            actionText="Browse Available Cars"
            onAction={() => navigate("/")}
          />
        ) : (
          <>
            <div className="bg-gray-100 flex flex-col gap-5 text-center px-5 md:px-[15%] py-5 md:py-15">
              <h2 className="text-primary text-2xl font-bold">
                Rent {carDetail?.name} with Arab Star
              </h2>

              {carDetail?.id && (
                <span className="text-xs text-gray-700 cursor-pointer">
                  <span
                    className="hover:text-gray-900"
                    onClick={() => navigate("/")}
                  >
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
              )}

              <div className="flex flex-col-reverse md:flex-row gap-10 items-start justify-between">
                <div className="w-[100%] md:w-[60%] flex flex-col gap-5 justify-between">
                  <div className="flex flex-col gap-2 md:flex-row justify-between">
                    <ZigzagUnderline
                      text={carDetail?.name || "Car Details"}
                      color="black"
                      alignSelf={"start"}
                    />
                    {carDetail?.pricePerDay && (
                      <div
                        style={{ textShadow: `0 1px 3px rgba(0,0,0,0.5)` }}
                        className="w-full md:w-fit flex flex-col items-end justify-end text-white text-bold text-lg bg-linear-65 from-white to-primary p-1"
                      >
                        <span>Starting from</span>
                        <span className="text-lg">
                          {carDetail.pricePerDay} AED/day
                        </span>
                      </div>
                    )}
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

                  <div className="flex gap-5">
                    {duration.map((d, i) => (
                      <PriceItem key={i} text={d} />
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
                      className="bg-green-600 text-white flex flex-row items-center gap-1 py-2 px-8 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1"
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
                      carDetail?.images?.length > 0
                        ? carDetail.images.map((i) => `${i.url}`)
                        : []
                    }
                    fallbackImage="/path-to-default-car-image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Car Features Section */}
            {carDetail?.id && (
              <div className="px-5 md:px-[15%] py-10 w-full md:w-[60%]">
                <h1 className="text-xl">Car Features</h1>
                <div className="grid grid-cols-3">
                  {[
                    {
                      icon: "fa-car",
                      text: carDetail?.brand?.car_Brand || "Brand",
                    },
                    { icon: "fa-gears", text: carDetail?.settings || "v12" },
                    {
                      icon: "fa-oil-can",
                      text: carDetail?.engineType || "oil",
                    },
                    { icon: "fa-palette", text: carDetail?.color || "Black" },
                    {
                      icon: "fa-users",
                      text: carDetail?.doors
                        ? `${carDetail.doors} seats`
                        : "4 seats",
                    },
                    {
                      icon: "fa-door-closed",
                      text: carDetail?.doors || "4 doors",
                    },
                    {
                      icon: "fa-briefcase",
                      text: carDetail?.luggage || "2 bags",
                    },
                    {
                      icon: "fa-car-burst",
                      text: carDetail?.insurance ? "Yes" : "No",
                    },
                    {
                      icon: "fa-bluetooth",
                      text: carDetail?.bluetooth ? "Yes" : "No",
                    },
                    {
                      icon: "fa-street-view",
                      text: carDetail?.streetView ? "Yes" : "No",
                    },
                    {
                      icon: "fa-video",
                      text: carDetail?.videoCamera ? "Yes" : "No",
                    },
                    {
                      icon: "fa-display",
                      text: carDetail?.displayScreen ? "Yes" : "No",
                    },
                    {
                      icon: "fa-user-shield",
                      text: carDetail?.userShield ? "Yes" : "No",
                    },
                    {
                      icon: "fa-volume-high",
                      text: carDetail?.soundSystem ? "Yes" : "No",
                    },
                    { icon: "fa-music", text: carDetail?.music ? "Yes" : "No" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 gap-4 border-b-1 border-dashed border-green-600"
                    >
                      <i className={`fa-solid ${item.icon} text-primary`} />
                      <p className="text-[10px] font-medium text-gray-800">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description Section */}
            <div className="px-5 md:px-[15%] py-10 w-full md:w-[75%] flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                Rent a {carDetail?.name || "this car"} in Dubai with Arab Star
              </h1>
              <p className="text-sm">
                {carDetail?.description ||
                  "No description available for this car."}
              </p>
            </div>

            {/* FAQ Section */}
            <div className="px-5 md:px-[15%] py-10">
              <h1 className="text-xl font-bold text-center mb-10">
                Frequently Asked Questions
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
                {faqsData?.length > 0 ? (
                  <>
                    <div>
                      {faqsData
                        .slice(0, Math.ceil(faqsData.length / 2))
                        .map((data) => (
                          <Accordion
                            key={data.id}
                            title={data.title}
                            index={data.id}
                            toggleAccordion={() =>
                              setActiveIndex(
                                activeIndex === data.id ? null : data.id
                              )
                            }
                            activeIndex={activeIndex}
                            content={data.content}
                            accordionStyle="secondary"
                          />
                        ))}
                    </div>
                    <div>
                      {faqsData
                        .slice(Math.ceil(faqsData.length / 2))
                        .map((data) => (
                          <Accordion
                            key={data.id}
                            title={data.title}
                            index={data.id}
                            toggleAccordion={() =>
                              setActiveIndex(
                                activeIndex === data.id ? null : data.id
                              )
                            }
                            activeIndex={activeIndex}
                            content={data.content}
                            accordionStyle="secondary"
                          />
                        ))}
                    </div>
                  </>
                ) : (
                  <div className="col-span-2">
                    <EmptyState
                      title="No FAQs Available"
                      message="We don't have any frequently asked questions at the moment."
                      simple
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Related Cars Section */}
            <div className="flex flex-col items-start gap-4 px-5 md:px-[15%] py-10 w-full">
              <ZigzagUnderline text="Related Cars" />
              {fetchError ? (
                <div className="w-full text-center py-4 text-red-600">
                  {fetchError}
                </div>
              ) : relatedCarsList?.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-center mb-10">
                  {relatedCarsList.map((carItem) => (
                    <CarCard
                      key={carItem.id}
                      link={`${window.location.origin}/car/${carItem.slug}`}
                      onHandleAction={() => navigate(`/car/${carItem.slug}`)}
                      className="w-[80vw] md:w-[calc(50%-20px)] lg:w-[calc(25%-20px)] xl:w-[300px]"
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
              ) : (
                <EmptyState
                  title="No Related Cars"
                  message="We couldn't find any related cars at the moment."
                  simple
                />
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CarDetailPage;
