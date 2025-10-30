

import React from 'react';

const WeeklyProductivityTrend = () => {

  const trendData = [
    { day: 'Mon', value: 30 },
    { day: 'Tue', value: 35 },
    { day: 'Wed', value: 50 },
    { day: 'Thu', value: 45 },
    { day: 'Fri', value: 60 },
    { day: 'Sat', value: 70 },
    { day: 'Sun', value: 75 },
  ];

  const chartHeight = 100, chartWidth = 100, padding = 10;
  const dataValues = trendData.map(d => d.value);
  const minVal = Math.min(...dataValues);
  const maxVal = Math.max(...dataValues);
  const valueRange = maxVal - minVal;

  const points = trendData.map((data, index) => {
    const x = (index / (trendData.length - 1)) * chartWidth;
    const y = chartHeight - padding - ((data.value - minVal) / valueRange) * (chartHeight - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Weekly Productivity Trend</h2>
      <div className="relative h-48">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="25" x2="100" y2="25" stroke="#e0e0e0" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#e0e0e0" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="#e0e0e0" strokeWidth="0.5" />
          <polyline fill="none" stroke="#6D28D9" strokeWidth="2" points={points} />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-around p-2 text-xs text-gray-500">
          {trendData.map(d => <span key={d.day}>{d.day}</span>)}
        </div>
      </div>
    </div>
  );
};

export default WeeklyProductivityTrend;