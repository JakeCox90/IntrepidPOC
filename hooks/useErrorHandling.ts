import { useCallback, useEffect, useState } from 'react';
import { errorHandlingService, ErrorDetails, ErrorHandlingOptions } from '../services/errorHandling';

interface UseErrorHandlingResult {
  handleError: <T>(operation: () => Promise<T>, options?: ErrorHandlingOptions) => Promise<T>;
  lastError: ErrorDetails | null;
  clearError: () => void;
  isError: boolean;
}

/**
 * Custom hook for handling errors in React components
 * Provides a simple interface to the error handling service
 * and maintains error state for the component
 */
export const useErrorHandling = (): UseErrorHandlingResult => {
  const [lastError, setLastError] = useState<ErrorDetails | null>(null);

  // Clear error state
  const clearError = useCallback(() => {
    setLastError(null);
  }, []);

  // Handle errors with retry logic
  const handleError = useCallback(
    async <T>(operation: () => Promise<T>, options?: ErrorHandlingOptions): Promise<T> => {
      try {
        const result = await errorHandlingService.handleApiError(operation, {
          ...options,
          onError: (error: ErrorDetails) => {
            setLastError(error);
            options?.onError?.(error);
          },
        });
        return result;
      } catch (error) {
        if (error instanceof Error) {
          const errorDetails = errorHandlingService.createErrorDetails(error);
          setLastError(errorDetails);
        }
        throw error;
      }
    },
    []
  );

  // Cleanup error listeners on unmount
  useEffect(() => {
    const cleanup = errorHandlingService.addErrorListener((error: ErrorDetails) => {
      setLastError(error);
    });

    return () => {
      cleanup();
    };
  }, []);

  return {
    handleError,
    lastError,
    clearError,
    isError: lastError !== null,
  };
}; 