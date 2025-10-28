import React, { useState, useRef, useEffect, useMemo } from 'react';
import useTaskStore from '../store/taskStore';
import Modal from './Modal';
import { Plus, MoreVertical, Trash2, Pencil, Pin, Flag, Check } from 'lucide-react';

const priorityConfig = {
  high: { label: 'High Priority', color: 'text-red-500', bg: 'bg-red-500/10' },
  medium: { label: 'Medium Priority', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  low: { label: 'Low Priority', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  none: { label: 'No Priority', color: 'text-gray-500', bg: 'hover:bg-gray-100' },
};

// Task item component
const TaskItem = ({ task }) => {
  const { deleteTask, renameTask, setTaskPriority, toggleTaskPin, activeTaskId, setActiveTaskId } = useTaskStore();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [priorityMenuOpen, setPriorityMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const menuRef = useRef(null);
  const isActive = task.id === activeTaskId;

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setPriorityMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRename = () => {
    if (newTitle.trim()) renameTask(task.id, newTitle.trim());
    setIsEditing(false);
    setMenuOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteTask(task.id);
    setDeleteModalOpen(false);
  };
  
  const taskPriorityStyle = priorityConfig[task.priority] || priorityConfig.none;

  return (
    <>
      <div
        onClick={() => setActiveTaskId(task.id)}
        className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors duration-150 group ${isActive ? 'bg-primary-purple/10' : taskPriorityStyle.bg}`}
      >
        <div className="flex items-center gap-3 w-full truncate">
          {task.isPinned && <Pin size={14} className="text-gray-600 flex-shrink-0" />}
          {isEditing ? (
            <input 
              type="text" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
              onBlur={handleRename} 
              onKeyDown={(e) => e.key === 'Enter' && handleRename()} 
              autoFocus 
              className="w-full bg-transparent outline-none ring-1 ring-primary-purple rounded px-1" 
            />
          ) : (
            <span className={`font-medium truncate ${isActive ? 'text-primary-purple' : ''}`}>{task.title}</span>
          )}
        </div>

        <div className="relative flex-shrink-0" ref={menuRef}>
          <button onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }} className={`p-1 rounded-full group-hover:bg-gray-200/50 ${menuOpen ? 'bg-gray-200/50' : ''}`}>
            <MoreVertical size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-1">
              <button onClick={() => { setIsEditing(true); setMenuOpen(false); }} className="flex items-center w-full px-2 py-1.5 text-sm text-left rounded hover:bg-gray-100"> <Pencil size={14} className="mr-2" /> Rename </button>
              <button onClick={() => { toggleTaskPin(task.id); setMenuOpen(false); }} className="flex items-center w-full px-2 py-1.5 text-sm text-left rounded hover:bg-gray-100"> <Pin size={14} className="mr-2" /> {task.isPinned ? 'Unpin' : 'Pin'} </button>
              
              <div className="relative">
                 <button onClick={(e) => { e.stopPropagation(); setPriorityMenuOpen(!priorityMenuOpen); }} className="flex items-center w-full px-2 py-1.5 text-sm text-left rounded hover:bg-gray-100"> <Flag size={14} className="mr-2" /> Priority </button>
                 {priorityMenuOpen && (
                    <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-1">
                      {Object.entries(priorityConfig).map(([key, { label, color }]) => (
                        <button key={key} onClick={() => { setTaskPriority(task.id, key); setPriorityMenuOpen(false); setMenuOpen(false); }} className={`flex items-center justify-between w-full px-2 py-1.5 text-sm text-left rounded hover:bg-gray-100 ${color}`}>
                           <span>{label}</span> {task.priority === key && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                 )}
              </div>

              <div className="border-t my-1 border-gray-400"></div>
              <button onClick={() => { setDeleteModalOpen(true); setMenuOpen(false); }} className="flex items-center w-full px-2 py-1.5 text-sm text-left text-red-600 rounded hover:bg-red-50"> <Trash2 size={14} className="mr-2" /> Delete </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-2">Delete Task?</h3>
        <p className="text-gray-600 mb-6">This will permanently delete the task "<span className="font-medium">{task.title}</span>".</p>
        <div className="flex justify-end space-x-3">
          <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium">Cancel</button>
          <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium">Delete</button>
        </div>
      </Modal>
    </>
  );
};

// Main Sidebar component
export default function TaskSidebar({ isOpen }) {
  const { tasks, addTask } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };
  
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter(task => {
      if (filter === 'all') return true;
      return task.priority === filter;
    });
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.id - a.id;
    });
  }, [tasks, filter]);

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' },
  ];

  return (
    <aside className={`bg-white flex flex-col transition-all duration-300 ease-in-out rounded-2xl shadow-md border overflow-hidden ${isOpen ? 'w-72' : 'w-0'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Tasks</h2>
        <p className="text-sm text-gray-900">Select a task to focus on.</p>
      </div>

      {/* Add task input */}
      <div className="p-3 border-b border-gray-400">
        <div className="flex items-center space-x-2 border border-gray-600 rounded-lg p-2 focus-within:ring-2 focus-within:ring-primary-purple">
          <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTask()} placeholder="Add a new task..." className="w-full bg-transparent outline-none"/>
          <button onClick={handleAddTask} className="p-1.5 bg-primary-purple text-white rounded-md hover:bg-primary-light transition-colors"><Plus size={20} /></button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="p-3 border-b border-gray-400">
        <div className="flex space-x-2">
            {filterTabs.map(tab => (
              <button key={tab.id} onClick={() => setFilter(tab.id)} className={`px-3 py-1 text-sm font-medium rounded-full ${filter === tab.id ? 'bg-primary-purple text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                {tab.label}
              </button>
            ))}
        </div>
      </div>

      {/* Task list */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {filteredAndSortedTasks.length > 0 ? (
          filteredAndSortedTasks.map(task => <TaskItem key={task.id} task={task} />)
        ) : (
          <p className="text-center text-gray-500 p-4">No tasks in this category.</p>
        )}
      </nav>
    </aside>
  );
}
