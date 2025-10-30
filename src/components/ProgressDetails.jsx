

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar as CalendarIcon } from 'lucide-react';


import TimeSpentStudying from './TimeSpentStudying';
import TaskCompletionRate from './TaskCompletionRate';
import WeeklyProductivityTrend from './WeeklyProductivityTrend';

const ProgressDetails = () => {
  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link to="/dashboard" className="p-2 rounded-full hover:bg-gray-200 transition mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Progress & Analytics Dashboard</h1>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <CalendarIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimeSpentStudying />
        <TaskCompletionRate />
      </div>

      <WeeklyProductivityTrend />
    </div>
  );
};

export default ProgressDetails;