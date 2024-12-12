import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminFee = () => {
  const [feeList, setFeeList] = useState([]);
  const [newFee, setNewFee] = useState({ Class: '', fee: '' });
  const [updateFee, setUpdateFee] = useState({ id: '', Class: '', fee: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.is_admin || user.attendance !== 0) {
      alert('Unauthorized user');
      navigate('/login');
      return;
    }

    fetchAllFees();
  }, [navigate]);

  const apiUrl = 'https://english-tuition-app-backend.vercel.app';

  const fetchAllFees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/getAllFee`);
      setFeeList(response.data.fees);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/createFee`, newFee);
      fetchAllFees();
      setNewFee({ Class: '', fee: '' });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiUrl}/updateFee/${updateFee.id}`, {
        Class: updateFee.Class,
        fee: updateFee.fee,
      });
      fetchAllFees();
      setUpdateFee({ id: '', Class: '', fee: '' });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fee record?')) {
      try {
        setLoading(true);
        await axios.delete(`${apiUrl}/deleteFee/${id}`);
        fetchAllFees();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Fee Management</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Fee</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Class"
            value={newFee.Class}
            onChange={(e) => setNewFee({ ...newFee, Class: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Fee"
            value={newFee.fee}
            onChange={(e) => setNewFee({ ...newFee, fee: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Fee
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update Fee</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Fee ID"
            value={updateFee.id}
            onChange={(e) => setUpdateFee({ ...updateFee, id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Class"
            value={updateFee.Class}
            onChange={(e) => setUpdateFee({ ...updateFee, Class: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Fee"
            value={updateFee.fee}
            onChange={(e) => setUpdateFee({ ...updateFee, fee: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update Fee
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Fee List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {feeList.map((fee) => (
            <li key={fee._id} className="border border-gray-300 p-4 rounded flex items-center space-x-4">
              <div className="flex-1">
                <p className="font-semibold">Class: {fee.Class}</p>
                <p>Fee: {fee.fee}</p>
              </div>
              <button
                onClick={() => setUpdateFee({ id: fee._id, Class: fee.Class, fee: fee.fee })}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(fee._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminFee;
