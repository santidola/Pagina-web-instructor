/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Abstracts key-value persistence so hooks and components depend on a storage
 * interface rather than directly coupling to window.localStorage.
 */

export function createBrowserStorageService(storage = typeof window !== 'undefined' ? window.localStorage : null) {
  return {
    get(key, fallbackValue = null) {
      if (!storage) return fallbackValue;
      try {
        const raw = storage.getItem(key);
        return raw !== null ? JSON.parse(raw) : fallbackValue;
      } catch {
        return fallbackValue;
      }
    },
    set(key, value) {
      if (!storage) return;
      try {
        storage.setItem(key, JSON.stringify(value));
      } catch {
        // Ignore storage quota or private mode errors
      }
    }
  };
}
