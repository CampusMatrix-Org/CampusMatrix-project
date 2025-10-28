import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import useDeckStore from '../store/deckStore';

// Components
import DeckCard from '../components/DeckCard';
import CreateDeckModal from '../components/CreateDeckModal';
import StudyModal from '../components/StudyModal';
import DeleteDeckModal from '../components/DeleteDeckModal';
import EditDeckModal from '../components/EditDeckModal';

export default function FlashcardsPage() {
  const { decks } = useDeckStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [studyDeck, setStudyDeck] = useState(null);
  const [deleteDeck, setDeleteDeck] = useState(null);
  const [editDeck, setEditDeck] = useState(null);

  // Filter and sort decks
  const filteredAndSortedDecks = useMemo(() => {
    const filtered = decks.filter(deck =>
      deck.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [decks, searchQuery]);

  return (
    <>
      <div className="flex flex-col h-full p-6 bg-page-bg">
        
        {/* Page Header */}
        <div className="flex-shrink-0 bg-white p-4 mb-6 rounded-xl shadow-md border border-gray-300">
          <h1 className="text-3xl font-bold text-gray-800">Flashcards</h1>
        </div>

        {/* Search & Buttons */}
        <div className="flex-shrink-0 flex items-center justify-between mb-6 space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search decks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button className="px-4 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors">
            Community Decks
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2 rounded-lg font-medium text-white bg-primary-purple hover:bg-primary-light transition-colors shadow-md"
          >
            <Plus size={20} className="mr-2" />
            Create New Deck
          </button>
        </div>

        {/* Deck Grid */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDecks.length > 0 ? (
              filteredAndSortedDecks.map(deck => (
                <DeckCard 
                  key={deck.id} 
                  deck={deck} 
                  onStudy={() => setStudyDeck(deck)}
                  onEdit={() => setEditDeck(deck)}
                  onDelete={() => setDeleteDeck(deck)}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                {searchQuery ? 'No decks found. Try a different search.' : 'Create a new deck to get started!'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateDeckModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      
      {studyDeck && (
        <StudyModal 
          deck={studyDeck} 
          onClose={() => setStudyDeck(null)} 
        />
      )}
      
      <DeleteDeckModal 
        deck={deleteDeck}
        isOpen={!!deleteDeck}
        onClose={() => setDeleteDeck(null)}
      />
      
      <EditDeckModal
        deck={editDeck}
        isOpen={!!editDeck}
        onClose={() => setEditDeck(null)}
      />
    </>
  );
}
