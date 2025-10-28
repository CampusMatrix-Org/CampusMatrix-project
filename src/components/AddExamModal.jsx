import React, { useState } from 'react';
import Modal from './Modal';
import useExamStore from '../store/examStore';

// get today's date in yyyy-mm-dd format
const getTodayString = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - (offset * 60 * 1000));
  return localToday.toISOString().split('T')[0];
};

export default function AddExamModal({ isOpen, onClose }) {
  const { addExam } = useExamStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [examDate, setExamDate] = useState('');
  const [studyProgress, setStudyProgress] = useState(0);

  // clear all inputs
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setExamDate('');
    setStudyProgress(0);
  };

  // close modal and reset
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // when save button is clicked
  const handleSubmit = () => {
    if (!title.trim() || !examDate) {
      alert('Please fill in both the Exam Title and the Exam Date.');
      return;
    }
    
    addExam({
      title,
      description,
      examDate,
      studyProgress: Number(studyProgress),
    });
    
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h3 className="text-2xl font-bold mb-6">Add New Exam</h3>
      
      <div className="space-y-4">
        {/* exam title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exam Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Physics 101 Midterm"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>

        {/* exam date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exam Date
          </label>
          <input
            type="date"
            value={examDate}
            min={getTodayString()}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>

        {/* description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="e.g., Chapters 1-5 & Labs"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>

        {/* progress slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Study Progress ({studyProgress}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={studyProgress}
            onChange={(e) => setStudyProgress(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb-primary-purple"
          />
        </div>
      </div>

      {/* footer buttons */}
      <div className="flex-shrink-0 flex justify-end space-x-3 pt-6 mt-4 border-t">
        <button
          onClick={handleClose}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-primary-purple text-white hover:bg-primary-light font-medium"
        >
          Save Exam
        </button>
      </div>

      {/* slider thumb color */}
      <style>
      {`
        .range-thumb-primary-purple::-webkit-slider-thumb {
          background-color: #6b21a8;
        }
        .range-thumb-primary-purple::-moz-range-thumb {
          background-color: #6b21a8;
        }
      `}
      </style>
    </Modal>
  );
}