// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import FeatureIcon from '../components/FeatureIcon'; 
import logo from '../assets/logo.jpg'; 


function HomePage() { 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card>
        
        {/* ... (Logo, Heading, and Feature Icons remain the same) ... */}
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="CampusMatrix Logo" className="w-15 h-15 object-contain" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 text-center leading-tight">
          Your All-in-One University Hub
        </h1>
        <p className="text-sm text-gray-500 mb-12 text-center max-w-sm">
          Simplify your academic life with smart tools and personalized support.
        </p>
        
        <div className="flex justify-between w-full max-w-sm mb-12">
          <FeatureIcon iconText="📝" label="Tasks" /> 
          <FeatureIcon iconText="📅" label="Schedule" />
          <FeatureIcon iconText="💡" label="AI Assistant" />
        </div>

        {/* 4. ACTION BUTTONS (Using <Link> for navigation) */}
        <div className="flex space-x-4 mb-10">
          
          {/* Primary Button: Sign Up for Free (Navigates to /signup) */}
          <Link 
            to="/signup" // <--- **This makes the navigation work!**
            className="
              px-8 py-3 
              text-base font-semibold text-white 
              bg-purple-600 hover:bg-purple-700 
              rounded-full 
              transition duration-150 ease-in-out 
              shadow-lg shadow-purple-500/50
              flex items-center justify-center 
            "
          >
            Sign Up for Free
          </Link>

          {/* Secondary Button: Login (Navigates back to /) */}
          <Link 
            to="/LoginPage" // <--- Navigates to the Home Page (current page)
            className="
              px-8 py-3 
              text-base font-semibold text-purple-600 
              border border-purple-400 hover:bg-purple-50 
              rounded-full 
              transition duration-150 ease-in-out
              flex items-center justify-center 
            "
          >
            Login
          </Link>
        </div>

        {/* 5. FOOTER LINKS */}
        <div className="flex space-x-6 text-sm text-gray-400">
          <a href="/about" className="hover:text-purple-600 transition">About</a>
          <a href="/contact" className="hover:text-purple-600 transition">Contact</a>
          <a href="/privacy" className="hover:text-purple-600 transition">Privacy</a>
        </div>

      </Card>
    </div>
  );
}

export default HomePage;