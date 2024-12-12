import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = ({ user, onClose, onUserUpdated }) => {
  const [updatedData, setUpdatedData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleFileChange = (e) => {
    setUpdatedData({ ...updatedData, payment_ss: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(updatedData).forEach((key) => {
      formData.append(key, updatedData[key]);
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
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <input type="text" name="name" value={updatedData.name} onChange={handleChange} required />
        {/* Other inputs */}
        <input type="file" name="payment_ss" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UpdateUser;
