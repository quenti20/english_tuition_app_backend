import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    notes_name: '',
    Class: '5',
    board: 'WBSE',
    pdf_file: null,
    image: null,
  });
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedBoard, setSelectedBoard] = useState('All');
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

    fetchNotes();
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/getAllNotes`);
      setNotes(response.data.notes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!newNote.notes_name || !newNote.Class || !newNote.board || !newNote.pdf_file || !newNote.image) {
      alert('All fields are required. Please fill in all details before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('notes_name', newNote.notes_name);
    formData.append('Class', newNote.Class);
    formData.append('board', newNote.board);
    formData.append('pdf_file', newNote.pdf_file);
    formData.append('image', newNote.image);

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/createNotes`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchNotes();
      setNewNote({ notes_name: '', Class: '5', board: 'WBSE', pdf_file: null, image: null });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        setLoading(true);
        await axios.delete(`${apiUrl}/deleteNote/${id}`);
        fetchNotes();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: 'blob', // Fetch the file as a Blob
      });

      // Create a blob link to trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName.replace(/\s+/g, '_')}.pdf`; // Add .pdf extension
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      console.error('Failed to download the file:', error);
      alert('Failed to download the file. Please try again.');
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      (selectedClass === 'all' || note.Class === selectedClass) &&
      (selectedBoard === 'All' || note.board === selectedBoard)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Notes Management</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload New Note</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <label className="block font-medium">Notes Name</label>
          <input
            type="text"
            placeholder="Notes Name"
            value={newNote.notes_name}
            onChange={(e) => setNewNote({ ...newNote, notes_name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label className="block font-medium">Class</label>
          <select
            value={newNote.Class}
            onChange={(e) => setNewNote({ ...newNote, Class: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {['5', '6', '7', '8', '9', '10', '11', '12', 'all'].map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          <label className="block font-medium">Board</label>
          <select
            value={newNote.board}
            onChange={(e) => setNewNote({ ...newNote, board: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {['WBSE', 'CISCE', 'CBSE', 'All'].map((board) => (
              <option key={board} value={board}>
                {board}
              </option>
            ))}
          </select>
          <label className="block font-medium">Upload PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setNewNote({ ...newNote, pdf_file: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewNote({ ...newNote, image: e.target.files[0] })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload Note
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Notes List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {filteredNotes.map((note) => (
            <li
              key={note._id}
              className="border border-gray-300 p-4 rounded flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">{note.notes_name}</h3>
                <p>Class: {note.Class}</p>
                <p>Board: {note.board}</p>
                {note.image && (
                  <img
                    src={note.image}
                    alt="Note Thumbnail"
                    className="w-32 h-32 object-cover my-2"
                  />
                )}
                <button
                  onClick={() => handleDownload(note.pdf_file, note.notes_name)}
                  className="text-blue-500 underline"
                >
                  Download PDF
                </button>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/updateNote/${note._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotes;
