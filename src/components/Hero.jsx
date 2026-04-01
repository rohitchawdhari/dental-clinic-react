import React from "react";
import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="bg-sky-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}

        <div>
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Brighten Your Smile <br />
            with Expert Dental Care
          </h1>

          <p className="text-gray-600 mb-6">
            Professional dental care for your healthy smile.
          </p>

          <a
            href="#book"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            📅 Book Appointment
          </a>

        </div>

        {/* Right Image */}

        <div>
          <img
            src={hero}
            alt="Dental Clinic"
            className="rounded-3xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;