import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { moveToBin, permanentlyDelete } from '../redux/actions';

import { LiaTelegram } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { MdInbox } from "react-icons/md";
import { LuMails } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuMailSearch } from "react-icons/lu";
import { TbMailSearch } from "react-icons/tb";
import { FaPencil } from "react-icons/fa6";

const Sidebar = ({ view, setView, selectedEmails, setSelectedEmails, toggleComposeVisible }) => {
  const navigate = useNavigate();

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === 'inbox') navigate('/inbox');
    else if (newView === 'sent') navigate('/sent');
    else if (newView === 'deleted') navigate('/deleted-mails');
    else if (newView === 'all') navigate('/all-mails');
  };

  return (
    <div className="fixed top-13 left-0 w-64 h-full bg-gray-100 p-4 py-1 overflow-y-auto z-20">
      <button
        className="w-full py-6 mb-6 bg-slate-500 text-white gap-7 rounded-lg text-2xl shadow-md hover:bg-slate-700 hover:shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center gap-2"
        onClick={toggleComposeVisible}
      >
        <FaPencil size='20px' />
        Compose
      </button>
      <button className={`w-full py-2 mb-2 rounded-md text-left pl-2 ${view === 'inbox' ? 'bg-blue-500 text-white ' : 'bg-white text-gray-800 hover:bg-gray-300'}`} onClick={() => handleViewChange('inbox')}>
        <div className='flex items-center px-2 gap-3'>
          <MdInbox size='25px' />
          <h1>Inbox</h1>
        </div>
      </button>
      <button className={`w-full py-2 mb-2 rounded-md text-left pl-2 ${view === 'sent' ? 'bg-blue-500 text-white ' : 'bg-white text-gray-800 hover:bg-gray-300'}`} onClick={() => handleViewChange('sent')}>
        <div className='flex items-center px-2 gap-3'>
          <LiaTelegram size='25px' />
          <h1>Sent</h1>
        </div>
      </button>
      <button className={`w-full py-2 mb-2 rounded-md text-left pl-2 ${view === 'deleted' ? 'bg-blue-500 text-white ' : 'bg-white text-gray-800 hover:bg-gray-300'}`} onClick={() => handleViewChange('deleted')}>
        <div className='flex items-center px-2 gap-3'>
          <MdOutlineDeleteOutline size='25px' />
          <h1>Deleted Mails</h1>
        </div>
      </button>
      <button className={`w-full py-2 mb-2 rounded-md text-left pl-2 ${view === 'all' ? 'bg-blue-500 text-white ' : 'bg-white text-gray-800 hover:bg-gray-300'}`} onClick={() => handleViewChange('all')}>
        <div className='flex items-center px-2 gap-3'>
          <TbMailSearch size='25px' />
          <h1>All Mails</h1>
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
