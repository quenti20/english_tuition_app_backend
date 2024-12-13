import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/HomePage/Navbar';
import UserNavbar from '../../Components/UserPage/UserNavbar/UserNavbar';
import Footer from '../../Components/HomePage/Footer';

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUrl = 'https://english-tuition-app-backend.vercel.app/getAllPublications/';

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setIsAuthenticated(!!userString); // Check if user is authenticated

    axios
      .get(apiUrl)
      .then((response) => {
        setPublications(response.data.publications);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching publications:', error);
        setError('Failed to load publications.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Dynamic Navbar */}
      {isAuthenticated ? <UserNavbar /> : <Navbar />}

      {/* Main content area */}
      <div className="pt-[82px] flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#09152E]">Publications</h2>

        {loading ? (
          <p className="text-center text-lg">Loading publications...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : publications.length === 0 ? (
          <p className="text-center text-gray-500">No publications available.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {publications.map((publication, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row bg-[#09152E] rounded-lg shadow-lg overflow-hidden"
              >
                {/* Image Section */}
                <div className="w-full md:w-1/3 flex items-center justify-center">
                  <img
                    src={publication.image}
                    alt={publication.name}
                    className="object-cover h-48 w-full md:w-auto rounded-lg"
                  />
                </div>

                {/* Information Section */}
                <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white mb-4">{publication.name}</h3>
                  
                  {/* Author */}
                  <p className="text-md font-medium text-gray-300 mb-2">Author: {publication.author}</p>
                  
                  {/* Description */}
                  {publication.desc && (
                    <p className="text-md text-gray-400 mb-6">{publication.desc}</p>
                  )}

                  {/* Download Link */}
                  {publication.link ? (
                    <a
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-max bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 font-medium"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">PDF link not available</p>
                  )}
                </div>
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

export default Publications;
