

import React, { useState } from 'react';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';


const initialTasks = [
  { id: 1, title: "Math Homework", dueDate: "Due Fri", isCompleted: false },
  { id: 2, title: "History Essay", dueDate: "Due Mon", isCompleted: true },
  { id: 3, title: "Physics Quiz", dueDate: "", isCompleted: false, isHighPriority: true },
];


const TaskItem = ({ task, onToggle }) => (
  <button 
    onClick={onToggle} 
    className="flex items-center justify-between w-full text-left py-2 group"
  >
    <div className="flex items-center">
      {task.isCompleted ? (
        <FaRegCheckCircle className="text-primary-purple mr-3" />
      ) : (
        <FaRegCircle className="text-gray-400 mr-3 group-hover:text-primary-purple" />
      )}
      <div>
        <p className={`font-medium text-gray-800 ${task.isCompleted ? 'line-through' : ''}`}>
          {task.title}
        </p>
        <p className="text-sm text-gray-500">{task.dueDate}</p>
      </div>
    </div>
    {task.isHighPriority && !task.isCompleted && (
      <span className="text-xs font-bold text-white bg-primary-purple px-2 py-1 rounded-full">
        HIGH PRIORITY
      </span>
    )}
  </button>
);


const UpcomingTasks = () => {
  
  const [tasks, setTasks] = useState(initialTasks);

  
  const handleToggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
      <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={() => handleToggleTask(task.id)} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;