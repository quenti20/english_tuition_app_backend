import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBanner = () => {
  const [bannerList, setBannerList] = useState([]);
  const [newBanner, setNewBanner] = useState({ image: null });
  const [updateBanner, setUpdateBanner] = useState({ id: '', image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'https://english-tuition-app-backend.vercel.app';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.is_admin || user.attendance !== 0) {
      alert('Unauthorized access');
      window.location.href = '/login';
    }
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/getAllBanners`);
      setBannerList(response.data.banners);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('image', newBanner.image);

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/createBanner`, formData);
      fetchBanners();
      setNewBanner({ image: null });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    if (updateBanner.image) formData.append('image', updateBanner.image);

    try {
      setLoading(true);
      await axios.put(`${apiUrl}/updateBanner/${updateBanner.id}`, formData);
      fetchBanners();
      setUpdateBanner({ id: '', image: null });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        setLoading(true);
        await axios.delete(`${apiUrl}/deleteBanner/${id}`);
        fetchBanners();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Banner Management</h1>
      <p className="mb-6">Manage all banners from this dashboard.</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Banner</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="file"
            onChange={(e) => setNewBanner({ image: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Banner
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update Banner</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Banner ID"
            value={updateBanner.id}
            onChange={(e) => setUpdateBanner({ ...updateBanner, id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            onChange={(e) => setUpdateBanner({ ...updateBanner, image: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update Banner
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Banner List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {bannerList.map((banner) => (
            <li key={banner._id} className="border border-gray-300 p-4 rounded flex items-center space-x-4">
              <img
                src={banner.image}
                alt="Banner"
                className="w-16 h-16 rounded object-cover"
              />
              <button
                onClick={() => setUpdateBanner({ id: banner._id, image: null })}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(banner._id)}
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

export default AdminBanner;
