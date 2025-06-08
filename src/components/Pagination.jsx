import React from "react";

const Pagination = ({ noOfPages, selectedPage, handleSelectedPage }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {[...Array(noOfPages)].map((_, index) => (
        <span
          onClick={() => handleSelectedPage(index + 1)}
          className={`cursor-pointer flex items-center justify-center rounded-lg w-[35px] h-[35px] text-sm ${
            selectedPage === index + 1
              ? "bg-primary text-white"
              : "bg-gray-200 text-primary"
          }`}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
