'use client';

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorFallbackProps extends FallbackProps {
  title?: string;
  message?: string;
  buttonText?: string;
}

/**
 * A reusable error fallback component that displays error information
 * and provides a way to recover from the error.
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  buttonText = 'Try Again',
}) => {
  const theme = useTheme();
  const styles = createErrorFallbackStyles(theme);
  const isDevelopment = __DEV__;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Typography variant="h5" color={theme.colors.Error.Text} style={styles.title}>
          {title}
        </Typography>
        <Typography variant="body-01" color={theme.colors.Text.Secondary} style={styles.message}>
          {message}
        </Typography>
        {isDevelopment && (
          <Typography variant="body-02" color={theme.colors.Text.Secondary} style={styles.errorDetails}>
            {error.message}
          </Typography>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.Primary.Resting }]}
          onPress={resetErrorBoundary}
        >
          <Typography variant="button" color={theme.colors.Text.Inverse}>
            {buttonText}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * A reusable error boundary component that catches JavaScript errors anywhere in their child component tree,
 * log those errors, and display a fallback UI.
 */
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
  onError,
  onReset,
}) => {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, info);
    
    // Call the onError prop if provided
    if (onError) {
      onError(error, info);
    }
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={fallback || ErrorFallback}
      onError={handleError}
      onReset={onReset}
    >
      {children}
    </ReactErrorBoundary>
  );
};

/**
 * Creates styles for the ErrorFallback component
 */
const createErrorFallbackStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.Surface.Primary,
      flex: 1,
      justifyContent: 'center',
      padding: theme.space['40'],
    },
    content: {
      alignItems: 'center',
      maxWidth: 400,
      width: '100%',
    },
    title: {
      marginBottom: theme.space['20'],
      textAlign: 'center',
    },
    message: {
      marginBottom: theme.space['30'],
      textAlign: 'center',
    },
    errorDetails: {
      marginBottom: theme.space['30'],
      textAlign: 'center',
    },
    button: {
      borderRadius: theme.radius['radius-default'],
      paddingHorizontal: theme.space['40'],
      paddingVertical: theme.space['20'],
    },
  });

export default ErrorBoundary; 