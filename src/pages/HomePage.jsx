// src/App.jsx

import React from 'react';
import Card from '../components/Card';
import FeatureIcon from '../components/FeatureIcon'; // Import the new component
import logo from '../assets/logo.jpg'; // KEEP this import for your image


function App() {
  // Define placeholder functions for navigation (in a real app, this would use React Router)
  const handleSignUp = () => {
    alert("Navigating to Sign Up Page...");
    // You would use navigate('/signup') here
  };
  const handleLogin = () => {
    alert("Navigating to Login Page...");
    // You would use navigate('/login') here
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card>
        
        {/* 1. LOGO AND NAME (Styling Adjusted to Match Image) */}
        {/* The image shows a complex logo structure, here we just show the image and text: */}
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="CampusMatrix Logo" className="w-30 h-40 object-contain text-purple-700" />
          {/* We'll assume the text is part of the image, or you can add it back if needed: */}
          {/* <span className="text-lg font-bold text-purple-700 mt-[-10px]">CampusMatrix</span> */}
        </div>
        
        {/* 2. MAIN HEADING AND DESCRIPTION */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 text-center leading-tight">
          Your All-in-One University Hub
        </h1>
        <p className="text-sm text-gray-500 mb-12 text-center max-w-sm">
          Simplify your academic life with smart tools and personalized support.
        </p>
        
        {/* 3. FEATURE ICONS CONTAINER */}
        <div className="flex justify-between w-full max-w-sm mb-12">
          {/* Tasks - Use a List Check emoji */}
          <FeatureIcon iconText="📝" label="Tasks" /> 
          {/* Schedule - Use a Calendar emoji */}
          <FeatureIcon iconText="📅" label="Schedule" />
          {/* AI Assistant - Use a Lightbulb emoji */}
          <FeatureIcon iconText="💡" label="AI Assistant" />
        </div>

        {/* 4. ACTION BUTTONS (Click handlers implemented) */}
        <div className="flex space-x-4 mb-10">
          {/* Primary Button: Sign Up for Free (Solid Purple) */}
          <button 
            onClick={handleSignUp}
            className="
              px-8 py-3 
              text-base font-semibold text-white 
              bg-purple-600 hover:bg-purple-700 
              rounded-full 
              transition duration-150 ease-in-out 
              shadow-lg shadow-purple-500/50
            "
          >
            Sign Up for Free
          </button>

          {/* Secondary Button: Login (Outline Purple) */}
          <button 
            onClick={handleLogin}
            className="
              px-8 py-3 
              text-base font-semibold text-purple-600 
              border border-purple-400 hover:bg-purple-50 
              rounded-full 
              transition duration-150 ease-in-out
            "
          >
            Login
          </button>
        </div>

        {/* 5. FOOTER LINKS (About, Contact, Privacy) */}
        <div className="flex space-x-6 text-sm text-gray-400">
          <a href="/about" className="hover:text-purple-600 transition">About</a>
          <a href="/contact" className="hover:text-purple-600 transition">Contact</a>
          <a href="/privacy" className="hover:text-purple-600 transition">Privacy</a>
        </div>

      </Card>
    </div>
  );
}

export default App;