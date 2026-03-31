import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaQuoteLeft
} from "react-icons/fa";

const Testimonials = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Amine Ouali",
      role: "Patient",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quibusdam optio earum reiciendis, iusto nisi saepe iste! Esse dolorem consectetur, cupiditate commodi numquam id vel officia aspernatur iure hic tenetur",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },

    {
      id: 2,
      name: "Sofia Abdullah",
      role: "Patient",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quibusdam optio earum reiciendis.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },

    {
      id: 3,
      name: "Max Nour",
      role: "Patient",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    },

    {
      id: 4,
      name: "Sofia Noor",
      role: "Patient",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 relative py-20 bg-gradient-to-b from-sky-50 to-blue-100 overflow-hidden"
    >

      {/* Background */}

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-sky-300"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-300"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-sky-800 sm:text-4xl">
            Patient Testimonials
          </h2>

          <p className="mt-4 text-xl text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* Slider */}

        <div className="relative">

          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >

            {testimonials.map((testimonial) => (

              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >

                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center">

                  {/* Image */}

                  <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">

                    <div className="relative">
                      <img
                        className="w-40 h-40 rounded-full object-cover border-4 border-sky-100 shadow-lg"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />

                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-sm">
                        {testimonial.role}
                      </div>

                    </div>

                  </div>

                  {/* Content */}

                  <div className="md:w-2/3 md:pl-12">

                    <div className="relative">
                      <FaQuoteLeft className="text-sky-200 text-4xl absolute -top-2 -left-10" />

                      <p className="text-lg text-gray-700 mb-6 relative z-10">
                        {testimonial.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">

                      <div>
                        <h3 className="text-xl font-bold text-sky-800">
                          {testimonial.name}
                        </h3>

                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-lg ${
                                i < testimonial.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Arrows */}

                      <div className="flex space-x-2">

                        <button
                          onClick={prevTestimonial}
                          className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition-colors"
                        >
                          <FaChevronLeft />
                        </button>

                        <button
                          onClick={nextTestimonial}
                          className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition-colors"
                        >
                          <FaChevronRight />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Dots */}

        <div className="flex justify-center mt-8 space-x-3">

          {testimonials.map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index
                  ? "bg-sky-600"
                  : "bg-gray-300"
              }`}
            />

          ))}

        </div>

        {/* Button */}

        <div className="mt-16 text-center">

          <button className="px-8 py-3 bg-sky-600 text-white rounded-full font-medium hover:bg-sky-700 transition-all duration-300 shadow-lg">
            Share Your Experience
          </button>

        </div>

      </div>

    </section>
  );
};

export default Testimonials;