import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); // User object for editing
  const [classFilter, setClassFilter] = useState('all');
  const [boardFilter, setBoardFilter] = useState('All');

  const classOptions = ['5', '6', '7', '8', '9', '10', '11', '12', 'all'];
  const boardOptions = ['WBSE', 'CISCE', 'CBSE', 'All'];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [classFilter, boardFilter, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://english-tuition-app-backend.vercel.app/getAllUsers');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const applyFilters = () => {
    const filtered = users.filter(user => {
      const matchesClass = classFilter === 'all' || user.Class === classFilter;
      const matchesBoard = boardFilter === 'All' || user.board === boardFilter;
      return matchesClass && matchesBoard;
    });
    setFilteredUsers(filtered);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleEditFileChange = (e) => {
    setEditUser({ ...editUser, payment_ss: Array.from(e.target.files) });
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(editUser).forEach((key) => {
      if (key === 'payment_ss') {
        editUser.payment_ss.forEach((file, index) => {
          formData.append(`payment_ss[${index}]`, file);
        });
      } else {
        formData.append(key, editUser[key]);
      }
    });

    try {
      await axios.put(`https://english-tuition-app-backend.vercel.app/updateUser/${editUser._id}`, formData);
      alert('User updated successfully!');
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://english-tuition-app-backend.vercel.app/deleteUser/${id}`);
      alert('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Users</h2>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <select
          className="border p-2"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          {classOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={boardFilter}
          onChange={(e) => setBoardFilter(e.target.value)}
        >
          {boardOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* User List */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">User List</h3>
        {filteredUsers.length > 0 ? (
          <ul>
            {filteredUsers.map((user) => (
              <li key={user._id} className="border p-2 mb-2">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phone_number}</p>
                <p><strong>Guardian Number:</strong> {user.guardian_number}</p>
                <p><strong>Date of Birth:</strong> {user.DOB}</p>
                <p><strong>Date of Admission Request:</strong> {user.date_of_admission_request}</p>
                <p><strong>Payment Status:</strong> {user.payment_status}</p>
                <p><strong>Attendance:</strong> {user.attendance}</p>
                <p>
                  <strong>Exam Scores:</strong>{' '}
                  {user.exam_score && user.exam_score.length > 0
                    ? user.exam_score.join(', ')
                    : 'No scores available'}
                </p>
                <div>
                  <strong>Payment Screenshots:</strong>
                  <div className="flex gap-2 mt-2">
                    {user.payment_ss &&
                      user.payment_ss.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Payment Screenshot ${index + 1}`}
                          className="w-16 h-16 object-cover border"
                        />
                      ))}
                  </div>
                </div>
                <button
                  className="bg-yellow-500 text-white p-2 mt-2"
                  onClick={() => handleEditClick(user)}
                >
                  Edit User
                </button>
                <button
                  className="bg-red-500 text-white p-2 mt-2 ml-2"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete User
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Edit User Form */}
      {editUser && (
        <form onSubmit={handleEditUser} className="border p-4 mt-4">
          <h3 className="text-xl font-semibold mb-4">Edit User</h3>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="border p-2 w-full mb-2"
            value={editUser.name}
            onChange={handleEditInputChange}
          />

          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="border p-2 w-full mb-2"
            value={editUser.email}
            onChange={handleEditInputChange}
          />

          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            className="border p-2 w-full mb-2"
            value={editUser.phone_number}
            onChange={handleEditInputChange}
          />

          <label className="block mb-1">Guardian Phone Number</label>
          <input
            type="text"
            name="guardian_number"
            className="border p-2 w-full mb-2"
            value={editUser.guardian_number}
            onChange={handleEditInputChange}
          />

          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            name="DOB"
            className="border p-2 w-full mb-2"
            value={editUser.DOB}
            onChange={handleEditInputChange}
          />

          <label className="block mb-1">Payment Screenshots</label>
          <input
            type="file"
            name="payment_ss"
            className="border p-2 w-full mb-2"
            multiple
            onChange={handleEditFileChange}
          />

          <button className="bg-blue-500 text-white p-2 mt-2">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default AdminUsers;
