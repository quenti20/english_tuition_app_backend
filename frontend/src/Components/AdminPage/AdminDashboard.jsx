import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Retrieve and validate user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.is_admin === true && userData.attendance === -1) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    navigate('/login'); // Redirect to the login page
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">
          Unauthorized Access is Prohibited
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome Admin!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Log Out
        </button>
      </header>

      {/* Permissions Info */}
      <p className="text-lg text-gray-700 mb-8">
        You have the permission to Create, Read, Update, and Delete all information from the Website.
      </p>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => navigate('/admin/alumni')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Alumni
        </button>
        <button
          onClick={() => navigate('/admin/banner')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Banner
        </button>
        <button
          onClick={() => navigate('/admin/data')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Data
        </button>
        <button
          onClick={() => navigate('/admin/fee')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Fee
        </button>
        <button
          onClick={() => navigate('/admin/gallery-images')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Gallery Images
        </button>
        <button
          onClick={() => navigate('/admin/notes')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Notes
        </button>
        <button
          onClick={() => navigate('/admin/publication')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Publication
        </button>
        <button
          onClick={() => navigate('/admin/schedule')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Schedule
        </button>
        <button
          onClick={() => navigate('/admin/teacher')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Teacher
        </button>
        <button
          onClick={() => navigate('/admin/users')}
          className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Students/Users
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
