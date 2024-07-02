import React from 'react';
import { useSelector } from 'react-redux';

const Dropdown = ({ toggleLogoutPrompt }) => {
  const user = useSelector(state => state.app.user);

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-4 z-40">
      <div className="flex flex-col items-center p-4">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full mb-4 shadow-md"
        />
        <span className="text-gray-900 font-bold mb-1">{user.fullName}</span>
        <span className="text-gray-500 mb-4">{user.email}</span>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
          onClick={toggleLogoutPrompt}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
