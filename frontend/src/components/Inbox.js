import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailList from './EmailList';
import { fetchReceivedEmails, moveToBin } from '../redux/actions';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.app.receivedEmails || []);
  const { selectedEmails, setSelectedEmails, handleCheckboxChange, handleSelectAllChange, user, view, setView, filteredMails } = useOutletContext();

  useEffect(() => {
    setView('inbox');
    dispatch(fetchReceivedEmails());
  }, [dispatch, setView]);

  const handleDeleteSelected = () => {
    dispatch(moveToBin(selectedEmails));
    setSelectedEmails([]);
  };

  const handleRefresh = () => {
    dispatch(fetchReceivedEmails());
    toast.success("Refreshed");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white w-full fixed z-10">
        <h1 className="text-2xl font-bold mb-3 mt-6 ml-10">Inbox</h1>
      </div>
      <EmailList
        mails={filteredMails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAllChange={handleSelectAllChange}
        user={user}
        view={view}
        handleDeleteSelected={handleDeleteSelected}
        handleRefresh={handleRefresh}
      />
    </div>
  );
};

export default Inbox;
