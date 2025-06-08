import React from "react";

const CarBrandCard = ({ imgUrl, title, className, index,onlyImg }) => {
  return (
    <div
      key={index}
      className={`min-w-[200px] bg-white w-auto px-3 py-2 shadow-xl flex items-center gap-1 justify-start rounded-2xl border-1 border-gray-200 ${className}`}
    >
      <img src={imgUrl} className="w-10 h-10" />
      <span className="text-xs">{title}</span>
    </div>
  );
};

export default CarBrandCard;
