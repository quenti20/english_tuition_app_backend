import React, { useEffect, useState } from 'react';
import { ReactTyped } from 'react-typed';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../../Pages/Publications/pub_1.jpg';

const Banner = () => {
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(true);
  const navigate = useNavigate();

  // Check if localStorage is empty
  useEffect(() => {
    const userData = localStorage.getItem('user'); // Replace 'user' with your key if different
    if (userData) {
      setIsLocalStorageEmpty(false); // If there is data, set state to false
    }
  }, []);

  // OnClick handler for the button
  const handleGetStarted = () => {
    navigate('/admission-form');
  };

  return (
    <div
      className="bg-center w-full py-20 my-20 bg-no-repeat bg-cover relative"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative max-w-7xl my-24 mx-auto text-center font-bold">
        <div className="text-white text-xl md:text-3xl md:p-6">
          We Don't Teach You
        </div>
        <h2 className="text-white text-2xl md:text-7xl md:p-6">
          We Help You Learn
        </h2>
        <div className="text-xl md:text-5xl text-white md:p-6">
          <ReactTyped
            className="p-3"
            strings={['Pure English', 'Sure English', 'Any Board', 'Any Class']}
            typeSpeed={100}
            backSpeed={100}
            loop
          />
        </div>

        {/* Conditionally render the button */}
        {isLocalStorageEmpty && (
          <button
            className="bg-black text-white p-3 rounded hover:cursor-pointer hover:bg-white hover:text-black transition duration-300"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
