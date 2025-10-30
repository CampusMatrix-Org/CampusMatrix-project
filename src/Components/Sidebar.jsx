import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// Imports all necessary icons from lucide-react
import { Home, ListChecks, Calendar, Settings, Brain, LogOut, MessageSquare } from "lucide-react";
import logoImage from '../assets/logo.png';

// The complete list of navigation items
const navItems = [
  { name: "Dashboard", icon: Home, route: "/dashboard" },
  { name: "Tasks", icon: ListChecks, route: "/tasks" },
  { name: "Calendar", icon: Calendar, route: "/calendar" },
  { name: "Study Tools", icon: Brain, route: "/study-tools" },
  { name: "Profile/Settings", icon: Settings, route: "/settings" },
  { name: "AI Assistant", icon: MessageSquare, route: "/ai-assistant" },
];

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); // <- current URL path to determine active link

  const handleLogout = () => {
    // Replace with your actual logout logic (e.g., calling an API)
    localStorage.removeItem("token");
    sessionStorage.clear();
    // Redirects user to the login page after clearing session data
    navigate("/login", { replace: true });
  };

  return (
    // Main Sidebar Container Styling
    <div className="w-64 bg-sidebar-bg h-screen p-4 flex flex-col justify-between border-r border-gray-100 shadow-xl shadow-gray-900/50">
      {/* Top Section (logo + nav) */}
      <div>
        {/* LOGO */}
        <div className="flex flex-col items-center mb-16 pt-4">
          <img
            src={logoImage}
            alt="CampusMatrix Logo"
            className="w-24 h-24 object-contain" 
          />
          <p className="text-lg font-semibold text-primary-purple mt-2 text-center">CampusMatrix</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.route;
 // Use startsWith for sub-routes
            const baseClasses = "flex items-center p-3 rounded-lg transition duration-150 group";
            // Classes for the active (currently selected) item
            const activeClasses = "bg-primary-purple text-white shadow-md hover:bg-primary-purple/90";
            // Classes for non-active items
            const inactiveClasses = "text-gray-700 hover:bg-gray-100 hover:text-primary-purple";

            return (
              <Link
                key={item.name}
                to={item.route}
                // ⭐ FIX: This line is corrected to use template literal syntax
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              >
                {/* Icon component logic, color changes based on active state */}
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-primary-purple"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button (stays fixed at bottom) */}
      <div className="pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 w-full rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-600 transition duration-150"
        >
          <LogOut className="w-5 h-5 mr-3 text-red-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;