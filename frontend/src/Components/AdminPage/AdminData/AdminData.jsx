import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminData = () => {
  const [dataList, setDataList] = useState([]);
  const [newData, setNewData] = useState({ upi_id: '', payment_qr: null });
  const [updateData, setUpdateData] = useState({ id: '', upi_id: '', payment_qr: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.is_admin || user.attendance !== -1) {
      alert('Unauthorized user');
      navigate('/login');
      return;
    }

    fetchAllData();
  }, [navigate]);

  const apiUrl = 'https://english-tuition-app-backend.vercel.app';

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/getAllData`);
      setDataList(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('upi_id', newData.upi_id);
    formData.append('payment_qr', newData.payment_qr);

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/createData`, formData);
      fetchAllData();
      setNewData({ upi_id: '', payment_qr: null });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('upi_id', updateData.upi_id);
    if (updateData.payment_qr) formData.append('payment_qr', updateData.payment_qr);

    try {
      setLoading(true);
      await axios.put(`${apiUrl}/updateData/${updateData.id}`, formData);
      fetchAllData();
      setUpdateData({ id: '', upi_id: '', payment_qr: null });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this data?')) {
      try {
        setLoading(true);
        await axios.delete(`${apiUrl}/deleteData/${id}`);
        fetchAllData();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Data Management</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Data</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="UPI ID"
            value={newData.upi_id}
            onChange={(e) => setNewData({ ...newData, upi_id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            onChange={(e) => setNewData({ ...newData, payment_qr: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Data
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update Data</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Data ID"
            value={updateData.id}
            onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="UPI ID"
            value={updateData.upi_id}
            onChange={(e) => setUpdateData({ ...updateData, upi_id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            onChange={(e) => setUpdateData({ ...updateData, payment_qr: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update Data
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Data List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {dataList.map((data) => (
            <li key={data._id} className="border border-gray-300 p-4 rounded flex items-center space-x-4">
              <img
                src={data.payment_qr}
                alt="QR Code"
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">UPI ID: {data.upi_id}</p>
              </div>
              <button
                onClick={() => setUpdateData({ id: data._id, upi_id: data.upi_id, payment_qr: null })}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(data._id)}
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

export default AdminData;