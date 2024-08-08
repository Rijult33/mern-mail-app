import React, { useState, useEffect } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser, setReceivedEmails } from '../redux/appSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDemoLogin, setIsDemoLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
  
    try {
      const loginRes = await axios.post("https://mailapp-qd44.onrender.com/api/v1/user/login", formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
  
      console.log('Login response:', loginRes.data);
  
      if (loginRes.data.success) {
        setFormData({
          email: '',
          password: '',
        });
  
        dispatch(setAuthUser(loginRes.data.user));
        toast.success("Login successful!");
        navigate('/');
  

        
  
      } else {
        toast.error(loginRes.data.message); 
      }
  
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error);
      toast.error("Invalid credentials");
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleDemoLogin = () => {
    setIsDemoLogin(true);
    setFormData({
      email: 'demo123@gmail.com',
      password: 'demo123@',
    });
  };

  useEffect(() => {
    if (isDemoLogin) {
      const syntheticEvent = {
        preventDefault: () => {},
      };
      handleSubmit(syntheticEvent);
      setIsDemoLogin(false);
    }
  }, [formData]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 w-full max-w-md border rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            className="w-10"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg"
            alt="logo"
          />
          <h1 className="text-4xl text-blue-500 font-medium">Mail</h1>
        </div>
        <hr className="border-t border-gray-200 w-full mb-4" />
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Sign in</h1>
          <p className="text-gray-500">Welcome back! Please login to your account.</p>
        </div>
        <div className="flex flex-col gap-4">
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
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-full mt-6 w-full text-lg"
        >
          Sign In
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-3 rounded-full mt-4 w-full text-lg"
          onClick={handleDemoLogin}
        >
          Login with Demo Account
        </button>
        <div className="flex justify-center mt-4 text-lg text-gray-600">
          <div onClick={() => navigate('/signup')} className="text-blue-600 cursor-pointer">
            Don't have an account? Sign up
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
