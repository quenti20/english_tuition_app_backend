import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import Logo from './logo.png'; // Assuming your logo is in the same folder

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showAdmissionDropdown, setShowAdmissionDropdown] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showDownloadsDropdown, setShowDownloadsDropdown] = useState(false);

  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
    closeDropdowns();
  };

  const closeDropdowns = () => {
    setShowAdmissionDropdown(false);
    setShowResourcesDropdown(false);
    setShowDownloadsDropdown(false);
  };

  // Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    setNav(false); // Close mobile nav after click
    closeDropdowns();
  };

  return (
    <div className='bg-[#09152E] fixed top-0 left-0 w-full z-50 p-4 rounded'>
      <div className='max-w-[1240px] bg-[#09152E] flex justify-between items-center mx-auto text-white'>
        {/* Always visible Logo and Name */}
        <div className='flex items-center flex-wrap text-center md:text-left '>
          <img src={Logo} alt="Logo" className='w-12 h-12 mr-2' />
          <h1 className='text-3xl font-bold text-[#f3f6f5] pr-1'>The Linguist </h1>
          <p className='text-lg text-[#f3f6f5] '> 
            (formerly <span className='font-bold'>The English Coaching</span> )</p>
        </div>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex gap-4 items-center'>
          <li className='p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl' onClick={() => navigate('/')}>Home</li>

          {/* Admission Dropdown */}
          <li className='relative p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl'
            onMouseEnter={() => setShowAdmissionDropdown(true)}
            onMouseLeave={() => setShowAdmissionDropdown(false)}
          >
            Admission
            {showAdmissionDropdown && (
              <ul className='absolute top-full left-0 bg-gray-800 text-white rounded-lg w-40 shadow-lg'>
                <li className='p-4 hover:bg-gray-700' onClick={() => navigate('/fee-structure')}>Fee Structure</li>
                <li className='p-2 hover:bg-gray-700' onClick={() => navigate('/schedule-classes')}>Schedule Classes</li>
                <li className='p-2 hover:bg-gray-700' onClick={() => navigate('/admission-form')}>Admission Form</li>
              </ul>
            )}
          </li>

          {/* Resources Dropdown */}
          <li className='relative p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl'
            onMouseEnter={() => setShowResourcesDropdown(true)}
            onMouseLeave={() => setShowResourcesDropdown(false)}
          >
            Resources
            {showResourcesDropdown && (
              <ul className='absolute top-full left-0 bg-gray-800 text-white rounded-lg w-40 shadow-lg'>
                <li className='p-2 hover:bg-gray-700' onClick={() => navigate('/faculty')}>Faculty</li>
                <li className='p-2 hover:bg-gray-700' onClick={() => navigate('/publications')}>Publications</li>
                <li className='p-2 hover:bg-gray-700' onClick={() => navigate('/alumni')}>Prev Year Alumni</li>
              </ul>
            )}
          </li>

          {/* Downloads Dropdown */}
          <li className='relative p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl'
            onMouseEnter={() => setShowDownloadsDropdown(true)}
            onMouseLeave={() => setShowDownloadsDropdown(false)}
          >
            Downloads
            {showDownloadsDropdown && (
              <ul className='absolute top-full left-0 bg-gray-800 text-white rounded-lg w-40 shadow-lg'>
                <li className='p-2 hover:bg-gray-700' onClick={() => navigate('/wbse')}>WBSE</li>
                <li className='p-2 hover:bg-gray-700' onClick={() => navigate('/cbse')}>CBSE</li>
                <li className='p-2 hover:bg-gray-700' onClick={() => navigate('/cisce')}>CISCE</li>
              </ul>
            )}
          </li>

          {/* Contact Us Button */}
          <li className='p-4 cursor-pointer hover:bg-[#f6f8f8] hover:text-black rounded-xl' onClick={scrollToBottom}>Contact Us</li>
        </ul>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul className={`${nav ? 'fixed' : 'hidden'} md:hidden left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500`}>
          {/* Mobile Navbar Header with Logo and 'The Linguist' */}
          <div className="flex items-center p-4">
            <img src={Logo} alt="Logo" className='w-12 h-12 mr-2' />
            <h1 className='text-3xl font-bold text-[#eff1f0]'>The Linguist</h1>
          </div>

          <li className='p-4 border-b border-gray-600' onClick={() => navigate('/')}>Home</li>

          {/* Mobile Admission Dropdown */}
          <li className='p-4 border-b border-gray-600' onClick={() => setShowAdmissionDropdown(!showAdmissionDropdown)}>
            Admission
            {showAdmissionDropdown && (
              <ul className='pl-4'>
                <li className='p-2' onClick={() => navigate('/fee-structure')}>Fee Structure</li>
                <li className='p-2' onClick={() => navigate('/schedule-classes')}>Schedule Classes</li>
                <li className='p-2' onClick={() => navigate('/admission-form')}>Admission Form</li>
              </ul>
            )}
          </li>

          {/* Mobile Resources Dropdown */}
          <li className='p-4 border-b border-gray-600' onClick={() => setShowResourcesDropdown(!showResourcesDropdown)}>
            Resources
            {showResourcesDropdown && (
              <ul className='pl-4'>
                <li className='p-2' onClick={() => navigate('/faculty')}>Faculty</li>
                <li className='p-2' onClick={() => navigate('/publications')}>Publications</li>
                <li className='p-2' onClick={() => navigate('/alumni')}>Prev Year Alumni</li>
              </ul>
            )}
          </li>

          {/* Mobile Downloads Dropdown */}
          <li className='p-4 border-b border-gray-600' onClick={() => setShowDownloadsDropdown(!showDownloadsDropdown)}>
            Downloads
            {showDownloadsDropdown && (
              <ul className='pl-4'>
                <li className='p-2' onClick={() => navigate('/wbse')}>WBSE</li>
                <li className='p-2' onClick={() => navigate('/cbse')}>CBSE</li>
                <li className='p-2' onClick={() => navigate('/cisce')}>CISCE</li>
              </ul>
            )}
          </li>

          {/* Contact Us Button */}
          <li className='p-4 border-b border-gray-600' onClick={scrollToBottom}>Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
