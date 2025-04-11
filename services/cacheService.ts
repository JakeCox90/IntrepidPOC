/**
 * Cache Service
 * 
 * This service provides a global caching mechanism for the application.
 * It allows components to cache and retrieve data to avoid unnecessary loading states
 * when returning to previously viewed content.
 */

// Define the cache structure
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// Create a cache object to store data
const cache: Record<string, CacheItem<any>> = {};

// Default cache expiration time (24 hours)
const DEFAULT_EXPIRATION = 24 * 60 * 60 * 1000;

// Debug flag - set to true to enable debug logging
const DEBUG = false;

/**
 * Store data in the cache
 * @param key - Unique identifier for the cached data
 * @param data - The data to cache
 * @param expiration - Optional expiration time in milliseconds
 */
export const setCache = <T>(key: string, data: T, expiration: number = DEFAULT_EXPIRATION): void => {
  if (!key) {
    console.warn('CacheService: Attempted to set cache with empty key');
    return;
  }
  
  if (DEBUG) {
    console.log(`CacheService: Setting cache for key "${key}"`, data);
  }
  
  cache[key] = {
    data,
    timestamp: Date.now() + expiration,
  };
};

/**
 * Retrieve data from the cache
 * @param key - Unique identifier for the cached data
 * @returns The cached data or null if not found or expired
 */
export const getCache = <T>(key: string): T | null => {
  if (!key) {
    return null;
  }
  
  const item = cache[key];
  
  if (!item) {
    if (DEBUG) {
      console.log(`CacheService: Cache miss for key "${key}"`);
    }
    return null;
  }
  
  // Check if the cache item has expired
  if (Date.now() > item.timestamp) {
    if (DEBUG) {
      console.log(`CacheService: Cache expired for key "${key}"`);
    }
    // Remove expired item
    delete cache[key];
    return null;
  }
  
  if (DEBUG) {
    console.log(`CacheService: Cache hit for key "${key}"`, item.data);
  }
  
  return item.data as T;
};

/**
 * Check if data exists in the cache and is not expired
 * @param key - Unique identifier for the cached data
 * @returns True if the data exists and is not expired
 */
export const hasCache = (key: string): boolean => {
  return getCache(key) !== null;
};

/**
 * Remove data from the cache
 * @param key - Unique identifier for the cached data
 */
export const removeCache = (key: string): void => {
  if (DEBUG) {
    console.log(`CacheService: Removing cache for key "${key}"`);
  }
  delete cache[key];
};

/**
 * Clear all data from the cache
 */
export const clearCache = (): void => {
  if (DEBUG) {
    console.log('CacheService: Clearing all cache');
  }
  Object.keys(cache).forEach(key => {
    delete cache[key];
  });
};

/**
 * Get all keys in the cache
 * @returns Array of cache keys
 */
export const getCacheKeys = (): string[] => {
  return Object.keys(cache);
};

/**
 * Debug function to log the current state of the cache
 */
export const debugCache = (): void => {
  console.log('CacheService: Current cache state', {
    keys: getCacheKeys(),
    itemCount: getCacheKeys().length,
    items: cache,
  });
};

export default {
  setCache,
  getCache,
  hasCache,
  removeCache,
  clearCache,
  getCacheKeys,
  debugCache,
}; 