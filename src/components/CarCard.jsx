import React from "react";
import { handleWhatsAppClick, handleCallClick } from "../utils/carUtils";

const CarCard = ({
  imgUrl,
  onHandleAction,
  title,
  logo,
  price,
  className,
  link,
}) => {
  return (
    <div
      onClick={onHandleAction}
      className={`border border-gray-200 rounded-lg py-4 px-2 w-full shadow-lg flex flex-col items-stretch gap-4 cursor-pointer hover:shadow-gray-600 ${className}`}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex items-center gap-2 px-2">
        {logo && <img src={logo} className="w-10 h-10 object-contain" />}
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </div>

      <div className="bg-gradient-to-r flex flex-col items-end from-white to-primary p-2 ">
        <span className="block text-sm text-white">Starting from</span>
        <span className="block text-lg font-bold text-white">AED {price}</span>
      </div>

      <div className="flex items-center justify-between gap-2 w-full px-2">
        <button
          onClick={handleCallClick}
          className="flex-1 bg-primary py-2 px-2 border border-gray-200 rounded text-white text-sm font-semibold flex items-center justify-center gap-1 whitespace-nowrap"
        >
          <i className="fa-solid fa-phone"></i> Call Us
        </button>
        <button
          onClick={() => handleWhatsAppClick(title, link)}
          className="flex-1 bg-primary py-2 px-2 border border-gray-200 rounded text-white text-sm font-semibold flex items-center justify-center gap-1 whitespace-nowrap"
        >
          <i className="fa-brands fa-whatsapp text-lg"></i> Whatsapp
        </button>
      </div>
    </div>
  );
};

export default CarCard;
