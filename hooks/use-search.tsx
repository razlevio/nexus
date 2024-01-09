import { create } from "zustand";

/**
 * Type definition for the search store.
 * @typedef SearchStore
 * @property {boolean} isOpen - Boolean indicating if the search is open.
 * @property {Function} onOpen - Function to set isOpen to true.
 * @property {Function} onClose - Function to set isOpen to false.
 * @property {Function} toggle - Function to toggle the isOpen state.
 */
type SearchStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

/**
 * Custom hook to manage search UI state.
 * This hook utilizes Zustand, a small, fast and scalable bearbones state-management solution.
 * It provides a simple API to open, close, and toggle the search UI's visibility.
 *
 * @returns {SearchStore} The search store with isOpen state and handlers for opening, closing, and toggling.
 */
export const useSearch = create<SearchStore>((set, get) => ({ 
  // Initial state: search UI is not open.
  isOpen: false,
  // Handler to open the search UI: sets isOpen to true.
  onOpen: () => set({ isOpen: true }),
  // Handler to close the search UI: sets isOpen to false.
  onClose: () => set({ isOpen: false }),
  // Handler to toggle the search UI's visibility.
  toggle: () => set({ isOpen: !get().isOpen }),
}));
