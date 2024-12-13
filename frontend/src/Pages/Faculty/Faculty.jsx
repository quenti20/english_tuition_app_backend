import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/HomePage/Navbar';
import UserNavbar from '../../Components/UserPage/UserNavbar/UserNavbar';
import Footer from '../../Components/HomePage/Footer';

const Faculty = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUrl = 'https://english-tuition-app-backend.vercel.app/getAllTeachers/';

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setIsAuthenticated(!!userString); // Check if user is authenticated

    axios
      .get(apiUrl)
      .then((response) => {
        setTeacherData(response.data.teachers);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching teacher data:', error);
        setError('Failed to load teacher details.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Dynamic Navbar */}
      {isAuthenticated ? <UserNavbar /> : <Navbar />}

      {/* Main content area */}
      <div className="pt-[82px] flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-8 pt-2 text-[#09152E]">Our Faculty</h2>

        {loading ? (
          <p className="text-center text-lg">Loading faculty details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : teacherData.length === 0 ? (
          <p className="text-center text-gray-500">No faculty details available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teacherData.map((teacher) => (
              <div key={teacher._id} className="bg-[#09152E] p-4 rounded-lg shadow-lg text-center">
                {/* Displaying the Image */}
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                {/* Displaying the Name */}
                <h3 className="text-xl font-bold text-white">{teacher.name}</h3>

                {/* Displaying the Post */}
                <p className="text-md font-medium text-gray-300">{teacher.post}</p>

                {/* Displaying the Qualifications */}
                <p className="text-sm text-gray-400">{teacher.qualifications}</p>
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

export default Faculty;
