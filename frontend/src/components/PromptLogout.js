import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/appSlice';

const PromptLogout = ({ targetElement }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/signup');
  };

  if (!user) {
    return targetElement;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-md">
      <div className="bg-white rounded-lg p-8 shadow-lg text-center">
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
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptLogout;