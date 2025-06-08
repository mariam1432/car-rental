import React from "react";

const Accordion = ({
  title,
  content,
  toggleAccordion,
  activeIndex,
  index,
  accordionStyle,
}) => {
  const isActive = activeIndex === index;

  return (
    <div
      className={`w-full text-left bg-white ${
        accordionStyle === "secondary"
          ? "rounded-none border border-gray-300 text-gray-900 p-3"
          : "shadow-lg rounded-[5px] text-gray-700 p-6"
      }  hover:shadow-xl transition-all duration-200 ${
        isActive ? "bg-gray-50" : ""
      }`}
      onClick={toggleAccordion}
    >
      <div
        className={`flex items-center font-bold cursor-pointer ${
          accordionStyle === "secondary"
            ? "justify-start gap-4"
            : "justify-between"
        }`}
      >
        {accordionStyle === "secondary" ? (
          isActive ? (
            <i className={"fa-solid fa-minus text-primary"}></i>
          ) : (
            <i className={"fa-solid fa-plus text-primary"}></i>
          )
        ) : (
          <></>
        )}
        <h3 className="text-xs font-semibold">{title}</h3>
        <span className="transition-transform duration-200">
          {accordionStyle === "primary" ? (
            isActive ? (
              <i className={"fa-solid fa-caret-down text-gray-500"}></i>
            ) : (
              <i className={"fa-solid fa-caret-right text-gray-500"}></i>
            )
          ) : (
            <></>
          )}
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isActive
            ? "max-h-[1000px] opacity-100 mt-4 py-2"
            : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`pb-2 text-gray-600 ${
            accordionStyle === "secondary" ? "text-xs" : "text-base"
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
