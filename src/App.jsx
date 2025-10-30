import React from 'react';
import { Outlet } from 'react-router-dom'; // This renders the current page
import Sidebar from './Components/Sidebar'; // Import our new sidebar

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto p-8">
        {/* Outlet is where our pages (like PersonalLibrary) will be displayed */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;