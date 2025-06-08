import React from "react";

const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white w-full shadow-xl flex items-center justify-center gap-1 text-xl text-primary border border-gray-200 p-2 rounded-2xl cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
