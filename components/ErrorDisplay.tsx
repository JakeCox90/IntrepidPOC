import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { ErrorDetails } from '../services/errorHandling';

interface ErrorDisplayProps {
  error: ErrorDetails;
  onDismiss?: () => void;
  showDetails?: boolean;
}

/**
 * A reusable error display component that shows error information
 * in a consistent way across the application.
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onDismiss,
  showDetails = false,
}) => {
  const theme = useTheme();
  const styles = createErrorDisplayStyles(theme);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const detailsHeightAnim = useRef(new Animated.Value(0)).current;
  
  // Start entrance animation when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
    
    // Animate details height if showing details
    if (showDetails && error.context) {
      Animated.timing(detailsHeightAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  }, [fadeAnim, slideAnim, detailsHeightAnim, showDetails, error.context]);
  
  // Handle dismiss with animation
  const handleDismiss = () => {
    if (onDismiss) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
      ]).start(() => {
        onDismiss();
      });
    }
  };

  const getSeverityColor = (severity: ErrorDetails['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return theme.colors.Error.Resting;
      case 'HIGH':
        return theme.colors.Error.Resting;
      case 'MEDIUM':
        return theme.colors.Error.Resting;
      case 'LOW':
        return theme.colors.Error.Resting;
      default:
        return theme.colors.Error.Resting;
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: getSeverityColor(error.severity),
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Typography
            variant="body-01"
            color={theme.colors.Text.Inverse}
            style={styles.message}
          >
            {error.message}
          </Typography>
          {onDismiss && (
            <TouchableOpacity
              onPress={handleDismiss}
              style={styles.dismissButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Typography
                variant="body-01"
                color={theme.colors.Text.Inverse}
              >
                ✕
              </Typography>
            </TouchableOpacity>
          )}
        </View>
        {showDetails && error.context && (
          <Animated.View 
            style={[
              styles.details,
              {
                opacity: detailsHeightAnim,
                maxHeight: detailsHeightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 500],
                }),
              }
            ]}
          >
            <Typography
              variant="body-02"
              color={theme.colors.Text.Inverse}
              style={styles.detailsText}
            >
              {JSON.stringify(error.context, null, 2)}
            </Typography>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

/**
 * Creates styles for the ErrorDisplay component
 */
const createErrorDisplayStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.radius['radius-default'],
      margin: theme.space['20'],
      overflow: 'hidden',
    },
    content: {
      padding: theme.space['20'],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    message: {
      flex: 1,
      marginRight: theme.space['20'],
    },
    dismissButton: {
      padding: theme.space['10'],
    },
    details: {
      marginTop: theme.space['20'],
      padding: theme.space['20'],
      backgroundColor: theme.colors.Surface.Primary,
      borderRadius: theme.radius['radius-default'],
      overflow: 'hidden',
    },
    detailsText: {
      fontFamily: theme.typography.fontFamily.mono,
    },
  });

export default ErrorDisplay; 