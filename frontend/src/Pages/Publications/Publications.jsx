import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

// Importing images
import GrammarBookCover from './publication_book.png';
import BuddingBardsCover from './budding_bards_pub.png';

// PDF download links
import GrammarBookPDF from './magazine_publication.pdf';
import BuddingBardsPDF from './magazine_publication.pdf';

const Publications = () => {
  const publications = [
    {
      title: "Pradyot Sir's English Grammar: A Modern Approach",
      description: `For Class V-XII: ICSE, CBSE, WB Board\n
      Edited by: Mehuli Das, M.A (D.U), Research Fellow, University of Liverpool, U.K.\n
      Published by: The English Coaching, Kolkata`,
      image: GrammarBookCover,
      pdfLink: GrammarBookPDF,
      smallImage: false,
    },
    {
      title: "The Budding Bards 2023 - Volume 2",
      description: `A Literary Magazine by The English Coaching`,
      image: BuddingBardsCover,
      pdfLink: BuddingBardsPDF,
      smallImage: true, // Mark this image to be smaller
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content area */}
      <div className="pt-[82px] flex-grow bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Publications</h2>
        
        <div className="flex flex-col gap-8">
          {publications.map((publication, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row bg-[#09152E] rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image Section */}
              <div className="w-full md:w-1/3 flex items-center justify-center">
                <img
                  src={publication.image}
                  alt={publication.title}
                  className={`object-cover ${publication.smallImage ? 'h-48' : 'h-full'} w-full md:w-auto rounded-lg`}
                />
              </div>

              {/* Information Section */}
              <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
                {/* Title */}
                <h3 className="text-2xl font-semibold text-white mb-4">{publication.title}</h3>
                
                {/* Description */}
                <p className="text-md text-white whitespace-pre-line mb-6">{publication.description}</p>
                
                {/* Download Link */}
                <a
                  href={publication.pdfLink}
                  download
                  className="inline-block w-max bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 font-medium"
                >
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Publications;
