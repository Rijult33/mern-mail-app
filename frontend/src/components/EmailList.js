import React, { useRef, useEffect, useState } from 'react';
import EmailItem from './EmailItem';
import { IoIosRefresh } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const EmailList = ({
  mails,
  handleCheckboxChange,
  selectedEmails,
  handleSelectAllChange,
  handleDeleteSelected,
  handleRecover,
  user,
  view,
  handleRefresh,
}) => {
  const [shouldScroll, setShouldScroll] = useState(false);
  const listContainerRef = useRef(null);

  // Sort emails by date (latest first)
  const sortedMails = [...mails].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Determine if all emails are selected
  const allSelected = selectedEmails.length > 0 && selectedEmails.length === mails.length;

  useEffect(() => {
    if (listContainerRef.current) {
      setShouldScroll(listContainerRef.current.scrollHeight > listContainerRef.current.clientHeight);
    }
  }, [sortedMails]);

  return (
    <div className={`flex-1 ${shouldScroll ? 'overflow-y-auto' : 'overflow-y-hidden'} mt-[68px]`}>
      <div className="flex justify-between items-center fixed w-full bg-white z-10 px-9 border-b border-t">
        <div className="flex items-center space-x-4">
          <div
            className="relative mr flex items-center justify-center"
            onClick={(e) => {
              if (e.target.type !== 'checkbox') {
                e.stopPropagation();
                handleSelectAllChange(!allSelected);
              }
            }}
          >
            <div className="relative mr-4 pl-3 flex items-center justify-center">
              <div className="checkbox-wrapper absolute w-10 h-10 flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-gray-200 hover:rounded-full cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox relative z-10 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  checked={allSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelectAllChange(e.target.checked);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 cursor-pointer"
            onClick={handleRefresh}
          >
            <IoIosRefresh size="20px" />
          </div>
        
          <div
            className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out ${selectedEmails.length === 0 ? 'hover:bg-gray-200' : 'hover:bg-red-200'} cursor-pointer`}
            onClick={handleDeleteSelected}
          >
            <MdDeleteOutline size="20px" />
          </div>
          {view === 'deleted' && (
            <div><button
              className="bg-gray-400 hover:bg-green-600 hover:shadow-lg text-white text-sm px-3 py-1 rounded mr-2"
              onClick={handleRecover}
            >
              Recover
            </button></div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 mt-[45px]" ref={listContainerRef}>
        {sortedMails.map(mail => (
          <EmailItem
            key={mail._id}
            mail={mail}
            handleCheckboxChange={handleCheckboxChange}
            isSelected={selectedEmails.includes(mail._id)}
            user={user}
            view={view}
          />
        ))}
      </div>
    </div>
  );
};

export default EmailList;
