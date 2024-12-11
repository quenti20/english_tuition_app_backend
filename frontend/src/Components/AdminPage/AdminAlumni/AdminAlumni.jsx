import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAlumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [newAlumni, setNewAlumni] = useState({ name: '', school: '', exam: '', marks: '', image: null });
  const [updateAlumni, setUpdateAlumni] = useState({ id: '', name: '', school: '', exam: '', marks: '', image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'https://english-tuition-app-backend.vercel.app';

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/getAllAlumni`);
      setAlumniList(response.data.alumni);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', newAlumni.name);
    formData.append('school', newAlumni.school);
    formData.append('exam', newAlumni.exam);
    formData.append('marks', newAlumni.marks);
    formData.append('image', newAlumni.image);

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/createAlumni`, formData);
      fetchAlumni();
      setNewAlumni({ name: '', school: '', exam: '', marks: '', image: null });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', updateAlumni.name);
    formData.append('school', updateAlumni.school);
    formData.append('exam', updateAlumni.exam);
    formData.append('marks', updateAlumni.marks);
    if (updateAlumni.image) formData.append('image', updateAlumni.image);

    try {
      setLoading(true);
      await axios.put(`${apiUrl}/updateAlumni/${updateAlumni.id}`, formData);
      fetchAlumni();
      setUpdateAlumni({ id: '', name: '', school: '', exam: '', marks: '', image: null });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alumni?')) {
      try {
        setLoading(true);
        await axios.delete(`${apiUrl}/deleteAlumni/${id}`);
        fetchAlumni();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Alumni Management</h1>
      <p className="mb-6">Manage all alumni profiles from this dashboard.</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Alumni</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newAlumni.name}
            onChange={(e) => setNewAlumni({ ...newAlumni, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="School"
            value={newAlumni.school}
            onChange={(e) => setNewAlumni({ ...newAlumni, school: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Exam"
            value={newAlumni.exam}
            onChange={(e) => setNewAlumni({ ...newAlumni, exam: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Marks"
            value={newAlumni.marks}
            onChange={(e) => setNewAlumni({ ...newAlumni, marks: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            onChange={(e) => setNewAlumni({ ...newAlumni, image: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Alumni
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update Alumni</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Alumni ID"
            value={updateAlumni.id}
            onChange={(e) => setUpdateAlumni({ ...updateAlumni, id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={updateAlumni.name}
            onChange={(e) => setUpdateAlumni({ ...updateAlumni, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="School"
            value={updateAlumni.school}
            onChange={(e) => setUpdateAlumni({ ...updateAlumni, school: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Exam"
            value={updateAlumni.exam}
            onChange={(e) => setUpdateAlumni({ ...updateAlumni, exam: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Marks"
            value={updateAlumni.marks}
            onChange={(e) => setUpdateAlumni({ ...updateAlumni, marks: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            onChange={(e) => setUpdateAlumni({ ...updateAlumni, image: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update Alumni
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Alumni List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {alumniList.map((alumni) => (
            <li key={alumni._id} className="border border-gray-300 p-4 rounded flex items-center space-x-4">
              <img
                src={alumni.image}
                alt={alumni.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{alumni.name}</p>
                <p>{alumni.school}</p>
                <p>{alumni.exam} - Marks: {alumni.marks}</p>
              </div>
              <button
                onClick={() => setUpdateAlumni({ id: alumni._id, name: alumni.name, school: alumni.school, exam: alumni.exam, marks: alumni.marks, image: null })}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(alumni._id)}
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

export default AdminAlumni;