import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logoutUser } from '../redux/appSlice';

const NavBarLogoutPrompt = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('You have been logged out successfully.');
    onClose();
    navigate('/login');
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 shadow-2xl text-center w-1/3">
        <p className="text-lg mb-4">Do you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            Log out
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarLogoutPrompt;
