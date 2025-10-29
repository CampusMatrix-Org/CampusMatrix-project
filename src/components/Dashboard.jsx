import React from 'react';
// This is correct
import { LuUserCheck, LuCircleDot, LuDownload, LuActivity } from 'react-icons/lu';
import StatCard from './StatCard';

const Dashboard = () => {
  return (
    // Main content area
    <main className="relative flex-1 overflow-y-auto p-8">
      
      {/* Header */}
      <h1 className="mb-8 text-4xl font-bold text-text-dark">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <StatCard
          title="Total Users"
          value="12,450"
        />
        {/* Card 2 */}
        <StatCard
          title="Active Users Today"
          icon={
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
              <LuUserCheck size={24} className="text-white" />
            </div>
          }
        />
        {/* Card 3 */}
        <StatCard
          title="Bemart Tieaty" 
          icon={
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-900">
              <LuCircleDot size={24} className="text-white" />
            </div>
          }
        />
        {/* Card 4 */}
        <StatCard
          title="Active Users"
          value="5,890"
        />
        {/* Card 5 */}
        <StatCard
          title="New Signups 1 Week"
          value="350"
        />
        {/* Card 6 */}
        <StatCard
          title="Support Tickets"
          value="12"
          subtitle="Unsolved"
        />
      </div>

      {/* System Activity Trend */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold text-text-dark">
          System Activity Trend
        </h2>
        <div className="rounded-lg bg-white p-6 shadow-md">
          {/* Mock Chart Placeholder */}
          <div className="flex h-80 items-center justify-center rounded-md bg-gray-50 text-gray-400">
            {/* Using a placeholder for the graph */}
            
            // This is correct <LuActivity size={64} />
            <span className="ml-4 text-xl">Chart Component Placeholder</span>
          </div>
        </div>
      </div>

      {/* floating action button */}
      <button
        className="
          fixed bottom-8 right-8 z-10
          flex h-24 w-24 flex-col items-center justify-center
          rounded-full bg-fab-purple text-white
          shadow-xl transition-transform duration-200
          hover:scale-105 hover:shadow-2xl
        "
      >
        <LuDownload size={32} />
        <span className="mt-1 text-xs font-semibold">Generate</span>
        <span className="text-xs font-semibold">Report</span>
      </button>

    </main>
  );
};

export default Dashboard;