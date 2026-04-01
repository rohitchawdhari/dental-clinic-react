import React from "react";

const Map = () => {
  return (
    <section className="py-16 bg-gray-100">
      
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Find Our Clinic
        </h2>

        <p className="text-gray-600 mb-8">
          Visit our dental clinic for the best dental care
        </p>

        <div className="rounded-xl overflow-hidden shadow-lg">
          
          <iframe
            src="https://www.google.com/maps?q=Chandigarh%20University&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

        </div>

      </div>

    </section>
  );
};

export default Map;