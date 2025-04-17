import React from "react";

const Loadingform = () => {
  return (
    <div>
      {" "}
      <span className="w-7 h-7 mr-2 relative">
        <span className="absolute inset-0 rounded-full border-4 border-t-blue-400 border-b-transparent border-l-transparent border-r-transparent animate-spin opacity-90" />
      </span>
    </div>
  );
};

export default Loadingform;
