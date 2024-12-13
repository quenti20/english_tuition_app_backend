import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../../Components/UserPage/UserNavbar/UserNavbar';
import Footer from '../../Components/HomePage/Footer';

const ChangePassword = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // State hooks must always be declared at the top level
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agreeToRisk, setAgreeToRisk] = useState(false);

  // Redirect unauthorized users
  if (
    !user || 
    user.is_admin || 
    !user.phone_number || 
    !user.guardian_number
  ) {
    navigate('/login');
    alert('Unauthorized access. Please log in.');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmNewPassword } = formData;

    // Validation
    if (!agreeToRisk) {
      setError('You must agree to the risk before changing the password.');
      return;
    }
    if (newPassword === oldPassword) {
      setError('New password cannot be the same as the old password.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm new password do not match.');
      return;
    }

    try {
      const response = await axios.put(
        `https://english-tuition-app-backend.vercel.app/changePassword/${user.id}`,
        {
          oldPassword,
          newPassword,
        }
      );

      if (response.status === 200) {
        setSuccess('Password updated successfully!');
        localStorage.clear();
        navigate('/login');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update password. Try again.'
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />

      {/* Main Content */}
      <div className="pt-[100px] flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold text-center mb-8 text-[#09152E]">
          Change Password
        </h1>

        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
          <p className="text-sm text-red-600 font-bold mb-4">
            Disclaimer: There is no way to retrieve your password once changed except through <span className='font-bold text-red-800'>Admin</span>. 
            Please ensure you remember your new password before proceeding.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Old Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Confirm New Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Agree to Risk */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={agreeToRisk}
                onChange={() => setAgreeToRisk(!agreeToRisk)}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm">
                I understand the risk.
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-red-500 text-sm">{error}</div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 text-green-500 text-sm">{success}Password Updated Successfully</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#09152E] text-white font-medium py-2 rounded hover:bg-blue-600"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChangePassword;
