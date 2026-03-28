/**
 * Storage Wrapper Module
 * Handles localStorage and sessionStorage safely to avoid Safari Private Mode crashes
 * and provides an in-memory fallback if storage is disabled.
 */
const inMemoryStorage = new Map();

export const StorageWrapper = {
    /**
     * Set item safely
     */
    setItem(key, value, storageType = 'localStorage') {
        try {
            window[storageType].setItem(key, value);
        } catch (e) {
            console.warn(`[StorageWrapper] Failed to set ${key} in ${storageType}. Falling back to memory.`);
            inMemoryStorage.set(key, value);
        }
    },

    /**
     * Get item safely
     */
    getItem(key, storageType = 'localStorage') {
        try {
            return window[storageType].getItem(key) || inMemoryStorage.get(key) || null;
        } catch (e) {
            return inMemoryStorage.get(key) || null;
        }
    },

    /**
     * Remove item safely
     */
    removeItem(key, storageType = 'localStorage') {
        try {
            window[storageType].removeItem(key);
        } catch (e) {
            // Do nothing
        }
        inMemoryStorage.delete(key);
    },

    /**
     * Check if storage API is available
     */
    isAvailable(storageType = 'localStorage') {
        try {
            const testKey = '__sf_test__';
            window[storageType].setItem(testKey, testKey);
            window[storageType].removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }
};
