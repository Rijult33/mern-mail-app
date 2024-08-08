import React, { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/appSlice';

const Signup = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      console.log('Submitting form data:', formData);

      try {
        const res = await axios.post("http://localhost:8090/api/v1/user/register", formData, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        
        console.log('Server response:', res);

        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setPasswordsMatch(true);

        if (res.data && res.data.success) {
          navigate('/login');
          toast.success(res.data.message);
        } else {
          toast.error('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred. Please try again.');
        }
      }
    } else {
      setPasswordsMatch(false);
      toast.error('Passwords do not match.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 w-full max-w-md border rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-center ">
          <div className=" p-2 rounded-lg"><img
          className="w-10 fit"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg"
          alt="logo"
        /></div>
          <h1 className="text-5xl text-blue-500 font-medium">Mail</h1>
        </div>
        <hr className="border-t border-gray-200 w-full mb-4" />
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Sign up</h1>
          <p className="text-gray-500">Join us to access exclusive features!</p>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:border-blue-300 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:border-blue-300 focus:outline-none"
            required
          />
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:border-blue-300 focus:outline-none"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <IoEyeOffOutline className="w-6 h-6 text-gray-500" />
              ) : (
                <IoEyeOutline className="w-6 h-6 text-gray-500" />
              )}
            </button>
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`w-full border border-gray-300 px-4 py-3 rounded-md focus:border-blue-300 focus:outline-none ${
              !passwordsMatch ? 'border-red-500' : ''
            }`}
            required
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-sm">Passwords do not match.</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-full mt-6 w-full text-lg"
        >
          Sign Up
        </button>
        <div className="flex justify-center mt-4 text-lg text-gray-600">
          <div onClick={navigateToLogin} className="text-blue-600 cursor-pointer">
            Already have an account? Sign in
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Signup;
