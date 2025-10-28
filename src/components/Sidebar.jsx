import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, ListChecks, Calendar, Settings, Brain, LogOut, MessageSquare } from "lucide-react";

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
  const location = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-64 bg-sidebar-bg h-screen p-4 flex flex-col justify-between border-r border-gray-100 shadow-xl shadow-gray-900/50">
      
      {/* Logo + nav */}
      <div>
        <div className="flex flex-col items-center mb-16 pt-4">
          <div className="w-16 h-16 bg-primary-purple rounded-lg flex items-center justify-center">
            <span className="text-white text-3xl font-bold">C</span>
          </div>
          <p className="text-lg font-semibold text-primary-purple mt-2 text-center">CampusMatrix</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.route;
            const baseClasses = "flex items-center p-3 rounded-lg transition duration-150 group";
            const activeClasses = "bg-primary-purple text-white shadow-md hover:bg-primary-purple/90";
            const inactiveClasses = "text-gray-700 hover:bg-gray-100 hover:text-primary-purple";

            return (
              <Link
                key={item.name}
                to={item.route}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-primary-purple"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
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
