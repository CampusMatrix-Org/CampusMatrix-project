import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Exam store
const useExamStore = create(
  persist(
    (set) => ({
      exams: [
        {
          id: 1,
          title: 'Physics 101 Midterm',
          description: 'CH1-5 & Labs',
          examDate: '2025-11-15',
          isPinned: true,
          studyProgress: 20,
          createdAt: '2025-10-25T10:00:00Z',
        },
        {
          id: 2,
          title: 'History Seminar Final Paper',
          description: 'Essay on Cold War',
          examDate: '2025-11-20',
          isPinned: false,
          studyProgress: 80,
          createdAt: '2025-10-26T12:00:00Z',
        },
      ],

      // Exam actions
      addExam: (examData) =>
        set((state) => ({
          exams: [
            {
              ...examData,
              id: Date.now(),
              isPinned: false,
              studyProgress: examData.studyProgress || 0,
              createdAt: new Date().toISOString(),
            },
            ...state.exams,
          ],
        })),

      deleteExam: (id) =>
        set((state) => ({
          exams: state.exams.filter((exam) => exam.id !== id),
        })),
        
      editExam: (id, updatedData) =>
        set((state) => ({
          exams: state.exams.map((exam) =>
            exam.id === id ? { ...exam, ...updatedData } : exam
          ),
        })),
        
      toggleExamPin: (id) =>
        set((state) => ({
          exams: state.exams.map((exam) =>
            exam.id === id ? { ...exam, isPinned: !exam.isPinned } : exam
          ),
        })),
    }),
    {
      name: 'campusmatrix-exam-storage',
    }
  )
);

export default useExamStore;
