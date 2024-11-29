import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import studentData from './data.js';  // Importing student data

const Alumni = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content area */}
      <div className="pt-[82px] flex-grow p-6">
        <h1 className="text-3xl font-semibold text-center mb-8">Our Alumni</h1>
        
        {/* Display Alumni Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentData.map((student, index) => (
            <div key={index} className="bg-[#09152E] shadow-lg rounded-lg p-4">
              <img 
                src={require(`${student.photo}`)} 
                alt={student.name} 
                className="w-full h-48 object-contain rounded-t-lg mb-4" 
              />
              <div className="text-center">
                <h2 className="text-xl font-bold text-white ">{student.name || 'N/A'}</h2>
                <p className="text-white">{student.school || 'N/A'}</p>
                <p className="text-white">{student.year || 'N/A'} Batch</p>
                <p className="text-white">Marks Obtained: {student.marks_obtained || 'N/A'}</p>
                <p className="text-white">Exam: {student.exam || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Alumni;
