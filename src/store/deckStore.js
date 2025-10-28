import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Deck & Card store
const useDeckStore = create(
  persist(
    (set) => ({
      decks: [
        {
          id: 1,
          title: 'Physics 101: Key Concepts',
          description: 'Basics of Newtonian physics.',
          createdAt: new Date('2025-10-25T10:00:00Z').toISOString(),
          isPinned: true,
          cards: [
            { id: 1, front: 'What is Force?', back: 'Mass x Acceleration', learned: true },
            { id: 2, front: 'What is a newton?', back: 'The unit of force (kg⋅m/s²)', learned: false },
          ],
        },
        {
          id: 2,
          title: 'History Seminar: Cold War',
          description: 'Key events and figures from 1947-1991.',
          createdAt: new Date('2025-10-26T12:00:00Z').toISOString(),
          isPinned: false,
          cards: [
            { id: 1, front: 'What was the "Iron Curtain"?', back: 'A political boundary...', learned: false },
          ],
        }
      ],

      // Deck actions
      addDeck: (newDeckData) =>
        set((state) => ({
          decks: [
            {
              ...newDeckData,
              id: Date.now(),
              createdAt: new Date().toISOString(),
              isPinned: false,
              cards: newDeckData.cards.map(card => ({ ...card, id: Date.now() + Math.random(), learned: false })),
            },
            ...state.decks,
          ],
        })),

      deleteDeck: (deckId) =>
        set((state) => ({
          decks: state.decks.filter((deck) => deck.id !== deckId),
        })),
        
      renameDeck: (deckId, newTitle, newDescription) =>
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId ? { ...deck, title: newTitle, description: newDescription } : deck
          ),
        })),
        
      toggleDeckPin: (deckId) =>
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId ? { ...deck, isPinned: !deck.isPinned } : deck
          ),
        })),

      // Card actions
      toggleCardLearned: (deckId, cardId) =>
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId
              ? {
                  ...deck,
                  cards: deck.cards.map((card) =>
                    card.id === cardId ? { ...card, learned: !card.learned } : card
                  ),
                }
              : deck
          ),
        })),
        
      updateDeckCards: (deckId, newCards) =>
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId ? { ...deck, cards: newCards } : deck
          ),
        })),
        
    }),
    {
      name: 'campusmatrix-deck-storage',
    }
  )
);

export default useDeckStore;
