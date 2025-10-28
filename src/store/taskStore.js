// src/store/taskStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Task store
const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [
        { id: 1, title: 'Finish React component', completed: false, pomodoros: 0, priority: 'high', isPinned: true },
        { id: 2, title: 'Read documentation for Zustand', completed: false, pomodoros: 0, priority: 'medium', isPinned: false },
        { id: 3, title: 'Test the new features', completed: false, pomodoros: 0, priority: 'none', isPinned: false },
      ],
      activeTaskId: null,

      // Actions
      setActiveTaskId: (id) => set({ activeTaskId: id }),

      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: Date.now(), title, completed: false, pomodoros: 0, priority: 'none', isPinned: false },
          ],
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      
      renameTask: (id, newTitle) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title: newTitle } : task
          ),
        })),
      
      setTaskPriority: (id, priority) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, priority } : task
          ),
        })),

      toggleTaskPin: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isPinned: !task.isPinned } : task
          ),
        })),
        
      incrementPomodoros: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, pomodoros: task.pomodoros + 1 } : task
          ),
        })),
    }),
    {
      name: 'campusmatrix-task-storage',
    }
  )
);

export default useTaskStore;
