import React from "react";
const EmptyState = ({
  title,
  message,
  actionText,
  onAction,
  simple = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        simple ? "py-4" : "py-10"
      }`}
    >
      {!simple && (
        <i className="fa-solid fa-car-tilt text-4xl text-gray-400 mb-4"></i>
      )}
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
export default EmptyState;
