import axios from 'axios';
import { setReceivedEmails, setSentEmails, setDeletedEmails, setAllEmails } from './appSlice';
import toast from 'react-hot-toast';
import API_URL from '../config/config';

export const fetchReceivedEmails = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}api/v1/email/get-received-emails`, { withCredentials: true });
    dispatch(setReceivedEmails(res.data.emails));
  } catch (error) {
    console.error('Error fetching received emails:', error);
  }
};

export const fetchSentEmails = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}api/v1/email/get-all-sent-emails`, { withCredentials: true });
    dispatch(setSentEmails(res.data.emails));
  } catch (error) {
    console.error('Error fetching sent emails:', error);
  }
};

export const fetchDeletedEmails = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}api/v1/email/get-emails-in-bin`, { withCredentials: true });
    dispatch(setDeletedEmails(res.data.emails));
  } catch (error) {
    console.error('Error fetching deleted emails:', error);
  }
};

export const fetchAllEmails = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}api/v1/email/get-all-mails`, { withCredentials: true });
    dispatch(setAllEmails(res.data.emails));
  } catch (error) {
    console.error('Error fetching all emails:', error);
  }
};

export const moveToBin = (emailIds) => async (dispatch) => {
  try {
    await Promise.all(emailIds.map(emailId => 
      axios.put(`${API_URL}api/v1/email/soft-delete/${emailId}`, {}, { withCredentials: true })
    ));
    const message = emailIds.length === 1 
      ? 'Email moved to bin successfully!' 
      : `${emailIds.length} emails moved to bin successfully!`;
    toast.success(message);
    dispatch(fetchReceivedEmails());
    dispatch(fetchSentEmails());
    dispatch(fetchDeletedEmails());
    dispatch(fetchAllEmails());
  } catch (error) {
    console.error('Error moving emails to bin:', error);
    toast.error('Failed to move emails to bin.');
  }
};

export const recoverEmails = (emailIds) => async (dispatch) => {
  try {
    await Promise.all(emailIds.map(id => 
      axios.put(`${API_URL}api/v1/email/recover/${id}`, {}, { withCredentials: true })
    ));
    const message = emailIds.length === 1 
      ? 'Email recovered successfully!' 
      : `${emailIds.length} emails recovered successfully!`;
    toast.success(message);
    dispatch(fetchDeletedEmails());
    dispatch(fetchReceivedEmails());
  } catch (error) {
    console.error('Error recovering emails:', error);
    toast.error('Failed to recover emails.');
  }
};

export const permanentlyDelete = (emailIds) => async (dispatch) => {
  try {
    await Promise.all(emailIds.map(id => axios.delete(`${API_URL}api/v1/email/permanent-delete/${id}`, { withCredentials: true })));
    const message = emailIds.length === 1 
      ? 'Email deleted permanently!' 
      : `${emailIds.length} emails deleted permanently!`;
    toast.success(message);
    dispatch(fetchDeletedEmails());
  } catch (error) {
    console.error('Error deleting emails permanently:', error);
    toast.error('Failed to delete emails permanently.');
  }
};
