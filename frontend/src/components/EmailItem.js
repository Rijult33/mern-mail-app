import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const EmailItem = ({ mail, handleCheckboxChange, isSelected, user, view }) => {
  const navigate = useNavigate();
  const senderName = mail.senderEmail === user.email ? `${mail.senderEmail} (me)` : mail.senderEmail;
  const recipientName = mail.to === user.email ? `${mail.to} (me)` : mail.to;

  return (
    <div
      className="flex items-center justify-between border-b border-gray-200 px-9 py-3 text-sm cursor-pointer transition-transform duration-200 ease-in-out transform hover:shadow-lg bg-white hover:bg-gray-100"
      onClick={(e) => {
        if (e.target.type !== 'checkbox' && !e.target.classList.contains('checkbox-wrapper')) {
          navigate(`/mail/${mail._id}`, { state: { view } });
        }
      }}
    >
      <div
        className="relative mr-4 flex items-center justify-center"
        onClick={(e) => {
          if (e.target.type !== 'checkbox') {
            e.stopPropagation();
            handleCheckboxChange(mail._id);
          }
        }}
      >
        <div className="relative mr-4 pl-3 flex items-center justify-center">
          <div className="checkbox-wrapper absolute w-10 h-10 flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-gray-200 hover:rounded-full">
            <input
              type="checkbox"
              className="form-checkbox relative z-10 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(mail._id);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center pl-6 space-x-4">
        <span className="text-sm font-medium text-gray-700 truncate w-1/4">
          {view === 'sent' ? `To: ${recipientName}` : senderName}
        </span>
        <span className="flex-1 text-sm text-gray-500 truncate">
          <span className="font-bold text-gray-900">{mail.subject}</span> - {mail.message.substring(0, 50)}...
        </span>
        <span className="text-sm text-gray-400 whitespace-nowrap w-1/4">{moment(mail.createdAt).format('MMM DD, YYYY')}</span>
      </div>
    </div>
  );
};

export default EmailItem;
