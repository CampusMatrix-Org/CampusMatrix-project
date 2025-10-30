

import React from 'react';
import { Link } from 'react-router-dom';


import UpcomingTasks from './UpcomingTasks';
import TodaysSchedule from './TodaysSchedule';
import StressMeter from './StressMeter';
import ProgressOverview from './ProgressOverview';

const Dashboard = () => {
  return (
    <main className="p-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Good morning, [Student Name]</h1>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        
        <div className="transition-transform duration-200 ease-out hover:scale-[1.02]">
          <UpcomingTasks />
        </div>
        
        
        <div className="transition-transform duration-200 ease-out hover:scale-[1.02]">
          <TodaysSchedule />
        </div>

        
        <Link 
          to="/progress-details" 
          className="transition-transform duration-200 ease-out hover:scale-[1.02] hover:opacity-90 h-full block"
        >
          <ProgressOverview />
        </Link>
        
        
        <div className="transition-transform duration-200 ease-out hover:scale-[1.02]">
          <StressMeter />
        </div>
        
      </div>
    </main>
  );
};

export default Dashboard;