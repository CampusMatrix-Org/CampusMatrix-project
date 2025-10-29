import React from 'react';

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    // Card container
    <div className="flex h-40 flex-col justify-between rounded-xl bg-card-bg p-6 shadow-md">
      
      {/* Titile */}
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>

      {/* Content Area */}
      <div className="flex-1">
        {icon ? (
          // dashborad icons
          <div className="flex h-full items-center justify-center">
            {icon}
          </div>
        ) : (
          // text fileds
          <div className="flex h-full flex-col justify-center">
            <p className="text-4xl font-bold text-text-dark">{value}</p>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;