import React, { useState, useEffect } from "react";
import axios from "axios";

const Experts = () => {
  // State to manage the current active banner
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to store the banners fetched from the API
  const [banners, setBanners] = useState([]);
  // State to track if manual interaction occurred
  const [isManualOverride, setIsManualOverride] = useState(false);

  // Fetch banner images from the API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "https://english-tuition-app-backend.vercel.app/getAllBanners"
        );
        setBanners(response.data.banners || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  // Function to handle the next banner
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    setIsManualOverride(true);
  };

  // Function to handle the previous banner
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    setIsManualOverride(true);
  };

  // Effect to handle automatic slideshow
  useEffect(() => {
    if (!isManualOverride && banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 3000);

      return () => clearInterval(interval); // Clean up the interval
    }

    // Reset the manual override after 5 seconds of no manual interaction
    const resetManualOverride = setTimeout(() => {
      setIsManualOverride(false);
    }, 5000);

    return () => clearTimeout(resetManualOverride);
  }, [currentIndex, isManualOverride, banners.length]);

  return (
    <div className="p-2 max-w-6xl mx-auto my-10 h-auto md:grid grid-cols-2 gap-6">
      {/* Image Section with Banners */}
      <div className="col-span-1 flex flex-col justify-center items-center relative">
        {banners.length > 0 && (
          <div className="w-full relative">
            <img
              className="inline h-full mx-auto rounded-lg shadow-lg object-cover w-full"
              src={banners[currentIndex].image}
              alt={`Banner ${currentIndex + 1}`}
            />
            {/* Slider controls */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-300"
              onClick={handlePrev}
            >
              <svg
                className="w-4 h-4 text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 6 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 1L1 5L5 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-300"
              onClick={handleNext}
            >
              <svg
                className="w-4 h-4 text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 6 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1L5 5L1 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* About Us Text Section */}
      <div className="col-span-1 flex flex-col justify-center">
        <h1 className="text-[#09152E] font-bold my-2 text-justify md:text-3xl">
          About Us
        </h1>

        {/* Updated About Us Text with Rounded Top Corners */}
        <p className="text-white md:text-lg p-4 leading-relaxed bg-[#09152E] pl-4 rounded-t-lg">
          At <span className="font-semibold">The Linguist</span>, we celebrate
          learning an assortment of Indian and foreign languages. This
          two-decade-old institution has been a pioneer in teaching the English
          language across all age groups. We also provide professional guidance
          on Pure Science subjects up to class XII. We are pledged to:
        </p>

        {/* Key Points with Rounded Bottom Corners and Custom Styles */}
        <ul className="bg-[#09152E] px-6 py-4 rounded-b-lg space-y-3">
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">Aid holistic development among our students.</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">
              Provide education through the best-in-class infrastructure (including A.C. smart
              classrooms).
            </span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">
              Simplify English learning through our own all-in-one grammar book.
            </span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">
              Support our students through Daily Practice Problems (DPP) and adequate follow-up
              tests.
            </span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">Provide support classes for the underachievers.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Experts;
