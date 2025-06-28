import React from "react";

const Loadingform = ({ text = "Đang xử lý...", size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 mr-1",
    md: "w-5 h-5 mr-2",
    lg: "w-6 h-6 mr-3",
  };

  return (
    <div className="flex items-center justify-center">
      <span className={`${sizeClasses[size]} relative`}>
        <span className="absolute inset-0 rounded-full border-3 border-t-blue-500 border-b-transparent border-l-transparent border-r-transparent animate-spin opacity-90" />
      </span>
      {text && (
        <span className="text-blue-700 dark:text-blue-400 font-medium">
          {text}
        </span>
      )}
    </div>
  );
};

export default Loadingform;
