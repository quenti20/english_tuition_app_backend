import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/HomePage/Navbar';
import UserNavbar from '../../Components/UserPage/UserNavbar/UserNavbar';
import Footer from '../../Components/HomePage/Footer';

const Alumni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUrl = 'https://english-tuition-app-backend.vercel.app/getAllAlumni/';

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setIsAuthenticated(!!userString); // Check if user is authenticated

    axios
      .get(apiUrl)
      .then((response) => {
        setAlumniData(response.data.alumni);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching alumni data:', error);
        setError('Failed to load alumni details.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Dynamic Navbar */}
      {isAuthenticated ? <UserNavbar /> : <Navbar />}

      {/* Main content area */}
      <div className="pt-[82px] flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-8 pt-2 text-[#09152E]">Our Alumni</h2>

        {loading ? (
          <p className="text-center text-lg">Loading alumni details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : alumniData.length === 0 ? (
          <p className="text-center text-gray-500">No alumni details available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumniData.map((alumni) => (
              <div key={alumni._id} className="bg-[#09152E] p-4 rounded-lg shadow-lg text-center">
                {/* Displaying the Image */}
                <img
                  src={alumni.image}
                  alt={alumni.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                {/* Displaying the Name */}
                <h3 className="text-xl font-bold text-white">{alumni.name}</h3>

                {/* Displaying the School */}
                <p className="text-md font-medium text-gray-300">{alumni.school}</p>

                {/* Displaying the Exam */}
                <p className="text-sm text-gray-400">Exam: {alumni.exam}</p>

                {/* Displaying the Marks */}
                <p className="text-sm text-gray-400">Marks: {alumni.marks}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Alumni;
