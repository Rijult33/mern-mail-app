import React from 'react';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Body from './components/Body';
import Inbox from './components/Inbox';
import EmailDetail from './components/EmailDetail';
import Signup from './components/Signup';
import Login from './components/Login';
import Sent from './components/Sent';
import AllMails from './components/AllMails';
import DeletedMails from './components/DeletedMails';
import { Toaster } from 'react-hot-toast';
import PromptLogout from './components/PromptLogout';
import ComposeEmail from './components/ComposeEmail';
import ProtectedRoute from './components/ProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        ),
      },
      {
        path: 'inbox',
        element: (
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mail/:id',
        element: (
          <ProtectedRoute>
            <EmailDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'sent',
        element: (
          <ProtectedRoute>
            <Sent />
          </ProtectedRoute>
        ),
      },
      {
        path: 'all-mails',
        element: (
          <ProtectedRoute>
            <AllMails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'deleted-mails',
        element: (
          <ProtectedRoute>
            <DeletedMails />
          </ProtectedRoute>
        ),
      },
      {
        path: '*', // Catch-all route
        element: <Navigate to="/inbox" replace />,
      },
    ],
  },
  {
    path: '/signup',
    element: <PromptLogout targetElement={<Signup />} />,
  },
  {
    path: '/login',
    element: <PromptLogout targetElement={<Login />} />,
  },
  {
    path: '*', // Catch-all route for top-level undefined routes
    element: <Navigate to="/inbox" replace />,
  },
]);

function App() {
  return (
    <div className="h-screen w-full">
      <RouterProvider router={appRouter} />
      <div className="absolute bottom-0 right-20 w-[30%] z-10">
        <ComposeEmail />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
