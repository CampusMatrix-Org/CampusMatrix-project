import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import useExamStore from '../store/examStore';

// get today's date for date picker
const getTodayString = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - (offset*60*1000));
  return localToday.toISOString().split('T')[0];
};

export default function EditExamModal({ exam, isOpen, onClose }) {
  const { editExam } = useExamStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [examDate, setExamDate] = useState('');
  const [studyProgress, setStudyProgress] = useState(0);

  // pre-fill form when modal opens
  useEffect(() => {
    if (exam) {
      setTitle(exam.title);
      setDescription(exam.description || '');
      setExamDate(exam.examDate);
      setStudyProgress(exam.studyProgress || 0);
    }
  }, [exam, isOpen]);

  // save changes
  const handleSubmit = () => {
    if (!title.trim() || !examDate) {
      alert('Please fill in both the Exam Title and the Exam Date.');
      return;
    }
    
    editExam(exam.id, {
      title,
      description,
      examDate,
      studyProgress: Number(studyProgress),
    });
    
    onClose();
  };

  // hide modal if not open
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold mb-6">Edit Exam</h3>
      
      <div className="space-y-4">
        {/* title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exam Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>

        {/* date */}
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
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>

        {/* study progress */}
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
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-primary-purple text-white hover:bg-primary-light font-medium"
        >
          Save Changes
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
