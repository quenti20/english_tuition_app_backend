import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../../HomePage/Footer';

const UserNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = 'https://english-tuition-app-backend.vercel.app/getAllNotes/';

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      setError('Unauthorized Access.');
      setLoading(false);
      return;
    }

    let userObject;
    try {
      userObject = JSON.parse(userString);
    } catch (e) {
      console.error('Failed to parse user data from localStorage:', e);
      setError('Invalid user data in localStorage.');
      setLoading(false);
      return;
    }

    const isAdmin = userObject.is_admin;
    if (isAdmin || !userObject.phone_number || !userObject.guardian_number || userObject.active_status === false) {
      setError('Unauthorized Access.');
      setLoading(false);
      return;
    }

    const { Class, board } = userObject;

    axios
      .get(apiUrl)
      .then((response) => {
        const filteredNotes = response.data.notes.filter(
          (note) => note.Class === Class && note.board === board
        );
        setNotes(filteredNotes);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
        setError('Failed to load notes.');
        setLoading(false);
      });
  }, []);

  const downloadFile = async (fileUrl, fileName) => {
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

  return (
    <div className="flex flex-col min-h-screen text-white">
      <UserNavbar />
      <div className="pt-[100px] flex-grow p-6">
        <h1 className="text-3xl font-semibold text-center mb-8 text-black">
          My Notes
        </h1>
        <p className="text-center text-red-400 mb-6 text-sm">
          The files will always be downloaded with a <span className="font-bold">.pdf</span>{' '}
          extension. For example, if the note name is <span className="font-bold">"notes_1"</span>,
          it will be saved as <span className="font-bold">"notes_1.pdf"</span>.
        </p>
        {error && (
          <p className="text-center text-red-500 mb-4 text-lg">{error}</p>
        )}
        {loading ? (
          <p className="text-center text-lg">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-300">
            No notes available for your class and board.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-[#1E2A47] rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={note.image}
                  alt={note.notes_name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-[#FFD700]">
                    {note.notes_name}
                  </h2>
                  <p className="text-gray-300 text-sm mb-4">
                    <span className="font-medium">Class:</span> {note.Class} |{' '}
                    <span className="font-medium">Board:</span> {note.board}
                  </p>
                  <button
                    onClick={() => downloadFile(note.pdf_file, note.notes_name)}
                    className="block w-full text-center bg-[#FFD700] text-[#09152E] font-medium py-2 rounded hover:bg-[#FFC107] transition"
                  >
                    Download Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserNotes;
