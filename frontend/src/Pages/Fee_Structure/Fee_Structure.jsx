import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import fee_structure_pdf from './Revised_Fees_Structure_2024.pdf'

const FeeStructure = () => {
  const feeData = [
    { class: "V & VI (Bengali Medium)", fee: "₹500" },
    { class: "V & VI (English Medium / ICSE / CBSE)", fee: "₹650" },
    { class: "VII (Bengali Medium)", fee: "₹600" },
    { class: "VII & VIII (English Medium / ICSE / CBSE)", fee: "₹750" },
    { class: "VIII (Bengali Medium)", fee: "₹650" },
    { class: "IX & X (WB Board)", fee: "₹700" },
    { class: "IX & X (CBSE)", fee: "₹900" },
    { class: "IX & X (ICSE)", fee: "₹1000" },
    { class: "XI & XII (WB Board)", fee: "₹750" },
    { class: "XI & XII (CBSE)", fee: "₹1000" },
    { class: "Spoken English (For Coaching Students)", fee: "₹100" },
    { class: "Spoken English (For Outsiders)", fee: "₹450" },
    { class: "BA (English Hons & Pass)", fee: "₹1200" }
  ];

  const admissionFee = "₹300 + One Month Fee";
  const paymentInfo = "Payment to be made in advance within 10th of the running month.";

  return (
    <div className=" bg-slate-300 flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Main content area */}
      <div className="pt-[82px] flex-grow container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-6">Fee Structure (Effective from January 2024)</h1>
        
        {/* Download Button */}
        <div className="flex justify-center mb-4">
          <a 
            href= {fee_structure_pdf} 
            download 
            className="bg-[#09152E] text-white px-6 py-2 rounded-lg shadow hover:bg-[#142c61] transition"
          >
            Download Revised Fee Structure PDF
          </a>
        </div>

        {/* Fees Table */}
        <div className="overflow-x-auto max-w-3xl mx-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#09152E] text-white">
                <th className="py-3 px-4 w-2/3 text-left">Class</th>
                <th className="py-3 px-4 w-1/3 text-right">Fee</th>
              </tr>
            </thead>
            <tbody>
              {feeData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{item.class}</td>
                  <td className="py-3 px-4 text-right">{item.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
          <p className="text-gray-700 mb-2">Admission Fees: <strong>{admissionFee}</strong></p>
          <p className="text-gray-700">{paymentInfo}</p>
        </div>

        {/* Contact Information */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">For Any Query / Assistance / Help Contact</h2>
          <ul className="text-gray-700">
            <li>Pradyot Sir: <a href="tel:8240276722" className="text-blue-500">82402-76722</a></li>
            <li>Ritwika Ma'am: <a href="tel:8017916452" className="text-blue-500">80179-16452</a></li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FeeStructure;
