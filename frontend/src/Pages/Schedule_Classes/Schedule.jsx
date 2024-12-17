import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/HomePage/Navbar';
import Footer from '../../Components/HomePage/Footer';
import axios from 'axios';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]); // Store all schedules
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Handle errors

  const apiUrl = 'https://english-tuition-app-backend.vercel.app/getAllSchedules/';

  useEffect(() => {
    // Fetch schedules from the API
    axios
      .get(apiUrl)
      .then((response) => {
        setSchedules(response.data.schedules); // Store the fetched schedules
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching schedules:', error);
        setError('Failed to load schedules.');
        setLoading(false);
      });
  }, []);

  // Group schedules by board
  const groupByBoard = (data) => {
    return data.reduce((acc, schedule) => {
      const { board } = schedule;
      if (!acc[board]) {
        acc[board] = [];
      }
      acc[board].push(schedule);
      return acc;
    }, {});
  };

  const groupedSchedules = groupByBoard(schedules);

  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-[100px] flex-grow p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#1E2A47]">
          Class Schedules (2024-2025)
        </h1>
        
        {/* Loading and Error Handling */}
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : loading ? (
          <p className="text-center text-lg text-[#1E2A47]">Loading schedules...</p>
        ) : (
          // Display routine grouped by boards
          Object.entries(groupedSchedules).map(([board, classes], index) => (
            <div key={index} className="mb-8">
              {/* Board Heading */}
              <h2 className="text-2xl font-bold mb-4 text-center text-[#1E2A47] uppercase">
                {board}
              </h2>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1E2A47] text-[#FFD700] uppercase text-sm">
                      <th className="p-4 border-b border-[#2E3A55]">Class</th>
                      <th className="p-4 border-b border-[#2E3A55]">Literature Time</th>
                      <th className="p-4 border-b border-[#2E3A55]">Grammar Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-[#1E2A47] transition text-black hover:text-white"
                      >
                        <td className="p-4 border-b border-[#2E3A55]">{item.Class}</td>
                        <td className="p-4 border-b border-[#2E3A55]">{item.literature_time}</td>
                        <td className="p-4 border-b border-[#2E3A55]">{item.grammer_time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Schedule;
