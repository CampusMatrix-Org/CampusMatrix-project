

import React, { useState } from 'react';

const NewTaskForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState(''); 
  const [isHighPriority, setIsHighPriority] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Please fill out at least a title and a due date.');
      return;
    }


    onSubmit({
      title,
      subject,
      dueDate, 
      isHighPriority,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-purple focus:ring-primary-purple"
          placeholder="e.g., Finish Math Homework"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-purple focus:ring-primary-purple"
            placeholder="e.g., Physics 101"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-purple focus:ring-primary-purple"
            required
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="highPriority"
          type="checkbox"
          checked={isHighPriority}
          onChange={(e) => setIsHighPriority(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary-purple focus:ring-primary-purple"
        />
        <label htmlFor="highPriority" className="ml-2 block text-sm text-gray-900">
          High Priority
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary-purple rounded-md shadow-sm hover:bg-purple-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default NewTaskForm;