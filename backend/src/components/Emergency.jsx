import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const Emergency = () => {
  return (
    <a
      href="tel:+918467093427"
      className="fixed bottom-36 right-5 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition z-50"
    >
      <FaPhoneAlt size={20} />
    </a>
  );
};

export default Emergency;