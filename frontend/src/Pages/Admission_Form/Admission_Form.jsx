import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/HomePage/Navbar';
import Footer from '../../Components/HomePage/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admission_Form = () => {
  const navigate = useNavigate();

  // State to handle form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    Class: '',
    board: '',
    guardian_number: '',
    DOB: '',
    payment_ss: null, // To handle file upload
  });

  const [qrData, setQrData] = useState({ payment_qr: '', upi_id: '' }); // For QR code and UPI ID
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch QR code and UPI ID on component mount
  useEffect(() => {
    const fetchQrData = async () => {
      try {
        const response = await axios.get('https://english-tuition-app-backend.vercel.app/getAllData');
        const { data } = response.data;
        setQrData({
          payment_qr: data[0]?.payment_qr || '',
          upi_id: data[0]?.upi_id || '',
        });
      } catch (error) {
        console.error('Error fetching QR data:', error);
      }
    };

    fetchQrData();
  }, []);

  // Validate email format
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate phone number format
  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, payment_ss: e.target.files[0] });
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
    if (!validatePhoneNumber(formData.phone_number)) errors.phone_number = 'Phone number must be 10 digits';
    if (!validatePhoneNumber(formData.guardian_number)) errors.guardian_number = 'Guardian number must be 10 digits';
    if (!formData.payment_ss) errors.payment_ss = 'Payment screenshot is required';
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      // Prepare form data
      const postData = new FormData();
      postData.append('name', formData.name);
      postData.append('email', formData.email);
      postData.append('phone_number', formData.phone_number);
      postData.append('Class', formData.Class);
      postData.append('board', formData.board);
      postData.append('guardian_number', formData.guardian_number);
      postData.append('DOB', formData.DOB.split('-').reverse().join('')); // Convert to ddmmyyyy
      postData.append('payment_ss', formData.payment_ss);
      postData.append('active_status',false)
      try {
        const response = await axios.post('https://english-tuition-app-backend.vercel.app/createUser', postData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('User created successfully');
        navigate('/login'); // Redirect after success
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {/* Main content */}
      <div className="pt-[90px] flex-grow p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Admission Form and Payment</h1>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[#09152E] text-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Student Information</h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Student Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full border rounded px-3 py-2 text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Student Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className={`w-full border rounded px-3 py-2 text-black ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
          </div>

          {/* Guardian Number */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Guardian Phone Number</label>
            <input
              type="tel"
              name="guardian_number"
              value={formData.guardian_number}
              onChange={handleChange}
              required
              className={`w-full border rounded px-3 py-2 text-black ${errors.guardian_number ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.guardian_number && <p className="text-red-500 text-sm mt-1">{errors.guardian_number}</p>}
          </div>

          {/* DOB */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-black"
            />
          </div>

          {/* Class */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Class</label>
            <select
              name="Class"
              value={formData.Class}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-black"
            >
              <option value="">Select Class</option>
              {[5, 6, 7, 8, 9, 10, 11, 12].map((classOption) => (
                <option key={classOption} value={classOption}>{classOption}</option>
              ))}
            </select>
          </div>

          {/* Board */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Board</label>
            <select
              name="board"
              value={formData.board}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-black"
            >
              <option value="">Select Board</option>
              {['WBSE', 'CBSE', 'CISCE'].map((boardOption) => (
                <option key={boardOption} value={boardOption}>{boardOption}</option>
              ))}
            </select>
          </div>

          {/* QR Code and UPI ID */}
          <h2 className="text-2xl font-semibold mb-4 mt-8">Payment Information</h2>
          <p className="mb-4">Scan the QR Code below to make the payment:</p>
          {qrData.payment_qr && <img src={qrData.payment_qr} alt="Payment QR" className="w-48 mx-auto mb-4" />}
          {qrData.upi_id && <p className="text-center text-lg mb-4">{qrData.upi_id}</p>}

          {/* Payment Screenshot */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Upload Payment Screenshot</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className={`w-full ${errors.payment_ss ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.payment_ss && <p className="text-red-500 text-sm mt-1">{errors.payment_ss}</p>}
          </div>

          {/* Submit */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#21396e] text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Admission_Form;
