

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const StressMeter = () => {
  const [stressLevel, setStressLevel] = useState(40);

  const getStressDetails = (level) => {
    if (level <= 33) {
      return { emoji: '😊', label: 'Low', color: 'text-green-500' };
    }
    if (level <= 66) {
      return { emoji: '😐', label: 'Moderate', color: 'text-yellow-500' };
    }
    return { emoji: '😩', label: 'High', color: 'text-red-500' };
  };

  const stressDetails = getStressDetails(stressLevel);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4">Stress Meter</h2>
        <div className="flex justify-between text-3xl mb-4">
          <span className={stressLevel > 33 ? 'opacity-30' : ''}>😊</span>
          <span className={stressLevel <= 33 || stressLevel > 66 ? 'opacity-30' : ''}>😐</span>
          <span className={stressLevel <= 66 ? 'opacity-30' : ''}>😩</span>
        </div>
        
 
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={stressLevel}
          onChange={(e) => setStressLevel(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        
        <p className={`text-center font-semibold mt-2 ${stressDetails.color}`}>
          {stressDetails.label}
        </p>
      </div>
    </div>
  );
};

export default StressMeter;