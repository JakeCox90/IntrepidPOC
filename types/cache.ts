/**
 * Cache Types
 * This file contains type definitions for caching functionality.
 */

/**
 * Represents a cached item with its data and metadata
 */
export interface CacheItem<T> {
  /** The cached data */
  data: T;
  /** Unix timestamp when the item was cached */
  timestamp: number;
  /** Optional time-to-live in milliseconds */
  ttl?: number;
  /** Optional version number for cache invalidation */
  version?: string;
}

/**
 * Configuration options for cache operations
 */
export interface CacheOptions {
  /** Time-to-live in milliseconds */
  ttl?: number;
  /** Whether to force a fresh fetch */
  forceFresh?: boolean;
  /** Version number for cache invalidation */
  version?: string;
}

/**
 * Cache service interface
 */
export interface CacheService {
  /** Get an item from the cache */
  get<T>(key: string): Promise<CacheItem<T> | null>;
  /** Set an item in the cache */
  set<T>(key: string, data: T, options?: CacheOptions): Promise<void>;
  /** Remove an item from the cache */
  remove(key: string): Promise<void>;
  /** Clear all items from the cache */
  clear(): Promise<void>;
} 