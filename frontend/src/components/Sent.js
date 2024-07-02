import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailList from './EmailList';
import { fetchSentEmails, moveToBin } from '../redux/actions';
import { useOutletContext } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Sent = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.app.sentEmails || []);
  const { selectedEmails, setSelectedEmails, handleCheckboxChange, handleSelectAllChange, user, view, setView } = useOutletContext();

  useEffect(() => {
    setView('sent');
    dispatch(fetchSentEmails());
  }, [dispatch, setView]);

  const handleDeleteSelected = () => {
    dispatch(moveToBin(selectedEmails));
    setSelectedEmails([]);
  };

  const handleRefresh = () => {
    dispatch(fetchSentEmails());
    toast.success("Refreshed")
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white w-full fixed z-10">
        <h1 className="text-2xl font-bold mb-3 mt-6 ml-10">Sent Mails</h1>
      </div>
      <EmailList
        mails={emails}
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

export default Sent;
