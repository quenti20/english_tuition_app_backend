import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSchedule = () => {
  // Base URL from the admin components architecture
  const apiUrl = 'https://english-tuition-app-backend.vercel.app';

  const [schedules, setSchedules] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    Class: '',
    literature_time: '',
    grammer_time: '',
    board: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.is_admin || user.attendance !== -1) {
      alert('Unauthorized access');
      window.location.href = '/login';
    } else {
      fetchSchedules();
    }
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllSchedules`);
      setSchedules(response.data.schedules);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/createSchedule`, formData);
      alert('Schedule created successfully!');
      fetchSchedules();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/updateSchedule/${selectedSchedule._id}`, formData);
      alert('Schedule updated successfully!');
      fetchSchedules();
      setShowUpdateForm(false);
      setSelectedSchedule(null);
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this schedule? This action cannot be undone.'
    );

    if (confirmation) {
      try {
        await axios.delete(`${apiUrl}/deleteSchedule/${id}`);
        alert('Schedule deleted successfully!');
        fetchSchedules();
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  const openUpdateForm = (schedule) => {
    setSelectedSchedule(schedule);
    setFormData({
      Class: schedule.Class,
      literature_time: schedule.literature_time,
      grammer_time: schedule.grammer_time,
      board: schedule.board,
    });
    setShowUpdateForm(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Schedules</h2>
      <button
        className="bg-green-500 text-white p-2 mb-4"
        onClick={() => setShowCreateForm(true)}
      >
        Create Schedule
      </button>

      {schedules.length > 0 ? (
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule._id} className="border p-4 mb-2">
              <p>
                <strong>Class:</strong> {schedule.Class}
              </p>
              <p>
                <strong>Literature Time:</strong> {schedule.literature_time}
              </p>
              <p>
                <strong>Grammar Time:</strong> {schedule.grammer_time}
              </p>
              <p>
                <strong>Board:</strong> {schedule.board}
              </p>
              <button
                className="bg-yellow-500 text-white p-2 mr-2"
                onClick={() => openUpdateForm(schedule)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-2"
                onClick={() => handleDeleteSchedule(schedule._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedules found.</p>
      )}

      {/* Create Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleCreateSchedule}
            className="bg-white p-4 rounded shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Create Schedule</h3>
            <label className='font-bold'>Class</label>
            <input
              type="text"
              name="Class"
              placeholder="Class"
              className="border p-2 mb-2 w-full"
              value={formData.Class}
              onChange={handleInputChange}
              required
            />
            <label className='font-bold'>literature_time</label>
            <input
              type="text"
              name="literature_time"
              placeholder="Literature Time"
              className="border p-2 mb-2 w-full"
              value={formData.literature_time}
              onChange={handleInputChange}
              required
            />
            <label className='font-bold'>grammer_time</label>
            <input
              type="text"
              name="grammer_time"
              placeholder="Grammar Time"
              className="border p-2 mb-2 w-full"
              value={formData.grammer_time}
              onChange={handleInputChange}
              required
            />
            <label className='font-bold'>board</label>
            <select
              name='board' 
              className='border p-2 mb-4 w-full'
              value={formData.board}
              onChange={handleInputChange}
              required            
            >
            <option value="" disabled>
              Select a Board
            </option>
            <option value="WBSE">WBSE</option>
            <option value="CBSE">CBSE</option>
            <option value="CISCE">CISCE</option>
            <option value="All">All</option>
            </select>
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 text-white p-2">
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white p-2"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Update Form */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdateSchedule}
            className="bg-white p-4 rounded shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Update Schedule</h3>
            <label className='font-bold'>Class</label>
            <input
              type="text"
              name="Class"
              placeholder="Class"
              className="border p-2 mb-2 w-full"
              value={formData.Class}
              onChange={handleInputChange}
              required
            />
            <label className='font-bold'>literature_time</label>
            <input
              type="text"
              name="literature_time"
              placeholder="Literature Time"
              className="border p-2 mb-2 w-full"
              value={formData.literature_time}
              onChange={handleInputChange}
              required
            />
            <label className='font-bold'>grammer_time</label>
            <input
              type="text"
              name="grammer_time"
              placeholder="Grammar Time"
              className="border p-2 mb-2 w-full"
              value={formData.grammer_time}
              onChange={handleInputChange}
              required
            />
            <label className='font-bold'>board</label>
            <input
              type="text"
              name="board"
              placeholder="Board"
              className="border p-2 mb-4 w-full"
              value={formData.board}
              onChange={handleInputChange}
              required
            />
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 text-white p-2">
                Update
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white p-2"
                onClick={() => setShowUpdateForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;
