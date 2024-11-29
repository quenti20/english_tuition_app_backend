import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const WBSE = () => {
  // Dummy links for each class (you can replace these with your actual Google Drive links)
  const driveLinks = {
    classVI: "https://drive.google.com/drive/folders/18DmB2G6J05ybAt5LgDQWEYrltpqG-bIG?usp=drive_link",
    classVII: "https://drive.google.com/drive/folders/1pE_t714oR-jDduejA-bpoe31D7ep35El?usp=drive_link",
    classVIII: "https://drive.google.com/drive/folders/1bu_aKIRIeHut5zZdMmxj3sE0qf-JH8Tm?usp=drive_link",
    classIX: "https://drive.google.com/drive/folders/1zE8sNpB7wPAvSu4Wxu1eaPhk4CBt_jhR?usp=drive_link",
    classX: "https://drive.google.com/drive/folders/1jZE4lPSvFSA_MRI13_a7cujGqFLY1O2h?usp=drive_link",
    classXI: "https://drive.google.com/drive/folders/1cRVzH5FkBRsDoY2rkic2pfCHpOkbV1uF?usp=drive_link",
    classXII: "https://drive.google.com/drive/folders/1pqzgrb8FB6IFwUx59kos2dPW1lC3Iupl?usp=drive_link",
  };

  // Function to handle button click
  const handleDownload = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content area */}
      <div className="pt-[82px] flex-grow p-6">
        <h1 className="text-3xl font-semibold text-center mb-8">WBSE Resources Download</h1>
        
        <div className="max-w-md mx-auto space-y-4">
          {/* Class VI Button */}
          <button
            onClick={() => handleDownload(driveLinks.classVI)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class VI - Download
          </button>

          {/* Class VII Button */}
          <button
            onClick={() => handleDownload(driveLinks.classVII)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class VII - Download
          </button>

          {/* Class VIII Button */}
          <button
            onClick={() => handleDownload(driveLinks.classVIII)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class VIII - Download
          </button>

          {/* Class IX Button */}
          <button
            onClick={() => handleDownload(driveLinks.classIX)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class IX - Download
          </button>

          {/* Class X Button */}
          <button
            onClick={() => handleDownload(driveLinks.classX)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class X - Download
          </button>

          {/* Class XI Button */}
          <button
            onClick={() => handleDownload(driveLinks.classXI)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class XI - Download
          </button>

          {/* Class XII Button */}
          <button
            onClick={() => handleDownload(driveLinks.classXII)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Class XII - Download
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WBSE;
