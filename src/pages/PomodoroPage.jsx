import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Menu } from 'lucide-react';
import TaskSidebar from '../components/TaskSidebar';
import PomodoroTimer from '../components/PomodoroTimer';

export default function PomodoroPage() {
  const [isTaskSidebarOpen, setTaskSidebarOpen] = useState(true);

  return (
    <div className="flex h-full bg-page-bg text-gray-800 p-4 sm:p-6 gap-6">
      
      {/*Static Controls Column*/}
      <div className="flex flex-col space-y-4">
        <Link
          to="/study-tools"
          className="flex items-center text-black hover:bg-gray-200 p-2 rounded-md transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <button
          onClick={() => setTaskSidebarOpen(!isTaskSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/*Collapsible Task Sidebar*/}
      <TaskSidebar isOpen={isTaskSidebarOpen} />
      
      {/* Pomodoro Timer Card*/}
      <div className="w-full flex-1 bg-white rounded-2xl shadow-md border p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Pomodoro Timer</h1>
        <div className="flex-1 flex items-center justify-center w-full">
          <PomodoroTimer />
        </div>
      </div>
    </div>
  );
}