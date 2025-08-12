import React from "react";

const CarBrandCard = ({ imgUrl, title, onClick, itemsCenter, className }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white shadow-md rounded-2xl border border-gray-200 cursor-pointer p-4
        ${
          itemsCenter
            ? "flex justify-center text-center lg:justify-start lg:text-left"
            : "flex justify-start text-left"
        }
        items-center
        ${className || ""}
      `}
      style={{
        minWidth: "auto",
        flex: "1 1 auto",
      }}
    >
      {/* Wrap img + text together in flex box */}
      <div
        className={`flex items-center gap-3 ${
          itemsCenter ? "justify-center" : ""
        }`}
      >
        {imgUrl && (
          <img
            src={imgUrl}
            alt={title}
            className={`${itemsCenter ? "mx-auto lg:mx-0" : ""} object-contain`}
            style={{
              width: "48px",
              height: "48px",
              flexShrink: 0,
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <span className="text-base font-medium truncate">{title}</span>
      </div>
    </div>
  );
};

export default CarBrandCard;
