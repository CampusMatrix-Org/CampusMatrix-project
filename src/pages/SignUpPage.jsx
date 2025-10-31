// src/pages/SignUpPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <--- NEW IMPORT
import Card from '../components/Card'; 
import logo from '../assets/logo.jpg'; 

function SignUpPage() {
  const handleCreateAccount = (e) => {
    e.preventDefault(); 
    alert("Account Creation Attempted!"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card>
        
        {/* Logo and Name Section */}
        <div className="flex flex-col items-center mb-8">
          <img 
            src={logo} 
            alt="CampusMatrix Logo" 
            className="w-15 h-15 object-contain" 
          />
          <span className="text-xl font-bold text-purple-700 mt-2">
            CampusMatrix
          </span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create Your Account
        </h1>
        
        {/* Sign Up Form */}
        <form onSubmit={handleCreateAccount} className="w-full space-y-4">
          
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
          />
          
          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full mt-6 px-8 py-3 text-lg font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-lg transition duration-150 ease-in-out shadow-md"
          >
            Create Account
          </button>
        </form>
        
        {/* Login Link: Uses <Link> to go back to the Home Page (/) */}
        <div className="mt-6 text-sm text-center">
          Already have an account?{' '}
          <Link to="/" className="text-purple-700 font-medium hover:text-purple-800 transition">
            Login
          </Link>
        </div>
        
      </Card>
    </div>
  );
}

export default SignUpPage;