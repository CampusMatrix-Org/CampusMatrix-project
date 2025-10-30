// src/pages/StudyTools.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder data for the cards
const tools = [
  { name: 'Pomo... Timer', link: '#' },
  { name: 'Flashcards', link: '#' },
  { name: 'Personal Library', link: '/study-tools/personal-library' }, // The link to your page
  { name: 'Exam Countdown', link: '#' },
];

const StudyTools = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-8">Study Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.name} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-48">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{tool.name}</h2>
              <p className="text-gray-600">Tool description...</p>
            </div>
            <Link
              to={tool.link}
              className="bg-primary-purple text-white font-semibold py-2 px-4 rounded-lg self-start hover:bg-primary-purple/90"
            >
              Launch
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyTools;
