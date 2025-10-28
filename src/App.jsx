// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import StudyToolsPage from "./components/StudyToolsPage";
import Profile from "./pages/Profile";
import AIAssistant from "./pages/AIAssistant";
import Login from "./pages/Login";
import PomodoroPage from "./pages/PomodoroPage"; 
import FlashcardsPage from "./pages/FlashcardsPage";
import ExamCountdownPage from './pages/ExamCountdownPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Pages with sidebar */}
        <Route
          path="/*"
          element={
            <div className="flex h-screen bg-page-bg">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/study-tools" element={<StudyToolsPage />} />
                  <Route path="/pomodoro" element={<PomodoroPage />} /> 
                  <Route path="/flashcards" element={<FlashcardsPage />} />
                  <Route path="/countdown" element={<ExamCountdownPage />} />
                  <Route path="/settings" element={<Profile />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
