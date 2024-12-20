import React from 'react';
import Navbar from '../../Components/HomePage/Navbar';
import Footer from '../../Components/HomePage/Footer';

const CISCE = () => {
  // Dummy links for each class (you can replace these with your actual Google Drive links)
  const driveLinks = {
    classVI: "https://drive.google.com/drive/folders/1z1c8H2kIJZOhrP8Sd5scZK39YwKkBdvH?usp=drive_link",
    classVII: "https://drive.google.com/drive/folders/10wDkXjYU44SnWK_CccKYpvrVZZCyPpvE?usp=drive_link",
    classVIII: "https://drive.google.com/drive/folders/1aQsFhHPD60-gnWeEiEen9HWjSM7EjRFT?usp=drive_link",
    classIX: "https://drive.google.com/drive/folders/12Qyc5cdSU79qxBpfB5vTYXlx-tSgY2pQ?usp=drive_link",
    classX: "https://drive.google.com/drive/folders/1uaIKWgKJU53ImDsbI3fZsRihnB_c6WMN?usp=drive_link",
    classXI: "https://drive.google.com/drive/folders/1aZsLXW5RXaUbROLBudgBmHfcgWy3cy9K?usp=drive_link",
    classXII: "https://drive.google.com/drive/folders/1v9qy_s_E3cQl8z9JUswjgIlb0TZ1_Uxt?usp=drive_link",
  };

  // Function to handle button click
  const handleDownload = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content area */}
      <div className="pt-[92px] flex-grow p-6">
        <h1 className="text-3xl font-semibold text-center mb-8">CISCE Resources Download</h1>
        
        <div className="max-w-md mx-auto space-y-4">
          {/* Class VI Button */}
          <button
            onClick={() => handleDownload(driveLinks.classVI)}
            className="w-full px-4 py-2 bg-[#09152E] text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class VI - Download
          </button>

          {/* Class VII Button */}
          <button
            onClick={() => handleDownload(driveLinks.classVII)}
            className="w-full px-4 py-2 bg-[#09152E] text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class VII - Download
          </button>

          {/* Class VIII Button */}
          <button
            onClick={() => handleDownload(driveLinks.classVIII)}
            className="w-full px-4 py-2 bg-[#09152E] text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class VIII - Download
          </button>

          {/* Class IX Button */}
          <button
            onClick={() => handleDownload(driveLinks.classIX)}
            className="w-full px-4 py-2 bg-[#09152E] text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class IX - Download
          </button>

          {/* Class X Button */}
          <button
            onClick={() => handleDownload(driveLinks.classX)}
            className="w-full px-4 py-2 bg-[#09152E] text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class X - Download
          </button>

          {/* Class XI Button */}
          <button
            onClick={() => handleDownload(driveLinks.classXI)}
            className="w-full px-4 py-2 bg-[#09152E] text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class XI - Download
          </button>

          {/* Class XII Button */}
          <button
            onClick={() => handleDownload(driveLinks.classXII)}
            className="w-full px-4 py-2 bg-[#09152E] text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class XII - Download
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CISCE;
