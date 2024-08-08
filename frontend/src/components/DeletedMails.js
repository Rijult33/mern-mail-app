import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailList from './EmailList';
import { fetchDeletedEmails, recoverEmails, permanentlyDelete } from '../redux/actions';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';

const DeletedMails = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.app.deletedEmails || []);
  const { selectedEmails, setSelectedEmails, handleCheckboxChange, handleSelectAllChange, user, view, setView, searchQuery } = useOutletContext();

  useEffect(() => {
    setView('deleted');
    dispatch(fetchDeletedEmails());
  }, [dispatch, setView]);

  const handleDeleteSelected = () => {
    if (selectedEmails.length === 0) {
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to permanently delete the selected emails?');
    if (confirmDelete) {
      dispatch(permanentlyDelete(selectedEmails));
      setSelectedEmails([]);
    }
  };

  const handleRecover = () => {
    dispatch(recoverEmails(selectedEmails));
    setSelectedEmails([]);
  };

  const handleRefresh = () => {
    dispatch(fetchDeletedEmails());
    toast.success("Refreshed");
  };

  const filteredMails = emails.filter(mail =>
    mail.subject?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    mail.message?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    mail.senderEmail?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white w-full fixed z-10">
        <h1 className="text-2xl font-bold mb-3 mt-6 ml-10">Deleted Mails</h1>
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
        handleRecover={handleRecover}
        handleRefresh={handleRefresh}
      />
    </div>
  );
};

export default DeletedMails;
