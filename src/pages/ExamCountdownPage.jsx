import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import useExamStore from '../store/examStore';

// Components
import ExamCard from '../components/ExamCard';
import AddExamModal from '../components/AddExamModal';
import DeleteExamModal from '../components/DeleteExamModal';
import EditExamModal from '../components/EditExamModal';

export default function ExamCountdownPage() {
  const { exams } = useExamStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editExam, setEditExam] = useState(null);
  const [deleteExam, setDeleteExam] = useState(null);

  // Filter and sort exams
  const filteredAndSortedExams = useMemo(() => {
    const filtered = exams.filter(exam =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(a.examDate) - new Date(b.examDate);
    });
  }, [exams, searchQuery]);

  return (
    <>
      <div className="flex flex-col h-full p-6 bg-page-bg">
        
        {/* Page Header */}
        <div className="flex-shrink-0 bg-white p-4 mb-6 rounded-xl shadow-md border border-gray-300">
          <h1 className="text-3xl font-bold text-gray-800">Exam Countdown</h1>
        </div>

        {/* Search & Add Button */}
        <div className="flex-shrink-0 flex items-center justify-between mb-6 space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 rounded-lg font-medium text-white bg-primary-purple hover:bg-primary-light transition-colors shadow-md"
          >
            <Plus size={20} className="mr-2" />
            Add New Exam
          </button>
        </div>

        {/* Exam List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {filteredAndSortedExams.length > 0 ? (
            filteredAndSortedExams.map(exam => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onEdit={() => setEditExam(exam)} 
                onDelete={() => setDeleteExam(exam)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center pt-10">
              {searchQuery ? 'No exams found.' : 'No exams scheduled. Add one to get started!'}
            </p>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddExamModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      
      <EditExamModal
        exam={editExam}
        isOpen={!!editExam}
        onClose={() => setEditExam(null)}
      />

      <DeleteExamModal
        exam={deleteExam}
        isOpen={!!deleteExam}
        onClose={() => setDeleteExam(null)}
      />
    </>
  );
}
