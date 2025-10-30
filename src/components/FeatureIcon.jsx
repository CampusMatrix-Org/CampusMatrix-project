// src/components/FeatureIcon.jsx
import React from 'react';

// This component uses Tailwind classes to style the icon box and text
function FeatureIcon({ iconText, label }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Icon Placeholder Styling */}
      <div 
        className="
          w-16 h-16 
          bg-purple-100 
          rounded-xl 
          flex 
          items-center 
          justify-center 
          text-3xl 
          text-purple-700
          border border-purple-200
        "
      >
        {/* Replace this emoji with an actual icon component later */}
        {iconText} 
      </div>
      
      {/* Label Text */}
      <span className="text-sm font-semibold text-purple-700">
        {label}
      </span>
    </div>
  );
}

export default FeatureIcon;