import React from "react";

const CarBrandCard = ({ imgUrl, title, index, onClick, itemsCenter }) => {
  return (
    <div
      onClick={onClick}
      key={index}
      className={`min-w-[200px] bg-white w-auto shadow-xl flex items-center ${
        itemsCenter ? "justify-center px-10 py-5 " : "justify-start px-5 py-3 "
      } gap-1 rounded-2xl border-1 border-gray-200 cursor-pointer `}
    >
      <img src={imgUrl} alt={title} className="w-7 h-7" />
      <span className="text-xs">{title}</span>
    </div>
  );
};

export default CarBrandCard;
