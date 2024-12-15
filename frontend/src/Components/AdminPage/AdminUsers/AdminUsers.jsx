import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [classFilter, setClassFilter] = useState('all');
  const [boardFilter, setBoardFilter] = useState('All');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const classOptions = ['5', '6', '7', '8', '9', '10', '11', '12'];
  const boardOptions = ['WBSE', 'CISCE', 'CBSE'];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.is_admin || user.attendance !== -1) {
      alert('Unauthorized access');
      window.location.href = '/login';
    } else {
      fetchUsers();
    }
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

  const handleDeleteUser = async (id) => {
    const userConfirmation = window.confirm(
      'Are you sure you want to delete this user? This action cannot be undone.'
    );

    if (userConfirmation) {
      try {
        await axios.delete(`https://english-tuition-app-backend.vercel.app/deleteUser/${id}`);
        alert('User deleted successfully!');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
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
          {['all', ...classOptions].map((option) => (
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
          {['All', ...boardOptions].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Create and User List */}
      <button
        className="bg-green-500 text-white p-2 mb-4"
        onClick={() => setShowCreateUser(true)}
      >
        Create User
      </button>

      {filteredUsers.length > 0 ? (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user._id} className="border p-2 mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    <strong>Name:</strong> {user.name}{' '}
                    <span
                      className={
                        user.active_status
                          ? 'text-green-600 font-bold'
                          : 'text-red-600 font-bold'
                      }
                    >
                      {user.active_status ? 'Currently Student' : 'Admission Requested'}
                    </span>
                  </p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone_number}</p>
                  <p><strong>Guardian Number:</strong> {user.guardian_number}</p>
                  <p><strong>Class:</strong> {user.Class}</p>
                  <p><strong>Board:</strong> {user.board}</p>
                  <p><strong>DOB:</strong> {user.DOB}</p>
                  <p><strong>Payment Status:</strong> {user.payment_status ? 'Paid' : 'Unpaid'}</p>
                  <p><strong>Date of Admission Request:</strong> {new Date(user.date_of_admission_request).toLocaleString()}</p>
                  <p><strong>Payment Screenshot:</strong></p>
                  <img
                    src={user.payment_ss}
                    alt="payment_screenshot_image"
                    className="w-32 h-auto border rounded"
                    onError={(e) => (e.target.src = '', e.target.alt = 'payment_screenshot_image')}
                  />
                </div>
                <div className="flex flex-col">
                  <button
                    className="bg-yellow-500 text-white p-2 mt-2"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUpdateUser(true);
                    }}
                  >
                    Edit User
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 mt-2"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}

      {/* Modals */}
      {showCreateUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CreateUser
            onClose={() => setShowCreateUser(false)}
            onUserCreated={fetchUsers}
          />
        </div>
      )}

      {showUpdateUser && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <UpdateUser
            user={selectedUser}
            onClose={() => {
              setShowUpdateUser(false);
              setSelectedUser(null);
            }}
            onUserUpdated={fetchUsers}
          />
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
    