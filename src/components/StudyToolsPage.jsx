import React from 'react';
import Sidebar from './Sidebar';
import StudyToolCard from './StudyToolCard';
import { useNavigate } from 'react-router-dom';

const tools = [
  { 
    title: 'Pomodoro Timer', 
    description: 'Focused Study Sessions', 
    iconName: 'Timer', 
    route: '/pomodoro' 
  },
  { 
    title: 'Flashcards', 
    description: 'Create & Review Decks', 
    iconName: 'Zap', 
    route: '/flashcards' 
  },
  { 
    title: 'Personal Library', 
    description: 'Organize Your Materials', 
    iconName: 'BookOpen', 
    route: '/library' 
  },
  { 
    title: 'Exam Countdown', 
    description: 'Visualize Deadlines & Study', 
    iconName: 'Clock3', 
    route: '/countdown' 
  },
];

const StudyToolsPage = () => {
  const navigate = useNavigate(); // navigation hook

  const handleToolLaunch = (route) => {
    console.log(`Navigating to: ${route}`);
    navigate(route); // go to the selected tool page
  };

  return (
    <main className="flex-1 p-6 flex flex-col">
      {/* Page title */}
      <div className="bg-white p-4 mb-6 rounded-xl shadow-md border border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800">Study Tools</h1>
      </div>

      {/* Tool cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 min-h-[35rem]">
        {tools.map((tool) => (
          <StudyToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            iconName={tool.iconName}
            onLaunch={() => handleToolLaunch(tool.route)}
          />
        ))}
      </div>
    </main>
  );
};

export default StudyToolsPage;
