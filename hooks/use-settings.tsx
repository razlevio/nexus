import { create } from "zustand";

/**
 * Type definition for the settings store.
 * @typedef SettingsStore
 * @property {boolean} isOpen - Boolean indicating if the setting is open.
 * @property {Function} onOpen - Function to set isOpen to true.
 * @property {Function} onClose - Function to set isOpen to false.
 */
type SettingsStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

/**
 * Custom hook to manage settings.
 * This hook utilizes Zustand, a small, fast and scalable bearbones state-management solution.
 * @returns {SettingsStore} The settings store with isOpen state and handlers for opening and closing.
 */
export const useSettings = create<SettingsStore>((set) => ({
  // Initial state: settings are not open.
  isOpen: false,
  // Handler to open settings: sets isOpen to true.
  onOpen: () => set({ isOpen: true }),
  // Handler to close settings: sets isOpen to false.
  onClose: () => set({ isOpen: false }),
}));
