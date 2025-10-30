
import React from 'react';


const CircularProgress = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="48"
          cy="48"
        />
        <circle
          className="text-primary-purple" 
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="48"
          cy="48"
        />
      </svg>
      <div className="absolute text-primary-purple font-bold text-lg">
        {percentage}%
      </div>
    </div>
  );
};


const Bar = ({ day, height }) => (
  <div className="flex flex-col items-center">
    
    <div className="w-5 bg-purple-200 rounded-full flex flex-col-reverse" style={{ height: '80px' }}>
      
      <div className="w-full bg-primary-purple rounded-full" style={{ height: `${height}%` }}></div>
    </div>
    <p className="text-xs text-gray-500 mt-2">{day}</p>
  </div>
);

const ProgressOverview = () => {
  const progressData = [
    { day: 'Mon', height: 40 },
    { day: 'Tue', height: 60 },
    { day: 'Wed', height: 75 },
    { day: 'Thu', height: 90 },
    { day: 'Fri', height: 30 },
    { day: 'Sat', height: 50 }, 
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Progress Overview</h2>

      <div className="flex items-center mb-6">
        <CircularProgress percentage={75} />
        <p className="ml-4 text-gray-600 text-lg">Tasks Completed This Week</p>
      </div>


      <div className="flex items-end justify-around h-32 mt-4">
        {progressData.map((item, index) => (
          <Bar key={index} day={item.day} height={item.height} />
        ))}
      </div>
    </div>
  );
};

export default ProgressOverview;