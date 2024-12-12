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
    if (!user || !user.is_admin || user.attendance !== 0) {
      alert('Unauthorized access');
      window.location.href = '/login';
    }
    else {
        fetchUsers() ;
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
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
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
