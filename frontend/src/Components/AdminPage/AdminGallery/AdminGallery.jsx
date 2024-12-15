import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminGallery = () => {
  const [galleryList, setGalleryList] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = 'https://english-tuition-app-backend.vercel.app';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.is_admin || user.attendance !== -1) {
      alert('Unauthorized user');
      navigate('/login');
      return;
    }

    fetchAllGalleryImages();
  }, [navigate]);

  const fetchAllGalleryImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/getAllGalleryImages`);
      setGalleryList(response.data.galleryImages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!newImage) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', newImage);

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/createGalleryImage`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchAllGalleryImages();
      setNewImage(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        setLoading(true);
        await axios.delete(`${apiUrl}/deleteGalleryImage/${id}`);
        fetchAllGalleryImages();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const toggleSelectImage = (id) => {
    setSelectedImages((prev) => {
      if (prev.includes(id)) {
        return prev.filter((imageId) => imageId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Gallery Management</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload New Image</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload Image
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Gallery List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {galleryList.map((image) => (
            <li
              key={image._id}
              className="border border-gray-300 p-4 rounded flex items-center space-x-4"
            >
              <input
                type="checkbox"
                checked={selectedImages.includes(image._id)}
                onChange={() => toggleSelectImage(image._id)}
              />
              <div className="flex-1">
                <img
                  src={image.image}
                  alt="Gallery Item"
                  className="w-32 h-32 object-cover mb-2"
                />
              </div>
              <button
                onClick={() => handleDelete(image._id)}
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

export default AdminGallery;
