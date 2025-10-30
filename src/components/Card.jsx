// src/components/Card.jsx

import React from 'react';

function Card({ children }) {
  return (
    <div 
      className="
        bg-white 
        rounded-3xl 
        shadow-2xl 
        p-10 
        md:p-14 
        max-w-xl 
        w-full 
        flex 
        flex-col 
        items-center
      "
    >
      {children}
    </div>
  );
}

export default Card;