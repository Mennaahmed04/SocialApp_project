import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout'
import 'flowbite'
import Login from './components/Auth/login/Login'
import Register from './components/Auth/register/Register'
import Home from './pages/Home'
import ProtectRoute from './components/ProtectRoute';
import Profile from './pages/Profile';
import PostDetails from './pages/PostDetails';
import ChangePassword from './ChangePassword'; // 1. استيراد الصفحة الجديدة

export default function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <Login /> },
        { path: '/register', element: <Register /> },
        { 
          path: '/home', 
          element: <ProtectRoute><Home /></ProtectRoute> 
        },
        { 
          path: '/profile', 
          element: <ProtectRoute><Profile /></ProtectRoute> 
        },
        { 
          path: '/postdetails/:id', 
          element: <ProtectRoute><PostDetails /></ProtectRoute> 
        },
        { path: '/changepassword', element: <ChangePassword /> },
        { path: '*', element: <h2 className="text-center py-20 dark:text-white">Not Found</h2> },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={routes} />
    </>
  );
}