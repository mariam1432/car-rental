import React from "react";

const CarCard = ({ imgUrl, onHandleAction, title, logo, price, className }) => {
  return (
    <div
      onClick={onHandleAction}
      className={`border-1 border-gray-200 py-4 px-2 w-full shadow-lg flex flex-col items-start gap-4 cursor-pointer hover:shadow-gray-600 ${className}`}
    >
      <img src={imgUrl} alt={title} />
      <div className="flex items-center">
        <img src={logo} className="w-10 h-10" /> <h3>{title}</h3>
      </div>
      <div className="w-full flex flex-col items-end justify-end text-white text-bold text-lg bg-linear-65 from-white to-primary p-1">
        <span>Starting from</span>
        <span className="text-lg">AED {price}</span>
      </div>
      <div className="flex items-center justify-between gap-1 w-full">
        <button className="w-full bg-primary py-2 px-4 border-1 border-gray-200 text-white text-sm text-bold flex items-center justify-center gap-1">
          <i className="fa-solid fa-phone"></i> Call Us
        </button>
        <button className="w-full bg-primary py-2 px-4 border-1 border-gray-200 text-white text-sm text-bold flex items-center justify-center gap-1">
          <i className="fa-brands fa-whatsapp"></i> Whatsapp
        </button>
      </div>
    </div>
  );
};

export default CarCard;
