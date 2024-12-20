import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import Logo from "./logo.png"; // Assuming your logo is in the same folder
import ProfileIcon from "./profile_icon.webp"; // Replace with your actual profile icon

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showAdmissionDropdown, setShowAdmissionDropdown] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showDownloadsDropdown, setShowDownloadsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
    closeDropdowns();
  };

  const closeDropdowns = () => {
    setShowAdmissionDropdown(false);
    setShowResourcesDropdown(false);
    setShowDownloadsDropdown(false);
    setShowProfileDropdown(false);
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNav(false); // Close mobile nav after click
    closeDropdowns();
  };

  // Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    setNav(false); // Close mobile nav after click
    closeDropdowns();
  };

  return (
    <div className="bg-[#09152E] fixed top-0 left-0 w-full z-50 p-4 rounded">
      <div className="max-w-[1240px] bg-[#09152E] flex justify-between items-center mx-auto text-white">
        {/* Always visible Logo and Name */}
        <div className="flex items-center flex-wrap text-center md:text-left ">
          <img src={Logo} alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-3xl font-bold text-[#f3f6f5] pr-1">
            The Linguist{" "}
          </h1>
          <p className="text-lg text-[#f3f6f5]">
            (formerly <span className="font-bold">The English Coaching</span> )
          </p>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-4 items-center">
          <li
            className="p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl"
            onClick={() => {
              navigate("/");
              scrollToTop();
            }}
          >
            Home
          </li>

          {/* Admission Dropdown */}
          <li
            className="relative p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl"
            onMouseEnter={() => setShowAdmissionDropdown(true)}
            onMouseLeave={() => setShowAdmissionDropdown(false)}
          >
            Admission
            {showAdmissionDropdown && (
              <ul className="absolute top-full left-0 bg-gray-800 text-white rounded-lg w-40 shadow-lg">
                <li
                  className="p-4 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/fee-structure");
                    scrollToTop();
                  }}
                >
                  Fee Structure
                </li>
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/schedule-classes");
                    scrollToTop();
                  }}
                >
                  Schedule Classes
                </li>
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/admission-form");
                    scrollToTop();
                  }}
                >
                  Admission Form
                </li>
              </ul>
            )}
          </li>

          {/* Resources Dropdown */}
          <li
            className="relative p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl"
            onMouseEnter={() => setShowResourcesDropdown(true)}
            onMouseLeave={() => setShowResourcesDropdown(false)}
          >
            Resources
            {showResourcesDropdown && (
              <ul className="absolute top-full left-0 bg-gray-800 text-white rounded-lg w-40 shadow-lg">
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/faculty");
                    scrollToTop();
                  }}
                >
                  Faculty
                </li>
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/publications");
                    scrollToTop();
                  }}
                >
                  Publications
                </li>
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/alumni");
                    scrollToTop();
                  }}
                >
                  Prev Year Alumni
                </li>
              </ul>
            )}
          </li>

          {/* Downloads Dropdown */}
          <li
            className="relative p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl"
            onMouseEnter={() => setShowDownloadsDropdown(true)}
            onMouseLeave={() => setShowDownloadsDropdown(false)}
          >
            Downloads
            {showDownloadsDropdown && (
              <ul className="absolute top-full left-0 bg-gray-800 text-white rounded-lg w-40 shadow-lg">
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/wbse");
                    scrollToTop();
                  }}
                >
                  WBSE
                </li>
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/cbse");
                    scrollToTop();
                  }}
                >
                  CBSE
                </li>
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/cisce");
                    scrollToTop();
                  }}
                >
                  CISCE
                </li>
              </ul>
            )}
          </li>

          {/* Contact Us Button */}
          <li
            className="p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl"
            onClick={scrollToBottom}
          >
            Contact Us
          </li>

          {/* Profile Dropdown */}
          <li
            className="relative p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl"
            onMouseEnter={() => setShowProfileDropdown(true)}
            onMouseLeave={() => setShowProfileDropdown(false)}
          >
            <img
              src={ProfileIcon}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            {showProfileDropdown && (
              <ul className="absolute top-full right-0 bg-gray-800 text-white rounded-lg w-40 shadow-lg">
                <li
                  className="p-4 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/login");
                    scrollToTop();
                  }}
                >
                  Login
                </li>
                <li
                  className="p-4 hover:bg-gray-700"
                  onClick={() => {
                    navigate("/admission-form");
                    scrollToTop();
                  }}
                >
                  Signup
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={`${
            nav ? "fixed" : "hidden"
          } md:hidden left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500`}
        >
          <div className="flex items-center p-4">
            <img src={Logo} alt="Logo" className="w-12 h-12 mr-2" />
            <h1 className="text-3xl font-bold text-[#eff1f0]">The Linguist</h1>
          </div>
          <div className="flex items-center p-4 border-b border-gray-600">
            <img
              src={ProfileIcon}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-white font-semibold">Welcome!</p>
              <ul>
                <li
                  className="text-gray-300 text-sm cursor-pointer hover:text-white"
                  onClick={() => {
                    navigate("/login");
                    scrollToTop();
                  }}
                >
                  Login
                </li>
                <li
                  className="text-gray-300 text-sm cursor-pointer hover:text-white"
                  onClick={() => {
                    navigate("/admission-form");
                    scrollToTop();
                  }}
                >
                  Signup
                </li>
              </ul>
            </div>
          </div>

          <li
            className="p-4 border-b border-gray-600"
            onClick={() => {
              navigate("/");
              scrollToTop();
            }}
          >
            Home
          </li>
          <li
            className="p-4 border-b border-gray-600"
            onClick={() => {
              navigate("/fee-structure");
              scrollToTop();
            }}
          >
            Admission
          </li>
          <li
            className="p-4 border-b border-gray-600"
            onClick={() => {
              navigate("/faculty");
              scrollToTop();
            }}
          >
            Resources
          </li>
          <li
            className="p-4 border-b border-gray-600"
            onClick={() => {
              navigate("/wbse");
              scrollToTop();
            }}
          >
            Downloads
          </li>
          <li className="p-4 border-b border-gray-600" onClick={scrollToBottom}>
            Contact Us
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
