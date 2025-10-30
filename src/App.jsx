

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProgressDetails from './components/ProgressDetails';
import TasksPage from './components/TasksPage';
import CalendarPage from './components/CalendarPage';


const initialTasks = [
  { id: 1, title: 'Math Homework - Due Mon', subject: 'Physics 101', dueDateDisplay: 'Due Mon', dueDateValue: new Date(2025, 9, 27), isHighPriority: true, isCompleted: false },
  { id: 2, title: 'Math Homework #3', subject: 'Physics 101', dueDateDisplay: 'Due Fri', dueDateValue: new Date(2025, 9, 31), isHighPriority: true, isCompleted: false },
  { id: 3, title: 'History Essay Draft', subject: 'History 202', dueDateDisplay: 'Due Wed', dueDateValue: new Date(2025, 9, 29), isHighPriority: false, isCompleted: false },
  { id: 4, title: 'Lab Report', subject: 'Chemistry 101', dueDateDisplay: 'Due Fri', dueDateValue: new Date(2025, 9, 31), isHighPriority: true, isCompleted: true },
  { id: 5, title: 'Final Project Outline', subject: 'Software Eng.', dueDateDisplay: 'Due Nov 15', dueDateValue: new Date(2025, 10, 15), isHighPriority: false, isCompleted: false },
];


const StudyTools = () => <div className="p-8 text-3xl font-bold">Study Tools</div>;
const Settings = () => <div className="p-8 text-3xl font-bold">Profile/Settings</div>;
const AiAssistant = () => <div className="p-8 text-3xl font-bold">AI Assistant</div>;

function App() {
  
  const [tasks, setTasks] = useState(initialTasks);

  
  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleAddTask = (taskData) => {
    const dateParts = taskData.dueDate.split('-');
    const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const displayDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const newTask = {
      ...taskData,
      id: Date.now(),
      isCompleted: false,
      dueDateValue: dateObj,
      dueDateDisplay: `Due ${displayDate}`,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  
  const handleEventDrop = ({ event, start, end }) => {
    
    const taskId = event.id; 
    
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          
          const newDueDate = new Date(start); // 'start' is the new date from the drop
          const displayDate = newDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          return { 
            ...task, 
            dueDateValue: newDueDate,
            dueDateDisplay: `Due ${displayDate}` 
          };
        }
        return task;
      });
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/progress-details" element={<ProgressDetails />} />
          
          
          <Route 
            path="/tasks" 
            element={
              <TasksPage 
                tasks={tasks} 
                onAddTask={handleAddTask} 
                onToggleComplete={handleToggleComplete} 
                onDeleteTask={handleDeleteTask} 
              />
            } 
          /> 

          
          <Route 
            path="/calendar" 
            element={
              <CalendarPage 
                tasks={tasks} 
                onEventDrop={handleEventDrop} 
              />
            } 
          /> 

          <Route path="/study-tools" element={<StudyTools />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;