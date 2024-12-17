import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      const res = await axios.post('https://english-tuition-app-backend.vercel.app/login', {
        email,
        password,
      });

      if (res.status === 200) {
        const { user } = res.data;

        // Store user details in local storage
        localStorage.setItem('user', JSON.stringify(user));

        // Navigate based on user role
        if (user.is_admin && user.attendance == -1) {
          navigate('/admin');
        } else {
          navigate('/userDashboard');
        }
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-[#09152E] p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-2 relative">
            <label htmlFor="password" className="block text-white font-bold mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            {/* Eye Icon for Show/Hide Password */}
            <span
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Disclaimer Below Password */}
          <p className="text-sm text-gray-300 mb-6">
            The Password is Your Date of Birth (DOB) in <strong>ddmmyyyy</strong> format unless it is changed by <strong>You</strong> or the <strong>Admin</strong>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
