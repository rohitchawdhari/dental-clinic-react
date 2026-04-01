import React from "react";
import { FaClock } from "react-icons/fa";

const Timing = () => {
  return (
    <section className="py-16 bg-white">
      
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Clinic Hours
        </h2>

        <p className="text-gray-600 mb-10">
          Visit us during our working hours
        </p>

        <div className="max-w-xl mx-auto bg-blue-50 p-8 rounded-xl shadow-lg">

          <div className="flex items-center justify-center mb-6 text-blue-600 text-3xl">
            <FaClock />
          </div>

          <div className="space-y-3 text-lg">

            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span>9:00 AM - 7:00 PM</span>
            </div>

            <div className="flex justify-between">
              <span>Saturday</span>
              <span>10:00 AM - 5:00 PM</span>
            </div>

            <div className="flex justify-between">
              <span>Sunday</span>
              <span className="text-red-500">Closed</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Timing;