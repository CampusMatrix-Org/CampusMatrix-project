import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import useDeckStore from '../store/deckStore';

const cardVariants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};

export default function StudyModal({ deck, onClose }) {
  const { toggleCardLearned } = useDeckStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const currentCard = deck.cards[currentIndex];

  // Mark as learned when flipped
  useEffect(() => {
    if (isFlipped && !currentCard.learned) {
      toggleCardLearned(deck.id, currentCard.id);
    }
  }, [isFlipped, currentCard, deck.id, toggleCardLearned]);
  
  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.cards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.cards.length) % deck.cards.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col p-6 bg-page-bg/90 backdrop-blur-md">
      
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{deck.title}</h2>
        <button 
          onClick={onClose}
          className="p-2 text-gray-600 bg-white/50 rounded-full hover:bg-white hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div 
          className="w-full max-w-2xl h-80 cursor-pointer" 
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
            initial="front" 
            animate={isFlipped ? 'back' : 'front'}
            transition={{ duration: 0.6 }}
            variants={cardVariants} 
          >
            {/* Front */}
            <motion.div 
              className="absolute w-full h-full p-6 bg-white rounded-2xl shadow-xl border flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <p className="text-3xl font-semibold text-center">{currentCard.front}</p>
            </motion.div>
            
            {/* Back */}
            <motion.div 
              className="absolute w-full h-full p-6 bg-white rounded-2xl shadow-xl border flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              {currentCard.learned && (
                <CheckCircle className="absolute top-4 right-4 text-green-500" />
              )}
              <p className="text-2xl text-center">{currentCard.back}</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Card index */}
        <p className="mt-4 text-lg font-medium text-gray-700">
          Card {currentIndex + 1} of {deck.cards.length}
        </p>
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 flex items-center justify-center space-x-8">
        <button 
          onClick={prevCard} 
          className="p-4 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-primary-light hover:text-white transition-all"
        >
          <ArrowLeft size={28} />
        </button>
        <button 
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-8 py-4 bg-primary-purple text-white rounded-full shadow-lg text-lg font-semibold hover:bg-primary-light transition-all"
        >
          {isFlipped ? 'Show Front' : 'Flip to Back'}
        </button>
        <button 
          onClick={nextCard} 
          className="p-4 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-primary-light hover:text-white transition-all"
        >
          <ArrowRight size={28} />
        </button>
      </div>
    </div>
  );
}
