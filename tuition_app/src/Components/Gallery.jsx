import React, { useState, useEffect } from 'react';

const Gallery = () => {
  // State to manage the current active image
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to track if the user has manually interacted with the slider
  const [isManualOverride, setIsManualOverride] = useState(false);

  // Dynamically fetching images from the relative path
  const images = Array.from({ length: 13 }, (_, index) => {
    return require(`../Images/Gallery_images/img_${index + 1}.jpg`);
  });

  // Function to handle the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsManualOverride(true); // Set manual override when next button is clicked
  };

  // Function to handle the previous image
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsManualOverride(true); // Set manual override when previous button is clicked
  };

  // Effect to automatically change the image every 2 seconds
  useEffect(() => {
    if (!isManualOverride) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);

      return () => clearInterval(interval); // Clean up the interval
    }
  }, [currentIndex, isManualOverride]);

  return (
    <div id="gallery" className="relative w-full h-[300px] md:h-[500px] bg-[#09152E] bg-no-repeat bg-cover" data-carousel="slide">
      <h2 className="w-full text-center text-white font-bold md:text-4xl p-4">
        Our Gallery
      </h2>

      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute duration-700 ease-in-out top-0 left-0 w-full h-full ${
              currentIndex === index ? "block" : "hidden"
            }`}
            data-carousel-item={currentIndex === index ? "active" : ""}
          >
            <img
              src={image}
              className="block w-full h-full object-contain"
              alt={`Gallery Image ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 group-hover:bg-slate-500 dark:group-hover:bg-gray-700">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 group-hover:bg-slate-500 dark:group-hover:bg-gray-700">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Gallery;
