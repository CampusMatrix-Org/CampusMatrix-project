import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Modal from './Modal';
import useDeckStore from '../store/deckStore';

export default function RenameDeckModal({ deck, isOpen, onClose }) {
  const { renameDeck, updateDeckCards } = useDeckStore();

  // deck info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // cards list
  const [cards, setCards] = useState([]);

  // load data when modal opens
  useEffect(() => {
    if (deck) {
      setTitle(deck.title);
      setDescription(deck.description || '');
      setCards(deck.cards || []);
    }
  }, [deck, isOpen]);

  // handle card change
  const handleCardChange = (id, field, value) => {
    setCards(currentCards =>
      currentCards.map(card =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  // add new card
  const handleAddCard = () => {
    setCards([
      ...cards,
      { id: Date.now(), front: '', back: '', learned: false }
    ]);
  };

  // remove a card
  const handleRemoveCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  // save changes
  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter a deck title.');
      return;
    }

    const validCards = cards.filter(card => card.front.trim() && card.back.trim());
    renameDeck(deck.id, title, description);
    updateDeckCards(deck.id, validCards);
    onClose();
  };

  // hide modal if not open
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-[80vh]">
        
        {/* header */}
        <div className="flex-shrink-0 flex items-center justify-between pb-4 border-b">
          <h2 className="text-2xl font-bold">Edit Deck</h2>
        </div>

        {/* body */}
        <div className="flex-1 my-6 pr-2 pl-1 overflow-y-auto">

          {/* deck info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deck Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>
          </div>
          
          <div className="border-t my-6"></div>

          {/* flashcards section */}
          <h3 className="text-lg font-semibold mb-3">Flashcards</h3>
          
          <div className="space-y-3">
            {cards.map((card, index) => (
              <div key={card.id} className="p-3 border rounded-lg bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-primary-purple">{index + 1}</span>
                  <button onClick={() => handleRemoveCard(card.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <textarea
                    value={card.front}
                    onChange={(e) => handleCardChange(card.id, 'front', e.target.value)}
                    rows={3}
                    placeholder="Front"
                    className="w-full p-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-purple"
                  />
                  <textarea
                    value={card.back}
                    onChange={(e) => handleCardChange(card.id, 'back', e.target.value)}
                    rows={3}
                    placeholder="Back"
                    className="w-full p-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-purple"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* add card button */}
          <button
            onClick={handleAddCard}
            className="flex items-center w-full justify-center mt-4 px-4 py-2 rounded-lg font-medium text-primary-purple border-2 border-dashed border-primary-purple hover:bg-primary-purple/10 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add Another Card
          </button>
        </div>

        {/* footer */}
        <div className="flex-shrink-0 flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-primary-purple text-white hover:bg-primary-light font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
