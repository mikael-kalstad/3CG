import { configurePersist } from 'zustand-persist';
import { useStorageStore } from '../Store';

// Persist is a middleware for storing global store in localStorage (or other storage)
// Purge will remove all data from localStorage
const { persist, purge } = configurePersist({
  storage: localStorage,
});

export default persist;
export { purge };
