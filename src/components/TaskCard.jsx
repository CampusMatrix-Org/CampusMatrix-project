

import React from 'react';
import { SquareCheck, CheckSquare, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = React.forwardRef(({ task, onToggleComplete, onDelete, ...props }, ref) => {

  const { title, subject, dueDateDisplay, isHighPriority, isCompleted } = task;

  return (
    <motion.div 
      ref={ref} 
      {...props}
      className={`flex items-center bg-white p-4 rounded-lg shadow border-l-4 
        ${isCompleted ? 'border-gray-300 opacity-60' : 'border-primary-purple'}`}
    >
      <button onClick={onToggleComplete} className="mr-4">
        {isCompleted ? (
          <CheckSquare className="w-6 h-6 text-gray-500" />
        ) : (
          <SquareCheck className="w-6 h-6 text-primary-purple" />
        )}
      </button>
      
      <div className="flex-1">
        <p className={`font-semibold text-gray-800 ${isCompleted ? 'line-through' : ''}`}>
          {title}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            {subject}
          </span>
          {isHighPriority && !isCompleted && (
            <span className="text-xs font-semibold text-white bg-primary-purple px-2 py-0.5 rounded-full">
              HIGH PRIORITY
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3 ml-4">
        
        <p className={`text-sm font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-600'}`}>
          {dueDateDisplay}
        </p>
        <button 
          onClick={onDelete} 
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
});

export default TaskCard;