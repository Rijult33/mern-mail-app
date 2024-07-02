import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  receivedEmails: [],
  sentEmails: [],
  deletedEmails: [],
  allEmails: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setReceivedEmails: (state, action) => {
      state.receivedEmails = action.payload;
    },
    setSentEmails: (state, action) => {
      state.sentEmails = action.payload;
    },
    setDeletedEmails: (state, action) => {
      state.deletedEmails = action.payload;
    },
    setAllEmails: (state, action) => {
      state.allEmails = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.receivedEmails = [];
      state.sentEmails = [];
      state.deletedEmails = [];
      state.allEmails = [];
    },
  },
});

export const { setOpen, setAuthUser, setReceivedEmails, setSentEmails, setDeletedEmails, setAllEmails, logoutUser } = appSlice.actions;
export default appSlice.reducer;