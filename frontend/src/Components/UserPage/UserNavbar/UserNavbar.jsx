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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('user');

    if (!userString) {
      setError('Unauthorized Access.');
      setLoading(false);
      navigate('/login');
      return;
    }

    let userObject;
    try {
      userObject = JSON.parse(userString);
    } catch (e) {
      console.error('Failed to parse user data from localStorage:', e);
      setError('Invalid user data in localStorage.');
      setLoading(false);
      navigate('/login');
      return;
    }

    const { is_admin, phone_number, guardian_number, name } = userObject;

    if (is_admin || !phone_number || !guardian_number) {
      setError('Unauthorized Access.');
      setLoading(false);
      navigate('/login');
      return;
    }

    setUserName(name || 'User'); // Fallback to 'User' if the name is unavailable
    setLoading(false);
  }, [navigate]);

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
    navigate('/');
  };

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <h1>{error}</h1>
      </div>
    );
  }

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

        {/* Mobile Navigation */}
        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        {nav && (
          <ul className="fixed left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500">
            {/* Profile Section */}
            <li className="p-4 flex items-center gap-2 bg-gray-800 text-white">
              <img
                src={ProfileIcon}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{`Welcome, ${userName}`}</span>
            </li>
            <li
              className="p-4 hover:bg-gray-700 text-white"
              onClick={() => navigate('/user/profile')}
            >
              Profile Section
            </li>
            <li
              className="p-4 hover:bg-gray-700 text-white"
              onClick={() => navigate('/user/change-password')}
            >
              Change Password
            </li>
            <li
              className="p-4 hover:bg-gray-700 text-white"
              onClick={handleLogout}
            >
              Logout
            </li>

            {/* Home */}
            <li
              className="p-4 text-white hover:bg-gray-700"
              onClick={() => navigate('/userDashboard')}
            >
              Home
            </li>

            {/* Admission */}
            <li
              className="p-4 text-white hover:bg-gray-700"
              onClick={() => navigate('/user/schedule')}
            >
              Admission
            </li>

            {/* Resources */}
            <li
              className="p-4 text-white hover:bg-gray-700"
              onClick={() => navigate('/faculty')}
            >
              Resources
            </li>

            {/* Downloads */}
            <li
              className="p-4 text-white hover:bg-gray-700"
              onClick={() => navigate('/user/notes')}
            >
              Downloads
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
