import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/HomePage/Navbar';
import UserNavbar from '../../Components/UserPage/UserNavbar/UserNavbar';
import Footer from '../../Components/HomePage/Footer';
import fee_structure_pdf from './Revised_Fees_Structure_2024.pdf';

const FeeStructure = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUrl = 'https://english-tuition-app-backend.vercel.app/getAllFee/';

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setIsAuthenticated(!!userString); // Check if user is authenticated

    axios
      .get(apiUrl)
      .then((response) => {
        setFees(response.data.fees);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching fee data:', error);
        setError('Failed to load fee structure.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white flex flex-col min-h-screen text-black">
      {/* Dynamic Navbar */}
      {isAuthenticated ? <UserNavbar /> : <Navbar />}

      {/* Main content area */}
      <div className="pt-[100px] flex-grow container mx-auto px-4 mb-3">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#09152E]">
          Fee Structure (Effective from January 2024)
        </h1>

        {/* Download Button */}
        <div className="flex justify-center mb-4">
          <a
            href={fee_structure_pdf}
            download
            className="bg-[#09152E] text-white px-6 py-2 rounded-lg shadow hover:bg-[#142c61] transition"
          >
            Download Revised Fee Structure PDF
          </a>
        </div>

        {/* Fees Table */}
        {loading ? (
          <p className="text-center text-lg">Loading fee structure...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : fees.length === 0 ? (
          <p className="text-center text-gray-500">No fee structure available.</p>
        ) : (
          <div className="overflow-x-auto max-w-3xl mx-auto">
            <table className="w-full bg-[#09152E] text-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-[#142c61]">
                  <th className="py-3 px-4 w-2/3 text-left">Class</th>
                  <th className="py-3 px-4 w-1/3 text-right">Fee</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((item) => (
                  <tr key={item._id} className="border-b border-gray-700 hover:bg-[#1c3a75] transition">
                    <td className="py-3 px-4">{item.Class}</td>
                    <td className="py-3 px-4 text-right">{`₹${item.fee}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Additional Information */}
        <div className="mt-6 bg-[#09152E] p-4 rounded-lg shadow-md max-w-3xl mx-auto text-white">
          <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
          <p className="mb-2">
            Admission Fees: <strong>₹300 + One Month Fee</strong>
          </p>
          <p>Payment to be made in advance within 10th of the running month.</p>
        </div>

        {/* Contact Information */}
        <div className="mt-6 bg-[#09152E] p-4 rounded-lg shadow-md max-w-3xl mx-auto text-white">
          <h2 className="text-xl font-semibold mb-2">For Any Query / Assistance / Help Contact</h2>
          <ul>
            <li>
              Pradyot Sir:{' '}
              <a href="tel:8240276722" className="text-[#FFD700] hover:underline">
                82402-76722
              </a>
            </li>
            <li>
              Ritwika Ma'am:{' '}
              <a href="tel:8017916452" className="text-[#FFD700] hover:underline">
                80179-16452
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FeeStructure;
