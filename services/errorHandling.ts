import { Alert } from 'react-native';

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum ErrorCategory {
  API = 'API',
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC',
  UNKNOWN = 'UNKNOWN',
}

export interface ErrorDetails {
  message: string;
  code?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp: Date;
  context?: Record<string, unknown>;
  originalError?: Error;
}

export interface ErrorHandlingOptions {
  showAlert?: boolean;
  retryCount?: number;
  retryDelay?: number;
  fallback?: () => void;
  onError?: (error: ErrorDetails) => void;
}

const DEFAULT_OPTIONS: ErrorHandlingOptions = {
  showAlert: true,
  retryCount: 3,
  retryDelay: 1000,
};

class ErrorHandlingService {
  private static instance: ErrorHandlingService;
  private errorListeners: ((error: ErrorDetails) => void)[] = [];

  private constructor() {}

  static getInstance(): ErrorHandlingService {
    if (!ErrorHandlingService.instance) {
      ErrorHandlingService.instance = new ErrorHandlingService();
    }
    return ErrorHandlingService.instance;
  }

  /**
   * Handles API errors with retry logic and user feedback
   */
  async handleApiError<T>(
    operation: () => Promise<T>,
    options: ErrorHandlingOptions = {}
  ): Promise<T> {
    const finalOptions = { ...DEFAULT_OPTIONS, ...options };
    let lastError: Error | undefined;
    let attempts = 0;

    while (attempts < (finalOptions.retryCount || 0)) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        attempts++;

        if (attempts < (finalOptions.retryCount || 0)) {
          await new Promise(resolve => 
            setTimeout(resolve, finalOptions.retryDelay)
          );
          continue;
        }
      }
    }

    const errorDetails = this.createErrorDetails(
      lastError,
      ErrorCategory.API,
      ErrorSeverity.MEDIUM
    );

    this.notifyErrorListeners(errorDetails);

    if (finalOptions.showAlert) {
      this.showErrorAlert(errorDetails);
    }

    if (finalOptions.fallback) {
      finalOptions.fallback();
    }

    throw errorDetails;
  }

  /**
   * Creates standardized error details from various error types
   */
  createErrorDetails(
    error: Error | unknown,
    category: ErrorCategory = ErrorCategory.UNKNOWN,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context?: Record<string, unknown>
  ): ErrorDetails {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return {
      message: errorMessage,
      severity,
      category,
      timestamp: new Date(),
      context,
      originalError: error instanceof Error ? error : undefined,
    };
  }

  /**
   * Shows an error alert to the user
   */
  private showErrorAlert(error: ErrorDetails): void {
    Alert.alert(
      'Error',
      error.message,
      [{ text: 'OK', style: 'default' }],
      { cancelable: true }
    );
  }

  /**
   * Adds an error listener
   */
  addErrorListener(listener: (error: ErrorDetails) => void): () => void {
    this.errorListeners.push(listener);
    return () => {
      this.errorListeners = this.errorListeners.filter(l => l !== listener);
    };
  }

  /**
   * Notifies all error listeners
   */
  private notifyErrorListeners(error: ErrorDetails): void {
    this.errorListeners.forEach(listener => listener(error));
  }
}

export const errorHandlingService = ErrorHandlingService.getInstance();

// Example usage:
/*
try {
  const result = await errorHandlingService.handleApiError(
    async () => {
      // Your API call here
      return await api.getData();
    },
    {
      showAlert: true,
      retryCount: 3,
      retryDelay: 1000,
      fallback: () => {
        // Handle fallback case
      },
    }
  );
} catch (error) {
  // Handle final error if all retries fail
}
*/ 