import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../../HomePage/Footer';

const UserSchedule = () => {
  const [schedules, setSchedules] = useState([]); // All schedules fetched
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userBoard, setUserBoard] = useState(''); // Store user's board

  const apiUrl = 'https://english-tuition-app-backend.vercel.app/getAllSchedules/';

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

    const isAdmin = userObject.is_admin;

    // Check if the user is not an admin and has valid contact information
    if (isAdmin || !userObject.phone_number || !userObject.guardian_number) {
      setError('Unauthorized Access.');
      setLoading(false);
      return;
    }

    setUserBoard(userObject.board); // Save the user's board name

    // Fetch schedules from the API
    axios
      .get(apiUrl)
      .then((response) => {
        setSchedules(response.data.schedules); // Set all schedules
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
      <UserNavbar />
      <div className="pt-[100px] flex-grow p-6">
        <h1 className="text-3xl font-semibold text-center mb-8 text-[#000000]">
          Class Schedules
        </h1>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : loading ? (
          <p className="text-center text-lg">Loading schedules...</p>
        ) : (
          <div>
            {/* Display User's Board at the Top */}
            {userBoard && (
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#1E2A47]">
                  {userBoard} Schedule
                </h2>
                <p className="text-lg text-gray-700">
                  Your Board Schedule
                </p>
              </div>
            )}

            {/* Render Grouped Schedules */}
            {Object.keys(groupedSchedules).map((board) => (
              <div key={board} className="mb-8">
                {/* Board Heading */}
                <h2 className="text-2xl font-bold mb-4 text-[#1E2A47]">{board}</h2>
                {/* Table for each Board */}
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
                      {groupedSchedules[board].map((item) => (
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
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserSchedule;
