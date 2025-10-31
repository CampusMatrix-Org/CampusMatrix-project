// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Card from '../components/Card';
import logo from '../assets/logo.jpg'; 

function LoginPage() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login Attempted!");
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
          Welcome Back
        </h1>
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
          
          {/* Email Address Input */}
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
          />
          
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
          />
          
          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-6 px-8 py-3 text-lg font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-lg transition duration-150 ease-in-out shadow-md"
          >
            Login
          </button>
        </form>
        
        {/* Footer Links (Forgot Password & Sign Up) */}
        <div className="mt-6 text-sm text-center space-y-2">
          
          {/* Forgot Password */}
          <Link to="/" className="text-gray-500 hover:text-purple-700 transition block">
            Forgot Password?
          </Link>

          {/* Don't have an account? Sign Up */}
          <div className='text-gray-500'>
            Don't have an account? 
            <Link to="/signup" className="text-purple-700 font-medium hover:text-purple-800 transition ml-1">
              Sign Up
            </Link>
          </div>
          
        </div>
        
      </Card>
    </div>
  );
}

export default LoginPage;