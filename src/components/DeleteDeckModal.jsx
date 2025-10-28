import React from 'react';
import Modal from './Modal';
import useDeckStore from '../store/deckStore';

export default function DeleteDeckModal({ deck, isOpen, onClose }) {
  const { deleteDeck } = useDeckStore();

  // handle deck delete
  const handleDelete = () => {
    deleteDeck(deck.id);
    onClose();
  };

  // hide modal if not open
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-2">Delete Deck?</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete the deck "
        <span className="font-medium">{deck.title}</span>"? All {deck.cards.length}{' '}
        cards inside it will be permanently lost.
      </p>

      {/* buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
