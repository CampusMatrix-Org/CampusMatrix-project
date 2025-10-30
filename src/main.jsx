import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

// Assuming App is located in the same directory as main.jsx, or one level up.
// Let's explicitly try to go one directory up and back in, which sometimes helps the resolution engine.
// If your App.jsx is next to main.jsx:
import App from './App.jsx'; 

// The 'Pages' folder path is used based on your previous error messages.
import PersonalLibrary from './Pages/PersonalLibrary.jsx';
import StudyTools from './Pages/StudyTools.jsx'; 
import Notebook from './Pages/Notebook.jsx'; 

// Dummy components for other routes to prevent errors
const Dashboard = () => <div className="p-4 text-center text-xl">Dashboard Page</div>;
const Calendar = () => <div className="p-4 text-center text-xl">Calendar Page</div>;
const Settings = () => <div className="p-4 text-center text-xl">Settings Page</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main layout (with sidebar)
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      // --- STUDY TOOLS AND LIBRARY ROUTES ---
      {
        // This is the main "Study Tools" page with the cards
        path: "/study-tools", 
        element: <StudyTools />, 
      },
      {
        // This is the "Personal Library" page
        path: "/study-tools/personal-library", 
        element: <PersonalLibrary />, 
      },
      {
        // This is the dynamic route for a single "Notebook" (folder content)
        path: "/study-tools/personal-library/:folderId", 
        element: <Notebook />,
      },
      // ----------------------------------------
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
