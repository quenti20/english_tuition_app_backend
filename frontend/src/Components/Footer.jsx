import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebook } from 'react-icons/fa'; // Import Facebook icon
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Footer = () => {

  const navigate = useNavigate();

  const handlePrivacyPolicyClick = () =>{
    navigate('/privacy_policy')
  };

  return (

    <div className="w-full h-auto md:h-[350px] bg-[#09152E] border-t border-gray-600 p-6 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Location Column */}
        <div className="space-y-4 flex flex-col justify-start items-start">
          <h3 className="text-xl font-bold">Location</h3>
          <p>
            D/33 Baghajatin, <br />
            Opposite Baghajatin Ram Thakur Ashram <br />
            Kolkata 700033
          </p>
          <a 
            href="https://maps.app.goo.gl/wgtiZiXQsLGmVmSn6"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-500">
            <FaMapMarkerAlt /> View on Google Maps
          </a>
          {/* Embedded Google Map */}
          <div className="w-full h-[200px] md:h-[150px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d311.6325984607035!2d88.37822662361853!3d22.484074047826155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027113c8fd8301%3A0x2fac9d71c503f597!2sEnglish%20Coaching%20Center!5e0!3m2!1sen!2sin!4v1731066774334!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>

        {/* Contact Us Column */}
        <div className="space-y-4 flex flex-col justify-start items-start">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" /> 
              <span>Email: thelinguist.kolkata@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-400" /> 
              <span>Contact Number 1: 8240276722</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-400" /> 
              <span>Contact Number 2: 8017916452</span>
            </li>
            <li className="flex items-center gap-2">
              <FaFacebook className="text-blue-400" /> 
              <a 
                href="https://www.facebook.com/groups/englishcoachingpkd/?ref=share&mibextid=KtfwRi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500">
                Visit our Facebook Page
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="space-y-4 flex flex-col justify-start items-start">
          <h3 className="text-xl font-bold">Legal</h3>
          <ul className="space-y-2">
            <li><Link 
                to="/privacy_policy" 
                className="hover:text-blue-400">
                Privacy Policy
              </Link> </li>
            <li><a href="#" className="hover:text-blue-400">Legal Regulations</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
