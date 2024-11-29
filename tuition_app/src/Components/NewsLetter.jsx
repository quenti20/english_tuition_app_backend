import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Admin email (Replace with your admin email)
  const adminEmail = "thelinguist.kolkata@gmail.com";

  // Function to send email
  const sendEmail = (e) => {
    e.preventDefault();

    // Validate email input
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    // Define the parameters to send
    const templateParams = {
      user_email: email,
      admin_email: adminEmail,
      message: "User is interested in learning English.",
    };

    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY' with your EmailJS credentials
    emailjs
      .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then(
        (response) => {
          console.log('Email sent successfully:', response.status, response.text);
          setMessage('Message Sent Successfully');
          alert('Message Sent Successfully');
          setEmail(''); // Clear the email input
        },
        (error) => {
          console.error('Error in sending email:', error);
          setMessage('Error in sending message');
          alert('Error in sending message');
        }
      );
  };

  return (
    <div className="w-full bg-slate-500 py-4">
      <div className="max-w-6xl mx-auto md:flex h-[300px] justify-between py-[40px]">
        <div className="m-2">
          <h1 className="text-[20px] md:text-[40px] font-bold text-white">
            Want to Learn English the Right Way?
          </h1>
          <span className="text-white">
            Please show interest by sending us a mail
          </span>
        </div>
        <div className="m-2">
          <form onSubmit={sendEmail}>
            <input
              className="w-full rounded p-3 md:m-2 text-slate-400"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-black text-white mt-2 md:m-2 p-3 rounded"
            >
              Submit
            </button>
          </form>
          <p className="text-white mt-2">
            We care about the protection of your data.
            <br />
            <a href="#" className="text-red-700">
              Read our privacy policy
            </a>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
