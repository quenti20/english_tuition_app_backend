import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../../HomePage/Footer';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = 'https://english-tuition-app-backend.vercel.app/getAllUsers/';

  useEffect(() => {
    const userString = localStorage.getItem('user'); // Retrieve the user object from localStorage
    if (!userString) {
      setError('Unauthorized Access.');
      setLoading(false);
      return;
    }

    let userObject;
    try {
      userObject = JSON.parse(userString); // Parse the JSON string
    } catch (e) {
      console.error('Failed to parse user data from localStorage:', e);
      setError('Invalid user data in localStorage.');
      setLoading(false);
      return;
    }

    const userId = userObject.id;
    const isAdmin = userObject.is_admin;

    // Check if user is not admin and has valid contact info
    if (isAdmin || !userObject.phone_number || !userObject.guardian_number) {
      setError('Unauthorized Access.');
      setLoading(false);
      return;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        const allUsers = response.data.users;
        const user = allUsers.find((user) => user._id === userId); // Find the user by ID

        if (user) {
          setUserData(user);
        } else {
          setError('User not found.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen  text-white">
      <UserNavbar />
      <div className="pt-[100px] flex-grow p-6">
        {loading ? (
          <p className="text-center text-lg">Loading profile...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="max-w-4xl mx-auto bg-[#1E2A47] p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-semibold text-center mb-6">
              Welcome, {userData.name}!
            </h1>
            <p className="text-center text-gray-300 mb-8">
              Profile Section for <span className="text-[#FFD700]">{userData.name}</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#162137] p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-2 text-[#FFD700]">Personal Details</h2>
                <p><span className="font-semibold text-gray-300">Name:</span> {userData.name}</p>
                <p><span className="font-semibold text-gray-300">Email:</span> {userData.email}</p>
                <p><span className="font-semibold text-gray-300">Phone:</span> {userData.phone_number}</p>
                <p><span className="font-semibold text-gray-300">DOB:</span> {userData.DOB}</p>
              </div>

              <div className="bg-[#162137] p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-2 text-[#FFD700]">Academic Information</h2>
                <p><span className="font-semibold text-gray-300">Class:</span> {userData.Class}</p>
                <p><span className="font-semibold text-gray-300">Board:</span> {userData.board}</p>
                <p>
                  <span className="font-semibold text-gray-300">Guardian's Phone:</span> {userData.guardian_number}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Admission Date:</span>{' '}
                  {new Date(userData.date_of_admission_request).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-[#162137] p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-2 text-[#FFD700]">Payment Details</h2>
                <p>
                  <span className="font-semibold text-gray-300">Payment Status:</span>{' '}
                  {userData.payment_status ? 'Paid' : 'Pending'}
                </p>
                {userData.payment_ss && (
                  <div className="mt-2">
                    <span className="font-semibold text-gray-300">Screenshot:</span>
                    <img
                      src={userData.payment_ss}
                      alt="Payment Screenshot"
                      className="mt-2 rounded shadow"
                    />
                  </div>
                )}
              </div>

              <div className="bg-[#162137] p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-2 text-[#FFD700]">Additional Information</h2>
                <p>
                  <span className="font-semibold text-gray-300">Active Status:</span>{' '}
                  {userData.active_status ? 'Admitted Student' : 'Admission Requested'}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Attendance:</span> {userData.attendance}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
