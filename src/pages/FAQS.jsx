import React, { useState } from "react";
import { Accordion, BlogCard, Layout } from "../components";
import { articles, faqsData } from "../data";
const FAQS = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    <Layout>
      <div className="w-full">
        <div
          className="w-full min-h-[300px] h-auto flex items-center justify-center"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(https://images.unsplash.com/photo-1648516143929-258b65b456ec?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        >
          <span className="text-white font-bold text-4xl">
            What Do You Need To Know To Rent a Car in Dubai
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between p-10 gap-0 md:gap-10">
          <div className="w-full md:w-[70%]">
            <p>
              In Arab Star Rent a Car, we receive a lot of questions about
              renting a car in Dubai and the UAE. We gathered the most popular
              ones to make the car rental process smooth and stress-free.
            </p>

            <div className="my-10">
              {faqsData &&
                faqsData.map((data, index) => (
                  <div className="mb-5">
                    {data?.lineBreak ? (
                      <div className="zig-zag-line my-10"></div>
                    ) : (
                      <></>
                    )}
                    {data?.heading ? (
                      <h2 className="text-lg text-primary font-semibold mb-5">
                        {data.heading}
                      </h2>
                    ) : (
                      <></>
                    )}
                    <Accordion
                      title={data.title}
                      index={index}
                      toggleAccordion={() => setActiveIndex(index)}
                      activeIndex={activeIndex}
                      content={data.content}
                      accordionStyle={"primary"}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full md:w-[30%]">
            {articles.map((article, index) => (
              <BlogCard
                key={index}
                title={article.title}
                description={article.description}
                date={article.date}
                noOfComments={article.noOfComments}
                handleClick={() => console.log("")}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQS;
