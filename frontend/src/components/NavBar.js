import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from './Dropdown';

const NavBar = ({ searchQuery, setSearchQuery, toggleLogoutPrompt }) => {
  const user = useSelector(state => state.app.user);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      avatarRef.current &&
      !avatarRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-100 py-2 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-20">
      <div className="text-5xl font-bold text-blue-500">Mail</div>
      <input
        type="text"
        placeholder="Search mail"
        className="p-3 border rounded-full w-1/2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {user && (
        <div className="flex items-center space-x-4 relative">
          <img
            ref={avatarRef}
            src={user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <div ref={dropdownRef} className="absolute right-0 mt-12">
              <Dropdown toggleLogoutPrompt={toggleLogoutPrompt} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
