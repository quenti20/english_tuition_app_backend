import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useNavigate } from 'react-router-dom';
import QrCode from './payment_QR.jpg';

const Admission_Form = () => {
  const navigate = useNavigate();

  // State to handle form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    guardianName: '',
    dob: '',
    className: '',
    board: '',
    studentContact: '',
    email: '',
    parentContact: '',
    addressLine1: '',
    addressLine2: '',
  });

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Here you can add the logic to handle form submission
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {/* Main content area */}
      <div className="pt-[82px] flex-grow p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Admission Form and Payment</h1>
        
        {/* Admission Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[#09152E] text-white shadow-lg rounded-lg p-6 border border-gray-200">
          
          <h2 className="text-2xl font-semibold mb-6 ">Student Information</h2>

          {/* Student First Name */}
          <div className="mb-4">
            <label className="block font-medium  mb-1">Student First Name</label>
            <input 
              type="text" 
              name="firstName" 
              placeholder="Enter student's first name"
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Student Last Name */}
          <div className="mb-4">
            <label className="block font-medium  mb-1">Student Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              placeholder="Enter student's last name"
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Guardian Name */}
          <div className="mb-4">
            <label className="block font-medium  mb-1">Guardian Name</label>
            <input 
              type="text" 
              name="guardianName" 
              placeholder="If under 18, else enter 'NA'"
              value={formData.guardianName} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block font-medium  mb-1">Date of Birth</label>
            <input 
              type="date" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-600 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Class */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-1">Class</label>
            <input 
              type="text" 
              name="className" 
              placeholder="Enter the class (e.g., 10th, 12th)"
              value={formData.className} 
              onChange={handleChange} 
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Board */}
          <div className="mb-4">
            <label className="block font-medium  mb-1">Board</label>
            <input 
              type="text" 
              name="board" 
              placeholder="Enter the board (e.g., CBSE, ICSE)"
              value={formData.board} 
              onChange={handleChange} 
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Contact Numbers */}
          <div className="mb-4">
            <label className="block font-medium  mb-1">Student Contact Number</label>
            <input 
              type="tel" 
              name="studentContact" 
              placeholder="Enter student's phone number"
              value={formData.studentContact} 
              onChange={handleChange} 
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium  mb-1">Email ID</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter student's email"
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Payment Section */}
          <h2 className="text-2xl font-semibold mb-4 mt-8 ">Payment Information</h2>
          <p className=" mb-4">Scan the QR Code below to make the payment.</p>
          <img 
            src={QrCode} 
            alt="QR Code" 
            className="w-48 mx-auto mb-4"
          />
          <button 
            type="button" 
            className="text-blue-300 hover:underline" 
            onClick={() => navigate('/fee-structure')}
          >
            View Fees Structure
          </button>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button 
              type="submit" 
              className="px-6 py-2 bg-[#21396e] text-white rounded-lg hover:bg-gray-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Admission_Form;
