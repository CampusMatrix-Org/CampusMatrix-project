// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage';

// Define the routes: Home Page at '/' and Sign Up at '/signup'
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // This is your loading page
  },
  {
    path: "/signup",
    element: <SignUpPage />, // This is your sign up form page
  },
   {
    path: "/LoginPage",
    element: <LoginPage />, // This is your sign up form page
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)