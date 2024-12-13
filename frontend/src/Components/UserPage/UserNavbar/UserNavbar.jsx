import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import Logo from './logo.png'; // Replace with your actual logo
import ProfileIcon from './profile_icon.webp'; // Replace with your actual profile icon

const UserNavbar = () => {
  const [nav, setNav] = useState(false);
  const [showAdmissionDropdown, setShowAdmissionDropdown] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showDownloadsDropdown, setShowDownloadsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUserName(user.name || 'User'); // Fallback to 'User' if name is unavailable
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="bg-[#09152E] fixed top-0 left-0 w-full z-50 p-4">
      <div className="max-w-[1240px] flex justify-between items-center mx-auto text-white">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-3xl font-bold text-[#f3f6f5]">The Linguist</h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-4 items-center">
          <li
            className="p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl"
            onClick={() => navigate('/userDashboard')}
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
                  onClick={() => navigate('/user/schedule')}
                >
                  Class Schedule
                </li>
                <li
                  className="p-4 hover:bg-gray-700"
                  onClick={() => navigate('/fee-structure')}
                >
                  Fee Structure
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
                  onClick={() => navigate('/faculty')}
                >
                  Faculty
                </li>
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => navigate('/publications')}
                >
                  Publications
                </li>
                <li
                  className="p-2 hover:bg-gray-700"
                  onClick={() => navigate('/alumni')}
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
                  className="p-4 hover:bg-gray-700"
                  onClick={() => navigate('/user/notes')}
                >
                  Download Notes
                </li>
              </ul>
            )}
          </li>

          {/* Profile Dropdown */}
          <li
            className="relative p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl"
            onMouseEnter={() => setShowProfileDropdown(true)}
            onMouseLeave={() => setShowProfileDropdown(false)}
          >
            <div className="flex items-center">
              <img
                src={ProfileIcon}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm">{`Welcome, ${userName}`}</span>
            </div>
            {showProfileDropdown && (
              <ul className="absolute top-full right-0 bg-gray-800 text-white rounded-lg w-40 shadow-lg">
                <li
                  className="p-4 hover:bg-gray-700"
                  onClick={() => navigate('/user/profile')}
                >
                  Profile Section
                </li>
                <li
                  className="p-4 hover:bg-gray-700"
                  onClick={() => navigate('/user/change-password')}
                >
                  Change Password
                </li>
                <li
                  className="p-4 hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  Logout
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
        {nav && (
          <ul className="fixed left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500">
            <div className="flex items-center p-4">
              <img src={Logo} alt="Logo" className="w-12 h-12 mr-2" />
              <h1 className="text-3xl font-bold text-[#eff1f0]">The Linguist</h1>
            </div>

            <li
              className="p-4 border-b border-gray-600"
              onClick={() => {
                navigate('/userDashboard');
                setNav(false);
              }}
            >
              Home
            </li>

            <li
              className="p-4 border-b border-gray-600"
              onClick={() => setShowAdmissionDropdown(!showAdmissionDropdown)}
            >
              Admission
              {showAdmissionDropdown && (
                <ul className="pl-4">
                  <li
                    className="p-2"
                    onClick={() => {
                      navigate('/user/schedule');
                      setNav(false);
                    }}
                  >
                    Class Schedule
                  </li>
                  <li
                    className="p-2"
                    onClick={() => {
                      navigate('/fee-structure');
                      setNav(false);
                    }}
                  >
                    Fee Structure
                  </li>
                </ul>
              )}
            </li>

            <li
              className="p-4 border-b border-gray-600"
              onClick={() => setShowResourcesDropdown(!showResourcesDropdown)}
            >
              Resources
              {showResourcesDropdown && (
                <ul className="pl-4">
                  <li
                    className="p-2"
                    onClick={() => {
                      navigate('/faculty');
                      setNav(false);
                    }}
                  >
                    Faculty
                  </li>
                  <li
                    className="p-2"
                    onClick={() => {
                      navigate('/publications');
                      setNav(false);
                    }}
                  >
                    Publications
                  </li>
                  <li
                    className="p-2"
                    onClick={() => {
                      navigate('/alumni');
                      setNav(false);
                    }}
                  >
                    Prev Year Alumni
                  </li>
                </ul>
              )}
            </li>

            <li
              className="p-4 border-b border-gray-600"
              onClick={() => setShowDownloadsDropdown(!showDownloadsDropdown)}
            >
              Downloads
              {showDownloadsDropdown && (
                <ul className="pl-4">
                  <li
                    className="p-2"
                    onClick={() => {
                      navigate('/user/notes');
                      setNav(false);
                    }}
                  >
                    Download Notes
                  </li>
                </ul>
              )}
            </li>

            <li
              className="p-4 border-b border-gray-600"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              Profile
              {showProfileDropdown && (
                <ul className="pl-4">
                  <li
                    className="p-2"
                    onClick={() => {
                      navigate('/user/profile');
                      setNav(false);
                    }}
                  >
                    Profile Section
                  </li>
                  <li
                    className="p-2"
                    onClick={() => {
                      navigate('/user/change-password');
                      setNav(false);
                    }}
                  >
                    Change Password
                  </li>
                  <li
                    className="p-2"
                    onClick={() => {
                      handleLogout();
                      setNav(false);
                    }}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
