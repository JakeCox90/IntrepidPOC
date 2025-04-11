import { useState, useEffect, useRef } from 'react';
import { getCache, setCache } from '../services/cacheService';

/**
 * Custom hook for caching content across the application
 * 
 * @param cacheKey - Unique identifier for the cached content
 * @param fetchData - Function to fetch data if not in cache
 * @param initialData - Initial data to use if available
 * @param options - Additional options for caching
 * @returns Object containing the cached data, loading state, and error state
 */
export const useContentCache = <T>(
  cacheKey: string,
  fetchData: () => Promise<T>,
  initialData: T | null = null,
  options: {
    expiration?: number;
    skipCache?: boolean;
  } = {}
) => {
  // Use refs to track if we've already checked the cache
  const cacheCheckedRef = useRef(false);
  const initialLoadRef = useRef(true);
  
  // Check cache immediately
  const cachedData = cacheKey ? getCache<T>(cacheKey) : null;
  
  // Initialize state with cached data if available
  const [data, setData] = useState<T | null>(initialData || cachedData);
  const [loading, setLoading] = useState(!initialData && !cachedData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      // If we have initial data, use it
      if (initialData) {
        setData(initialData);
        setLoading(false);
        return;
      }

      // If we already have cached data, use it
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      // If not in cache and not skipping cache, fetch data
      if (!options.skipCache && cacheKey) {
        // Only show loading on initial load, not when navigating back
        if (initialLoadRef.current) {
          setLoading(true);
        }
        
        try {
          const fetchedData = await fetchData();
          if (isMounted) {
            // Store in cache
            setCache(cacheKey, fetchedData, options.expiration);
            setData(fetchedData);
            setLoading(false);
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
            setLoading(false);
          }
        }
      }
    };

    // Only run the effect if we haven't checked the cache yet
    if (!cacheCheckedRef.current) {
      cacheCheckedRef.current = true;
      loadData();
    }

    return () => {
      isMounted = false;
    };
  }, [cacheKey, initialData, options.skipCache, options.expiration]);

  // Reset the initial load flag when the component unmounts
  useEffect(() => {
    return () => {
      initialLoadRef.current = false;
    };
  }, []);

  return { data, loading, error, setData };
};

export default useContentCache; 