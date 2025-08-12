import React from "react";

const ErrorMessage = ({
  message = "Something went wrong",
  onRetry,
  retryText = "Try Again",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center gap-2 text-red-600 mb-3">
        <i
          className="fa-solid fa-circle-exclamation text-xl"
          aria-hidden="true"
        ></i>
        <h2 className="text-lg font-semibold">Error</h2>
      </div>

      <p className="text-gray-700 text-center mb-4">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Retry loading"
        >
          {retryText}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
