import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { FacultyData } from './data'; // Update this path if needed

const Faculty = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content area */}
      <div className="pt-[82px] flex-grow bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-8 pt-2">Our Faculty</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FacultyData.map((faculty, index) => (
            <div key={index} className="bg-[#09152E] p-4 rounded-lg shadow-lg text-center">
              
              {/* Displaying the Image */}
              <img
                src={require(`${faculty.photo}`)}
                alt={faculty.name}
                className="w-full h-40 object-contain rounded-lg mb-4"
              />
              
              {/* Displaying the Name */}
              <h3 className="text-xl font-bold text-white">{faculty.name}</h3>
              
              {/* Displaying the Designation */}
              <p className="text-md font-medium text-white">{faculty.designation}</p>
              
              {/* Displaying the Qualification */}
              <p className="text-sm text-white">{faculty.qualification}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Faculty;
