import { create } from "zustand";

/**
 * Type definition for the cover image store.
 * @typedef CoverImageStore
 * @property {string} url - The URL of the cover image.
 * @property {boolean} isOpen - Boolean indicating if the cover image is open.
 * @property {Function} onOpen - Function to open the cover image editor.
 * @property {Function} onClose - Function to close the cover image editor.
 * @property {Function} onReplace - Function to replace the current cover image URL.
 */
type CoverImageStore = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

/**
 * Custom hook to manage the state of a cover image.
 * This hook utilizes Zustand for state management, providing a simple and efficient way to track and update the cover image's properties.
 *
 * @returns {CoverImageStore} The cover image store with states and handlers for opening, closing, and replacing the image.
 */
export const useCoverImage = create<CoverImageStore>((set) => ({
  // Initial state: No URL and the editor is not open.
  url: undefined,
  isOpen: false,
  // Handler to open the cover image editor and reset the URL.
  onOpen: () => set({ isOpen: true, url: undefined }),
  // Handler to close the cover image editor and reset the URL.
  onClose: () => set({ isOpen: false, url: undefined }),
  // Handler to replace the current cover image URL and open the editor.
  onReplace: (url: string) => set({ isOpen: true, url })
}));
