import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import {
  moveToBin as moveToBinAction,
  recoverEmails as recoverEmailsAction,
  permanentlyDelete as permanentlyDeleteAction
} from '../redux/actions';
import { IoIosRefresh } from "react-icons/io";
import { MdDeleteOutline, MdArrowBack, MdReply } from "react-icons/md";

const EmailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { view } = location.state || {};

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const response = await axios.get(`https://mailapp-qd44.onrender.com/api/v1/email/${id}`, { withCredentials: true });
        setMail(response.data.email);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching email:", error);
        toast.error("Failed to fetch email.");
        setLoading(false);
      }
    };

    fetchMail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#1E90FF" loading={loading} size={150} />
      </div>
    );
  }

  if (!mail) {
    return <div>Loading...</div>;
  }

  const moveToBin = async (emailId) => {
    try {
      await dispatch(moveToBinAction([emailId]));
      navigate(-1); // Go back to the previous route
    } catch (error) {
      console.error("Error during deleting", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const permanentlyDelete = async (emailId) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this email?");
    if (!confirmDelete) return;

    try {
      await dispatch(permanentlyDeleteAction([emailId]));
      navigate(-1); // Go back to the previous route
    } catch (error) {
      console.error("Error during permanent deleting", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const recoverEmail = async (emailId) => {
    try {
      await dispatch(recoverEmailsAction([emailId]));
      navigate(-1); // Go back to the previous route
    } catch (error) {
      console.error("Error during recovering email", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white w-full fixed z-10 overflow-x-hidden">
        <h1 className="text-2xl font-bold p-6 px-10">Email Detail</h1>
      </div>
      <div className="flex flex-col flex-1 mt-[68px]">
        <div className="fixed w-full bg-white z-10 px-7 border-b border-t flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div
              className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <MdArrowBack size="20px" />
            </div>
            <div
              className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 cursor-pointer"
              onClick={() => window.location.reload()}
            >
              <IoIosRefresh size="20px" />
            </div>
            <div
              className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate(`/reply/${mail._id}`, { state: { view } })}
            >
              <MdReply size="20px" />
            </div>
            {view === 'deleted' ? (
              <>
                <div
                  className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out hover:bg-red-200 cursor-pointer"
                  onClick={() => permanentlyDelete(mail._id)}
                >
                  <MdDeleteOutline size="20px" />
                </div>
                <div><button
                  className="bg-gray-400 hover:bg-green-600 hover:shadow-lg text-white text-sm px-3 py-1 rounded mr-2"
                  onClick={() => recoverEmail(mail._id)}
                >
                  Recover
                </button></div>
              </>
            ) : (
              <div
                className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ease-in-out hover:bg-red-200 cursor-pointer"
                onClick={() => moveToBin(mail._id)}
              >
                <MdDeleteOutline size="20px" />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 mt-[45px] bg-white p-10 rounded-md shadow-md overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">{mail.subject}</h2>
          <div className="mb-4 py-4">
            <p className="mb-2"><strong>From:</strong> {mail.senderName} &lt;{mail.senderEmail}&gt;</p>
            <p className="mb-2"><strong>To:</strong> {mail.to.fullName} &lt;{mail.to.email}&gt;</p>
            <p className="mb-2"><strong>Date:</strong> {new Date(mail.createdAt).toLocaleString()}</p>
          </div>
          <div className="whitespace-pre-wrap break-words">
            {mail.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
