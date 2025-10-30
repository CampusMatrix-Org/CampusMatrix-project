

import React from 'react';
import { CheckCircle } from 'lucide-react';

const TaskCompletionRate = () => {
  const percentage = 75; 
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Task Completion Rate</h2>
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="64" cy="64" />
          <circle
            className="text-primary-purple"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
        </svg>
        <div className="absolute text-primary-purple font-bold text-2xl">{percentage}%</div>
      </div>
      {percentage === 100 && (
        <div className="mt-4 flex items-center text-green-600">
          <CheckCircle className="w-5 h-5 mr-2" />
          <p className="text-lg">Completed</p>
        </div>
      )}
    </div>
  );
};

export default TaskCompletionRate;