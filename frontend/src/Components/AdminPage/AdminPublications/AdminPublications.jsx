import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPublications = () => {
  // Use the baseUrl from AdminUsers
  const apiUrl = 'https://english-tuition-app-backend.vercel.app'; // Replace with the `baseUrl` from AdminUsers

  const [publications, setPublications] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    link: '',
    desc: '',
    image: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.is_admin || user.attendance !== 0) {
      alert('Unauthorized access');
      window.location.href = '/login';
    } else {
      fetchPublications();
    }
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllPublications`);
      setPublications(response.data.publications);
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleCreatePublication = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('author', formData.author);
    data.append('link', formData.link);
    data.append('desc', formData.desc);
    data.append('image', formData.image);

    try {
      await axios.post(`${apiUrl}/createPublication`, data);
      alert('Publication created successfully!');
      fetchPublications();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating publication:', error);
    }
  };

  const handleUpdatePublication = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('author', formData.author);
    data.append('link', formData.link);
    data.append('desc', formData.desc);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.put(
        `${apiUrl}/updatePublication/${selectedPublication._id}`,
        data
      );
      alert('Publication updated successfully!');
      fetchPublications();
      setShowUpdateForm(false);
      setSelectedPublication(null);
    } catch (error) {
      console.error('Error updating publication:', error);
    }
  };

  const handleDeletePublication = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this publication? This action cannot be undone.'
    );

    if (confirmation) {
      try {
        await axios.delete(`${apiUrl}/deletePublication/${id}`);
        alert('Publication deleted successfully!');
        fetchPublications();
      } catch (error) {
        console.error('Error deleting publication:', error);
      }
    }
  };

  const openUpdateForm = (publication) => {
    setSelectedPublication(publication);
    setFormData({
      name: publication.name,
      author: publication.author,
      link: publication.link,
      desc: publication.desc,
      image: null, // New image is optional
    });
    setShowUpdateForm(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Publications</h2>
      <button
        className="bg-green-500 text-white p-2 mb-4"
        onClick={() => setShowCreateForm(true)}
      >
        Create Publication
      </button>

      {publications.length > 0 ? (
        <ul>
          {publications.map((publication) => (
            <li key={publication._id} className="border p-4 mb-2">
              <p>
                <strong>Name:</strong> {publication.name}
              </p>
              <p>
                <strong>Author:</strong> {publication.author}
              </p>
              <p>
                <strong>Description:</strong> {publication.desc}
              </p>
              <p>
                <strong>Link:</strong>{' '}
                <a href={publication.link} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:text-blue-700'>
                  {publication.link}
                </a>
              </p>
              <p>
                <strong>Image:</strong>{' '}
                <img
                  src={publication.image}
                  alt="publication"
                  className="w-32 h-auto border rounded"
                />
              </p>
              <button
                className="bg-yellow-500 text-white p-2 mr-2"
                onClick={() => openUpdateForm(publication)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-2"
                onClick={() => handleDeletePublication(publication._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No publications found.</p>
      )}

      {/* Create Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleCreatePublication}
            className="bg-white p-4 rounded shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Create Publication</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 mb-2 w-full"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              className="border p-2 mb-2 w-full"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="link"
              placeholder="Link"
              className="border p-2 mb-2 w-full"
              value={formData.link}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="desc"
              placeholder="Description"
              className="border p-2 mb-2 w-full"
              value={formData.desc}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="image"
              className="border p-2 mb-4 w-full"
              onChange={handleFileChange}
              required
            />
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
            onSubmit={handleUpdatePublication}
            className="bg-white p-4 rounded shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Update Publication</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 mb-2 w-full"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              className="border p-2 mb-2 w-full"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="link"
              placeholder="Link"
              className="border p-2 mb-2 w-full"
              value={formData.link}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="desc"
              placeholder="Description"
              className="border p-2 mb-2 w-full"
              value={formData.desc}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="image"
              className="border p-2 mb-4 w-full"
              onChange={handleFileChange}
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

export default AdminPublications;
