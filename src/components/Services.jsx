import React from "react";
import { FaTooth } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "General Dental Checkup",
      description:
        "Regular dental checkup to keep your teeth healthy and prevent problems.",
    },
    {
      title: "Professional Teeth Cleaning",
      description:
        "Remove stains and plaque for a clean and healthy smile.",
    },
    {
      title: "Teeth Whitening",
      description:
        "Get brighter and whiter teeth with safe whitening treatment.",
    },
    {
      title: "Root Canal Treatment",
      description:
        "Pain-free treatment to save damaged or infected teeth.",
    },
  ];

  return (
    <section id="services" className="py-16 bg-sky-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Our Dental Services
        </h2>

        <p className="text-center text-gray-600 mb-10">
          We provide high quality dental care for your healthy smile.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              <FaTooth className="text-4xl text-blue-500 mx-auto mb-4" />

              <h3 className="text-lg font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;