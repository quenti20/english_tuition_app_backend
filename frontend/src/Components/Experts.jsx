import React from 'react';
import tabImage from "../Images/laptop.jpeg";

const Experts = () => {
  return (
    <div className="p-2 max-w-6xl mx-auto my-10 h-auto md:grid grid-cols-2 gap-6">
      {/* Image Section */}
      <div className="col-span-1 flex justify-center items-center">
        <img className="inline h-[235px] mx-auto rounded-lg shadow-lg" src={tabImage} alt="Laptop" />
      </div>

      {/* About Us Text Section */}
      <div className="col-span-1 flex flex-col justify-center">
        <h1 className="text-[#09152E] font-bold my-2 text-justify md:text-3xl">About Us</h1>

        {/* Updated About Us Text with Rounded Top Corners */}
        <p className="text-white md:text-lg p-4 leading-relaxed bg-[#09152E] pl-4 rounded-t-lg">
          At <span className="font-semibold">The Linguist</span>, we celebrate learning an assortment of Indian and foreign languages. This two-decade-old institution has been a pioneer in teaching the English language across all age groups. We also provide professional guidance on Pure Science subjects up to class XII. We are pledged to:
        </p>

        {/* Key Points with Rounded Bottom Corners and Custom Styles */}
        <ul className="bg-[#09152E] px-6 py-4 rounded-b-lg space-y-3">
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">Aid holistic development among our students.</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">Provide education through the best-in-class infrastructure (including A.C. smart classrooms).</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">Simplify English learning through our own all-in-one grammar book.</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">Support our students through Daily Practice Problems (DPP) and adequate follow-up tests.</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="text-white">Provide support classes for the underachievers.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Experts;
