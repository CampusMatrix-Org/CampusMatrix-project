

import React, { useState } from 'react';
import { List, LayoutGrid, AlertCircle, Calendar, Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import Modal from './Modal';
import NewTaskForm from './NewTaskForm';
import { motion, AnimatePresence } from 'framer-motion';


const TasksPage = ({ tasks, onAddTask, onToggleComplete, onDeleteTask }) => {
  
  const [viewMode, setViewMode] = useState('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  
  const handleFormSubmit = (taskData) => {
    onAddTask(taskData); 
    setIsModalOpen(false); 
  };

  
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(today);
  const daysUntilSaturday = 6 - today.getDay(); 
  endOfWeek.setDate(today.getDate() + daysUntilSaturday);
  endOfWeek.setHours(23, 59, 59, 999);

  const highPriorityTasks = tasks.filter(t => t.isHighPriority && !t.isCompleted);
  const dueThisWeekTasks = tasks.filter(t => 
    !t.isHighPriority && 
    !t.isCompleted &&
    t.dueDateValue >= today && 
    t.dueDateValue <= endOfWeek
  );
  const upcomingTasks = tasks.filter(t =>
    !t.isHighPriority &&
    !t.isCompleted &&
    t.dueDateValue > endOfWeek
  );
  const completedTasks = tasks.filter(t => t.isCompleted);


  const sortTasks = (list) => {
    if (sortBy === 'priority') {
      
      return [...list].sort((a, b) => b.isHighPriority - a.isHighPriority);
    }
    if (sortBy === 'date') {
      
      return [...list].sort((a, b) => a.dueDateValue - b.dueDateValue);
    }
    return list; 
  };


  const sortedHighPriorityTasks = sortTasks(highPriorityTasks);
  const sortedDueThisWeekTasks = sortTasks(dueThisWeekTasks);
  const sortedUpcomingTasks = sortTasks(upcomingTasks);

  const taskAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };


  return (
    <> 
      <div className="p-8 relative min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Management</h1>
        
        
        <div className="flex justify-between items-center mb-8">
          
          <div className="flex space-x-2 bg-gray-200 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${viewMode === 'list' ? 'bg-primary-purple text-white' : 'text-gray-600 hover:bg-gray-300'}`}
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </button>
            <button 
              onClick={() => setViewMode('board')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${viewMode === 'board' ? 'bg-primary-purple text-white' : 'text-gray-600 hover:bg-gray-300'}`}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Board View
            </button>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => setSortBy('priority')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                ${sortBy === 'priority' 
                  ? 'bg-primary-purple text-white shadow' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Priority
            </button>
            <button 
              onClick={() => setSortBy('date')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                ${sortBy === 'date'
                  ? 'bg-primary-purple text-white shadow' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Due Date
            </button>
          </div>
        </div>
        
        
        {viewMode === 'list' ? (
          <div className="space-y-8">
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">High Priority</h2>
              <motion.div layout className="space-y-4">
                <AnimatePresence>
                  {sortedHighPriorityTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggleComplete={() => onToggleComplete(task.id)}
                      onDelete={() => onDeleteTask(task.id)}
                      layout variants={taskAnimation} initial="initial" animate="animate" exit="exit"
                    />
                  ))}
                </AnimatePresence>
                {sortedHighPriorityTasks.length === 0 && (<p className="text-gray-500">No high priority tasks.</p>)}
              </motion.div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Due This Week</h2>
              <motion.div layout className="space-y-4">
                <AnimatePresence>
                  {sortedDueThisWeekTasks.map(task => (
                     <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggleComplete={() => onToggleComplete(task.id)}
                      onDelete={() => onDeleteTask(task.id)}
                      layout variants={taskAnimation} initial="initial" animate="animate" exit="exit"
                    />
                  ))}
                </AnimatePresence>
                 {sortedDueThisWeekTasks.length === 0 && (<p className="text-gray-500">No tasks due this week.</p>)}
              </motion.div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming</h2>
              <motion.div layout className="space-y-4">
                <AnimatePresence>
                  {sortedUpcomingTasks.map(task => (
                     <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggleComplete={() => onToggleComplete(task.id)}
                      onDelete={() => onDeleteTask(task.id)}
                      layout variants={taskAnimation} initial="initial" animate="animate" exit="exit"
                    />
                  ))}
                </AnimatePresence>
                 {sortedUpcomingTasks.length === 0 && (<p className="text-gray-500">No upcoming tasks.</p>)}
              </motion.div>
            </div>
            
            <div>
               <h2 className="text-xl font-semibold text-gray-800 mb-4">Completed</h2>
              <motion.div layout className="space-y-4">
                <AnimatePresence>
                  {completedTasks.map(task => (
                     <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggleComplete={() => onToggleComplete(task.id)}
                      onDelete={() => onDeleteTask(task.id)}
                      layout variants={taskAnimation} initial="initial" animate="animate" exit="exit"
                    />
                  ))}
                </AnimatePresence>
                 {completedTasks.length === 0 && (<p className="text-gray-500">No completed tasks.</p>)}
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500"><p>Board View would show a Kanban-style board here.</p></div>
        )}

        
        <motion.button 
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-10 right-10 bg-primary-purple text-white p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add a New Task"
      >
        <NewTaskForm 
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </>
  );
};

export default TasksPage;