import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTeacher = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', post: '', qualifications: '', image: null });
  const [updateTeacher, setUpdateTeacher] = useState({ id: '', name: '', post: '', qualifications: '', image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'https://english-tuition-app-backend.vercel.app';

  // Check user authentication and permissions
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.is_admin || user.attendance !== -1) {
      alert('Unauthorized access');
      window.location.href = '/login';
    }
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/getAllTeachers`);
      setTeacherList(response.data.teachers);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', newTeacher.name);
    formData.append('post', newTeacher.post);
    formData.append('qualifications', newTeacher.qualifications);
    formData.append('image', newTeacher.image);

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/createTeacher`, formData);
      fetchTeachers();
      setNewTeacher({ name: '', post: '', qualifications: '', image: null });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', updateTeacher.name);
    formData.append('post', updateTeacher.post);
    formData.append('qualifications', updateTeacher.qualifications);
    if (updateTeacher.image) formData.append('image', updateTeacher.image);

    try {
      setLoading(true);
      await axios.put(`${apiUrl}/updateTeacher/${updateTeacher.id}`, formData);
      fetchTeachers();
      setUpdateTeacher({ id: '', name: '', post: '', qualifications: '', image: null });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        setLoading(true);
        await axios.delete(`${apiUrl}/deleteTeacher/${id}`);
        fetchTeachers();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Teacher Management</h1>
      <p className="mb-6">Manage all teacher profiles from this dashboard.</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Teacher</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Post"
            value={newTeacher.post}
            onChange={(e) => setNewTeacher({ ...newTeacher, post: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Qualifications"
            value={newTeacher.qualifications}
            onChange={(e) => setNewTeacher({ ...newTeacher, qualifications: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            onChange={(e) => setNewTeacher({ ...newTeacher, image: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Teacher
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update Teacher</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Teacher ID"
            value={updateTeacher.id}
            onChange={(e) => setUpdateTeacher({ ...updateTeacher, id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={updateTeacher.name}
            onChange={(e) => setUpdateTeacher({ ...updateTeacher, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Post"
            value={updateTeacher.post}
            onChange={(e) => setUpdateTeacher({ ...updateTeacher, post: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Qualifications"
            value={updateTeacher.qualifications}
            onChange={(e) => setUpdateTeacher({ ...updateTeacher, qualifications: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            onChange={(e) => setUpdateTeacher({ ...updateTeacher, image: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update Teacher
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Teacher List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {teacherList.map((teacher) => (
            <li key={teacher._id} className="border border-gray-300 p-4 rounded flex items-center space-x-4">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{teacher.name}</p>
                <p>{teacher.post}</p>
                <p>Qualifications: {teacher.qualifications}</p>
              </div>
              <button
                onClick={() => setUpdateTeacher({ id: teacher._id, name: teacher.name, post: teacher.post, qualifications: teacher.qualifications, image: null })}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(teacher._id)}
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

export default AdminTeacher;
