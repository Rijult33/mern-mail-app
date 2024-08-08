import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { fetchReceivedEmails, fetchSentEmails, fetchDeletedEmails, fetchAllEmails } from '../redux/actions';
import { logoutUser } from '../redux/appSlice';
import ComposeEmail from './ComposeEmail';
import NavBarLogoutPrompt from './NavBarLogoutPrompt';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const receivedEmails = useSelector((state) => state.app.receivedEmails || []);
  const sentEmails = useSelector((state) => state.app.sentEmails || []);
  const deletedEmails = useSelector((state) => state.app.deletedEmails || []);
  const allEmails = useSelector((state) => state.app.allEmails || []);
  const [view, setView] = useState('inbox');
  const [selectedMail, setSelectedMail] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [composeVisible, setComposeVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoutPromptVisible, setLogoutPromptVisible] = useState(false);

  useEffect(() => {
    if (view === 'inbox') {
      dispatch(fetchReceivedEmails());
    } else if (view === 'sent') {
      dispatch(fetchSentEmails());
    } else if (view === 'deleted') {
      dispatch(fetchDeletedEmails());
    } else if (view === 'all') {
      dispatch(fetchAllEmails());
    }
  }, [view, dispatch]);

  const toggleComposeVisible = () => {
    setComposeVisible(!composeVisible);
  };

  const toggleLogoutPrompt = () => {
    setLogoutPromptVisible(!logoutPromptVisible);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleSelectAllChange = (isChecked) => {
    if (isChecked) {
      setSelectedEmails(filteredMails.map(mail => mail._id));
    } else {
      setSelectedEmails([]);
    }
  };

  const handleCheckboxChange = (emailId) => {
    setSelectedEmails(prevSelectedEmails =>
      prevSelectedEmails.includes(emailId)
        ? prevSelectedEmails.filter(id => id !== emailId)
        : [...prevSelectedEmails, emailId]
    );
  };

  // Updated filtering logic to handle different views
  const filteredMails = (view === 'inbox' ? receivedEmails : view === 'sent' ? sentEmails : view === 'deleted' ? deletedEmails : allEmails).filter(mail =>
    mail.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mail.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mail.senderEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mail.receiverEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 pt-16 relative flex">
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} toggleLogoutPrompt={toggleLogoutPrompt} />
      <Sidebar
        view={view}
        setView={setView}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        toggleComposeVisible={toggleComposeVisible}
      />
      <div className="flex-1 flex flex-col bg-white overflow-hidden ml-64 rounded-lg overflow-x-hidden w-full shadow-lg">
        <div className="flex-1 overflow-y-auto">
          <Outlet
            context={{
              view,
              setView,
              selectedMail,
              setSelectedMail,
              selectedEmails,
              setSelectedEmails,
              handleCheckboxChange,
              handleSelectAllChange,
              user,
              filteredMails,
              searchQuery,
              dispatch,
            }}
          />
        </div>
      </div>
      <ComposeEmail
        composeVisible={composeVisible}
        setComposeVisible={setComposeVisible}
        view={view}
        dispatch={dispatch}
        fetchSentEmails={fetchSentEmails}
        fetchAllEmails={fetchAllEmails}
      />
      {logoutPromptVisible && <NavBarLogoutPrompt show={logoutPromptVisible} onClose={toggleLogoutPrompt} />}
    </div>
  );
};

export default Body;
