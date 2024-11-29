import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import scheduleData from './data.js';

const Schedule = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-300">
      <Navbar />

      {/* Main content area */}
      <div className="pt-[82px] flex-grow px-4">
        <h1 className="text-3xl font-bold text-center my-4">Class Schedules (2024-2025)</h1>
        
        {/* Display routine by boards */}
        {Object.entries(scheduleData).map(([board, classes], index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{board}</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#09152E] text-white">
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Literature</th>
                  <th className="border p-2">Grammar</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="border p-2">{item.class}</td>
                    <td className="border p-2">{item.literature}</td>
                    <td className="border p-2">{item.grammar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Schedule;