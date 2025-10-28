import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import useTaskStore from '../store/taskStore';

const ALARM_SOUND_PATH = '/alarm.mp3';

export default function PomodoroTimer() {
  const { activeTaskId, incrementPomodoros, tasks } = useTaskStore();

  // timer settings
  const [settings, setSettings] = useState({ work: 25, short: 5, long: 15 });
  const [mode, setMode] = useState('work');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const totalTime = useMemo(() => settings[mode] * 60, [settings, mode]);
  const [timeLeft, setTimeLeft] = useState(totalTime);

  const alarmRef = useRef(null);
  const activeTask = tasks.find(task => task.id === activeTaskId);

  // reset timer
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(settings[mode] * 60);
  }, [settings, mode]);

  // reset timer when mode changes
  useEffect(() => {
    resetTimer();
  }, [totalTime, resetTimer]);

  // countdown logic
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      if(mode === 'work' && activeTaskId) {
        incrementPomodoros(activeTaskId);
      }
      alarmRef.current?.play();
      resetTimer();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, activeTaskId, incrementPomodoros, resetTimer]);

  const handleModeChange = (newMode) => setMode(newMode);

  const percentage = ((totalTime - timeLeft) / totalTime) * 100;
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  const modeButtons = [
    { key: 'work', label: 'Pomodoro' },
    { key: 'short', label: 'Short Break' },
    { key: 'long', label: 'Long Break' },
  ];

  return (
    <div className="w-full max-w-sm flex flex-col items-center space-y-8">
      <audio ref={alarmRef} src={ALARM_SOUND_PATH} preload="auto" />

      {/* mode selector */}
      <div className="bg-primary-purple/10 p-1.5 rounded-full flex space-x-2">
        {modeButtons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleModeChange(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              mode === key ? 'bg-primary-purple text-white shadow' : 'text-primary-purple hover:bg-primary-purple/20'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* timer circle */}
      <div className="w-64 h-64">
        <CircularProgressbarWithChildren
          value={percentage}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: '#8b5cf6',
            trailColor: '#ede9fe',
            pathTransitionDuration: 0.5,
          })}
        >
          <div className="text-center">
            <p className="text-5xl font-bold">{`${minutes}:${seconds}`}</p>
            <p className="text-gray-500 mt-1 truncate">
              {isRunning ? (activeTask ? activeTask.title : 'Focus!') : 'Paused'}
            </p>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      {/* controls */}
      <div className="relative w-full flex justify-center">
        <div className="flex items-center space-x-6">
          <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="p-3 text-gray-500 hover:text-primary-purple transition-colors">
            <Settings size={24} />
          </button>

          <button 
            onClick={() => setIsRunning(!isRunning)} 
            className="bg-primary-purple text-white w-28 h-12 rounded-lg font-bold text-lg shadow-lg hover:bg-primary-light transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>

          <button onClick={resetTimer} className="p-3 text-gray-500 hover:text-primary-purple transition-colors">
            <RotateCcw size={24} />
          </button>
        </div>

        {/* settings panel */}
        {isSettingsOpen && (
          <div className="absolute bottom-full mb-4 w-full max-w-xs bg-white p-4 rounded-lg shadow-xl border space-y-3">
            {['work', 'short', 'long'].map((key) => (
              <div key={key} className="flex justify-between items-center text-sm">
                <span>{key === 'work' ? 'Pomodoro' : key === 'short' ? 'Short Break' : 'Long Break'}</span>
                <input 
                  type="number" 
                  value={settings[key]} 
                  onChange={(e) => setSettings({...settings, [key]: Number(e.target.value)})} 
                  className="w-16 p-1 border rounded text-center" 
                />
                <span>min</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
