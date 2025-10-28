import React from 'react';
import { Lightbulb, Clock, BookOpen, CalendarCheck, Timer, Zap, LayoutGrid, Clock3 } from 'lucide-react'; 

const iconMap = {
  Timer: Timer,       // Pomodoro Timer
  Zap: Zap,           // Flashcards
  BookOpen: BookOpen, // Personal Library
  Clock3: Clock3,     // Exam Countdown
};

const StudyToolCard = ({ title, description, iconName, onLaunch }) => {
  const IconComponent = iconMap[iconName];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 w-full flex flex-col h-full border border-gray-300">
      
      {/* Icon and title */}
      <div className="flex items-center space-x-4 mb-4">
        {IconComponent && (
          <IconComponent className="w-12 h-12 text-primary-purple" />
        )}
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      </div>
      
      {/* Description */}
      <p className="text- mb-6 flex-grow">{description}</p>
      
      {/* Launch button */}
      <div className="mt-auto flex justify-end">
        <button 
          onClick={onLaunch}
          className="
            bg-primary-purple 
            hover:bg-primary-light 
            text-white 
            font-medium 
            py-2 
            px-5 
            rounded-lg 
            shadow-md 
            transition 
            duration-150
            focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-offset-2
          "
        >
          Launch
        </button>
      </div>
    </div>
  );
};

export default StudyToolCard;
