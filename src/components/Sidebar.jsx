import React from 'react';
// Import react icons
import { 
  LuLayoutDashboard, 
  LuUsers, 
  LuFileCheck, 
  LuSettings, 
  LuShieldCheck, 
  LuLogOut 
} from "react-icons/lu";

const Sidebar = () => {
  return (
    // Sidebar container
    <div className="flex h-full w-64 flex-col bg-sidebar-bg text-gray-200 shadow-lg">
      
      {/* Logo Section */}
      <div className="flex h-20 items-center justify-center border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="rounded bg-white p-1">
            {/* simple white box as a placeholder logo */}
            <div className="h-6 w-6 rounded bg-indigo-200"></div>
          </div>
          <span className="text-xl font-bold text-white">CampusMatrix</span>
        </div>
      </div>

      {/* navigation links */}
      <nav className="flex-1 px-4 py-6">
        <SidebarLink icon={<LuLayoutDashboard size={20} />} text="Dashboard" active />
        <SidebarLink icon={<LuUsers size={20} />} text="User Management" />
        <SidebarLink icon={<LuFileCheck size={20} />} text="Content Curation" />
        <SidebarLink icon={<LuSettings size={20} />} text="System Settings" />
        <SidebarLink icon={<LuShieldCheck size={20} />} text="Security Logs" />
      </nav>

      {/* logout button*/}
      <div className="px-4 py-6">
        <SidebarLink icon={<LuLogOut size={20} />} text="Logout" />
      </div>
    </div>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ icon, text, active = false }) => {
  return (
    <a
      href="#"
      className={`
        flex items-center space-x-3 rounded-lg px-4 py-3 mb-2
        transition-colors duration-200
        ${
          active
            ? 'bg-sidebar-active text-white shadow-inner'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }
      `}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </a>
  );
};

export default Sidebar;