import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailList from './EmailList';
import { fetchAllEmails, moveToBin } from '../redux/actions';
import { useOutletContext } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const AllMails = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.app.allEmails || []);
  const { selectedEmails, setSelectedEmails, handleCheckboxChange, handleSelectAllChange, user, view, setView } = useOutletContext();

  setView("all");

  useEffect(() => {
    dispatch(fetchAllEmails());
  }, [dispatch]);

  const handleDeleteSelected = () => {
    dispatch(moveToBin(selectedEmails));
    setSelectedEmails([]);
  };

  const handleRefresh = () => {
    dispatch(fetchAllEmails());
    toast.success("Refreshed")
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white w-full fixed z-10 overflow-x-hidden ">
        <h1 className="text-2xl font-bold p-6 px-10">All Mails</h1>
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

export default AllMails;
