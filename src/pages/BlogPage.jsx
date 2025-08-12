import React, { useState } from "react";
import { Accordion, BlogCard, Layout } from "../components";
import { articles } from "../data";
const BlogPage = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    <Layout>
      <div
        className="w-full min-h-[300px] h-auto flex items-center flex-col justify-center"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://images.unsplash.com/photo-1648516143929-258b65b456ec?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >
        <h1 className="text-white font-bold text-4xl">
          Tips for Car Rental Dubai
        </h1>

        <p className="text-white text-base">
          Tricks, advises and guide for Car Rental in Dubai and United Arab
          Emirates
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center my-10 px-5 md:px-[15%]">
        {articles.map((article, index) => (
          <BlogCard
            className={
              "w-[80vw] " + // Mobile: full-width scroll
              "md:w-[calc(50%-20px)] " + // Tablet: 2 cards per row
              "lg:w-[calc(25%-20px)] " + // Desktop: 4 cards (when not scrolling)
              "xl:w-[300px]" // Force desktop horizontal scroll
            }
            key={index}
            title={article.title}
            description={article.description}
            date={article.date}
            noOfComments={article.noOfComments}
            handleClick={() => console.log("")}
          />
        ))}
      </div>
    </Layout>
  );
};

export default BlogPage;
