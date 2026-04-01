import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-blue-600">
          Smile Dental Clinic
        </h2>
      </div>
    </div>
  );
};

export default Loader;