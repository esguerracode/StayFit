import { CONFIG } from './config.js';
import { StorageWrapper } from './storage.js';

/**
 * attribution module handles UTM and persistence.
 */
export const Attribution = {
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        
        CONFIG.UTM_PARAMS.forEach(param => {
            const value = urlParams.get(param);
            if (value) {
                StorageWrapper.setItem(CONFIG.STORAGE_PREFIX + param, value);
            }
        });

        if (!StorageWrapper.getItem(CONFIG.STORAGE_PREFIX + 'first_visit')) {
            StorageWrapper.setItem(CONFIG.STORAGE_PREFIX + 'first_visit', new Date().toISOString());
        }
        console.log('StayFit [Attribution]: UTM tracking initialized');
    },

    getSuffix() {
        const source = StorageWrapper.getItem(CONFIG.STORAGE_PREFIX + 'utm_source') || 'organico';
        const campaign = StorageWrapper.getItem(CONFIG.STORAGE_PREFIX + 'utm_campaign') || 'directo';
        const medium = StorageWrapper.getItem(CONFIG.STORAGE_PREFIX + 'utm_medium') || 'ninguno';
        
        return `UTM_SOURCE=${source}\nUTM_MEDIUM=${medium}\nUTM_CAMPAIGN=${campaign}`;
    }
};
