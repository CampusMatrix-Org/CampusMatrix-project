import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import useDeckStore from '../store/deckStore';
import Modal from './Modal';

export default function CreateDeckModal({ isOpen, onClose }) {
  const { addDeck } = useDeckStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([{ id: 1, front: '', back: '' }]);

  // update card text
  const handleCardChange = (id, field, value) => {
    setCards(currentCards =>
      currentCards.map(card =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  // add new card
  const handleAddCard = () => {
    setCards([...cards, { id: Date.now(), front: '', back: '' }]);
  };

  // remove card
  const handleRemoveCard = (id) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  // reset all fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCards([{ id: 1, front: '', back: '' }]);
  };

  // save new deck
  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter a deck title.');
      return;
    }

    const validCards = cards.filter(card => card.front.trim() && card.back.trim());

    if (validCards.length === 0) {
      alert('Please add at least one valid flashcard.');
      return;
    }

    addDeck({
      title,
      description,
      cards: validCards,
    });

    resetForm();
    onClose();
  };
  
  // close modal and clear
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col h-[80vh]">
        
        {/* header */}
        <div className="flex-shrink-0 flex items-center justify-between pb-4 border-b">
          <h2 className="text-2xl font-bold">Create New Deck</h2>
        </div>

        {/* body */}
        <div className="flex-1 my-6 pr-2 pl-1 overflow-y-auto">
          <div className="space-y-4">
            {/* title input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deck Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Physics 101: Key Concepts"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>

            {/* description input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="A brief description of this deck"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Flashcards</h3>
          
          {/* flashcard list */}
          <div className="space-y-3">
            {cards.map((card, index) => (
              <div key={card.id} className="p-3 border rounded-lg bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-primary-purple">{index + 1}</span>
                  {cards.length > 1 && (
                    <button onClick={() => handleRemoveCard(card.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                {/* front/back fields */}
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
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-primary-purple text-white hover:bg-primary-light font-medium"
          >
            Save Deck
          </button>
        </div>
      </div>
    </Modal>
  );
}
