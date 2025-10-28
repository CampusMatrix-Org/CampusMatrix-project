import React, { useState, useRef, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MoreVertical, Pin, Pencil, Trash2 } from 'lucide-react';
import useExamStore from '../store/examStore';

// parse date string and set to midnight
const getMidnight = (dateStr) => {
  let date;
  if (dateStr && dateStr.length === 10 && dateStr.includes('-')) {
    date = new Date(dateStr + 'T00:00:00'); 
  } else {
    date = new Date(dateStr); 
  }
  date.setHours(0, 0, 0, 0);
  return date;
};

// calculate % of time passed since creation
function calculateProgress(createdAtStr, examDateStr) {
  const creationDate = getMidnight(createdAtStr || new Date().toISOString());
  const examDate = getMidnight(examDateStr);
  const today = getMidnight(new Date());

  const totalDuration = examDate.getTime() - creationDate.getTime();
  const timePassed = today.getTime() - creationDate.getTime();

  if (totalDuration <= 0) return 100; 
  if (timePassed <= 0) return 0;   

  const percentage = (timePassed / totalDuration) * 100;
  return Math.min(100, Math.max(0, percentage)); 
}

// calculate number of days left
function calculateDaysLeft(examDateStr) {
  const examDate = getMidnight(examDateStr);
  const today = getMidnight(new Date());
  const diffTime = examDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 0 ? 0 : diffDays;
}

// format YYYY-MM-DD to readable date
function formatDate(examDateStr) {
  const date = new Date(examDateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Main Component 
export default function ExamCard({ exam, onEdit, onDelete }) {
  const { toggleExamPin } = useExamStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const days = calculateDaysLeft(exam.examDate);
  const progressPercent = calculateProgress(exam.createdAt, exam.examDate);
  const studyProgress = exam.studyProgress;
  const formattedDate = formatDate(exam.examDate);

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative bg-white p-4 pr-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center border ${exam.isPinned ? 'border-primary-purple' : 'border-gray-200'}`}>
      
      {/* menu button */}
      <div className="absolute top-2 right-2 z-10" ref={menuRef}>
        <button 
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
          className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
        >
          <MoreVertical size={18} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-1">
            <button 
              onClick={() => { toggleExamPin(exam.id); setMenuOpen(false); }}
              className="flex items-center w-full px-2 py-1.5 text-sm text-left rounded hover:bg-gray-100"
            >
              <Pin size={14} className="mr-2" /> {exam.isPinned ? 'Unpin' : 'Pin'}
            </button>
            <button 
              onClick={() => { onEdit(); setMenuOpen(false); }}
              className="flex items-center w-full px-2 py-1.5 text-sm text-left rounded hover:bg-gray-100"
            >
              <Pencil size={14} className="mr-2" /> Edit
            </button>
            <div className="border-t my-1"></div>
            <button 
              onClick={() => { onDelete(); setMenuOpen(false); }}
              className="flex items-center w-full px-2 py-1.5 text-sm text-left text-red-600 rounded hover:bg-red-50"
            >
              <Trash2 size={14} className="mr-2" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* exam info */}
      <div className="flex-1 space-y-1 pr-4">
        <h3 className="text-lg font-bold text-gray-800 pr-8">{exam.title}</h3>
        <p className="text-sm font-medium text-gray-600">{formattedDate}</p>
        <p className="text-sm text-gray-500">{exam.description}</p>
        
        {/* study progress bar */}
        <div className="pt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-primary-purple h-1.5 rounded-full transition-all" 
              style={{ width: `${studyProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* countdown circle */}
      <div className="flex-shrink-0 w-20 h-20 ml-auto">
        <CircularProgressbarWithChildren
          value={progressPercent}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: '#6b21a8',
            trailColor: '#e5e7eb',
          })}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-purple">{days}</p>
            <p className="text-xs font-medium text-gray-600 -mt-1">Days Left</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
