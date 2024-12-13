import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUser = ({ user, onClose, onUserUpdated }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone_number: '',
    Class: '',
    board: '',
    guardian_number: '',
    DOB: '',
    payment_ss: null,
    payment_status: false,
    attendance: 0,
    is_admin: false,
  });

  useEffect(() => {
    setUserData({ ...user }); // Populate with selected user data
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, payment_ss: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    try {
      await axios.put(`https://english-tuition-app-backend.vercel.app/updateUser/${user._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('User updated successfully!');
      onUserUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-5xl mx-auto overflow-auto">
      <h2 className="text-xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={userData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={userData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            placeholder="Enter Phone Number"
            value={userData.phone_number}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Class */}
        <div>
          <label className="block font-medium mb-1">Class</label>
          <select
            name="Class"
            value={userData.Class}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Select Class
            </option>
            {[5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Board */}
        <div>
          <label className="block font-medium mb-1">Board</label>
          <select
            name="board"
            value={userData.board}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Select Board
            </option>
            <option value="WBSE">WBSE</option>
            <option value="CISCE">CISCE</option>
            <option value="CBSE">CBSE</option>
          </select>
        </div>

        {/* Guardian's Phone Number */}
        <div>
          <label className="block font-medium mb-1">Guardian's Phone Number</label>
          <input
            type="tel"
            name="guardian_number"
            placeholder="Enter Guardian's Phone Number"
            value={userData.guardian_number}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* DOB */}
        <div>
          <label className="block font-medium mb-1">Date of Birth (ddmmyyyy)</label>
          <input
            type="text"
            name="DOB"
            placeholder="Please input the date in ddmmyyyy"
            value={userData.DOB}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Payment Screenshot */}
        <div>
          <label className="block font-medium mb-1">Payment Screenshot</label>
          <input
            type="file"
            name="payment_ss"
            onChange={handleFileChange}
            accept="image/*"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Payment Status */}
        <div className="flex items-center gap-2">
          <label className="block font-medium">Payment Status:</label>
          <input
            type="checkbox"
            name="payment_status"
            checked={userData.payment_status}
            onChange={(e) => setUserData({ ...userData, payment_status: e.target.checked })}
          />
        </div>

        {/* Admin Access */}
        <div className="flex items-center gap-2">
          <label className="block font-medium">Admin Access:</label>
          <input
            type="checkbox"
            name="is_admin"
            checked={userData.is_admin}
            onChange={(e) => setUserData({ ...userData, is_admin: e.target.checked })}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
          >
            Update User
          </button>
        </div>
      </form>
      <button
        onClick={onClose}
        className="mt-4 text-gray-500 underline hover:text-gray-700 w-full text-center"
      >
        Close
      </button>
    </div>
  );
};

export default UpdateUser;
