import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BookOpen, Zap, Brain, MoreVertical, Pin, Pencil, Trash2 } from 'lucide-react';
import useDeckStore from '../store/deckStore';

// get icon based on deck title
const getIcon = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('physic') || lowerTitle.includes('math')) {
    return <Zap className="w-8 h-8 text-primary-purple" />;
  }
  if (lowerTitle.includes('history') || lowerTitle.includes('art')) {
    return <BookOpen className="w-8 h-8 text-primary-purple" />;
  }
  return <Brain className="w-8 h-8 text-primary-purple" />;
};

export default function DeckCard({ deck, onStudy, onEdit, onDelete }) {
  const { toggleDeckPin } = useDeckStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const cardCount = deck.cards.length;

  // calculate progress
  const learnedCount = useMemo(() => {
    return deck.cards.filter(card => card.learned).length;
  }, [deck.cards]);
  
  const progressPercent = cardCount > 0 ? (learnedCount / cardCount) * 100 : 0;

  // close menu if clicked outside
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
    <div className={`relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border ${deck.isPinned ? 'border-primary-purple' : 'border-gray-200'}`}>
      
      {/* menu button */}
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button 
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
          className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
        >
          <MoreVertical size={20} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-1">
            <button 
              onClick={() => { toggleDeckPin(deck.id); setMenuOpen(false); }}
              className="flex items-center w-full px-2 py-1.5 text-sm text-left rounded hover:bg-gray-100"
            >
              <Pin size={14} className="mr-2" /> {deck.isPinned ? 'Unpin' : 'Pin'}
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
      
      {/* icon + title */}
      <div className="flex items-center space-x-4 mb-3">
        {getIcon(deck.title)}
        <h3 className="text-xl font-bold text-gray-800 pr-8">{deck.title}</h3>
      </div>
      
      {deck.description && (
        <p className="text-sm text-gray-600 mb-4">{deck.description}</p>
      )}
      
      {/* progress info */}
      <div className="flex-grow mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>{cardCount} {cardCount === 1 ? 'card' : 'cards'}</span>
          <span>{learnedCount} learned</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-primary-purple h-1.5 rounded-full transition-all" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      
      {/* study button */}
      <div className="mt-auto flex justify-end">
        <button 
          onClick={onStudy}
          className="bg-primary-purple hover:bg-primary-light text-white font-medium py-2 px-5 rounded-lg shadow-md transition duration-150"
        >
          Study Now
        </button>
      </div>
    </div>
  );
}