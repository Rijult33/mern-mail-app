import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MdClose, MdZoomOutMap } from 'react-icons/md';

const ComposeEmail = ({ setComposeVisible, composeVisible, view, dispatch, fetchSentEmails, fetchAllEmails }) => {
  const [composeData, setComposeData] = useState({ to: '', subject: '', message: '' });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (composeVisible) {
      const savedComposeData = JSON.parse(localStorage.getItem('composeData')) || { to: '', subject: '', message: '' };
      setComposeData(savedComposeData);
    }
  }, [composeVisible]);

  useEffect(() => {
    localStorage.setItem('composeData', JSON.stringify(composeData));
  }, [composeData]);

  const handleComposeSend = async () => {
    try {
      const response = await axios.post('https://mailapp-qd44.onrender.com/api/v1/email/create', composeData, { withCredentials: true });
      if (response.data.success) {
        toast.success("Email sent successfully.");
        setComposeVisible(false);
        setComposeData({ to: '', subject: '', message: '' });
        localStorage.removeItem('composeData');
        if (view === 'sent') {
          dispatch(fetchSentEmails());
        } else if (view === 'all') {
          dispatch(fetchAllEmails());
        }
      } else {
        if (response.data.message === "Recipient not found") {
          toast.error("The recipient is not registered.");
        } else if (response.data.message === "All fields are required") {
          toast.error("Please fill in all fields.");
        } else {
          toast.error(response.data.message || "An unexpected error occurred.");
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed ${isExpanded ? 'top-0 left-0 right-0 bottom-0' : 'bottom-4 right-4'} bg-white p-6 rounded-md shadow-lg z-50 transition-all duration-300 ${composeVisible ? 'block' : 'hidden'}`}>
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500 hover:text-gray-700 transition duration-200" onClick={handleExpandToggle}>
          <MdZoomOutMap size="24px" />
        </button>
        <h2 className="text-2xl font-bold text-blue-500">Compose Email</h2>
        <button className="text-gray-500 hover:text-gray-700 transition duration-200" onClick={() => setComposeVisible(false)}>
          <MdClose size="24px" />
        </button>
      </div>
      <input
        type="text"
        placeholder="To"
        className="w-full p-2 mb-4 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        value={composeData.to}
        onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
      />
      <input
        type="text"
        placeholder="Subject"
        className="w-full p-2 mb-4 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        value={composeData.subject}
        onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
      />
      <textarea
        placeholder="Message"
        className="w-full p-2 h-60 mb-4 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none resize-none"
        value={composeData.message}
        onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
      />
      <div className="flex justify-end">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
          onClick={handleComposeSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ComposeEmail;
