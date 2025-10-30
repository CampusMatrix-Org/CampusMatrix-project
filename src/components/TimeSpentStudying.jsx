

import React from 'react';

const TimeSpentStudying = () => {
  const subjectsData = [
    { name: 'Physics', hours: 4 },
    { name: 'History', hours: 5 },
    { name: 'Calculus', hours: 9 },
    { name: 'Chemistry', hours: 7 },
  ];
  const maxHours = Math.max(...subjectsData.map(s => s.hours));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Time Spent Studying by Subject</h2>
      <div className="flex items-end justify-around h-40">
        {subjectsData.map((subject) => (
          <div key={subject.name} className="flex flex-col items-center justify-end mx-2 h-full">
            <div
              className="w-8 rounded-t-lg bg-primary-purple"
              style={{ height: `${(subject.hours / maxHours) * 100}%` }}
            ></div>
            <p className="text-xs text-gray-500 mt-2">{subject.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSpentStudying;