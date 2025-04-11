'use client';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Icon } from './Icon';
import { ErrorBoundary } from 'react-error-boundary';
import { useState, useCallback } from 'react';
import Typography from './Typography';

// Define valid tab names as a type to ensure type safety
type ValidTabName = 'Today' | 'ForYou' | 'AllNews' | 'Search' | 'Saved';

// Define the icon names type based on Feather icons
type FeatherIconName = 'home' | 'user' | 'grid' | 'search' | 'bookmark';

// Define tab configuration type
interface TabConfig {
  name: ValidTabName;
  icon: FeatherIconName;
  label?: string;
  disabled?: boolean;
}

// Component props with improved type safety
interface BottomNavProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
  isLoading?: boolean;
}

// Props for the ErrorFallback component
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// ErrorFallback component for the BottomNav
const BottomNavErrorFallback = ({ error: _error, resetErrorBoundary }: ErrorFallbackProps) => {
  const theme = useTheme();
  const errorBgColor = theme?.colors?.Error?.Background || '#FEF2F2';
  const errorBorderColor = theme?.colors?.Error?.Border || '#FECACA';
  const errorTextColor = theme?.colors?.Error?.Text || '#DC2626';
  const errorButtonBgColor = theme?.colors?.Error?.Resting || '#DC2626';
  const errorButtonTextColor = theme?.colors?.Surface?.Primary || '#FFFFFF';

  return (
    <View
      style={[
        styles.errorContainer,
        {
          backgroundColor: errorBgColor,
          borderTopColor: errorBorderColor,
        },
      ]}
    >
      <Typography variant="body-01" color={errorTextColor} style={styles.errorText}>
        Navigation error occurred
      </Typography>
      <TouchableOpacity
        style={[styles.errorButton, { backgroundColor: errorButtonBgColor }]}
        onPress={resetErrorBoundary}
      >
        <Typography variant="button" color={errorButtonTextColor} style={styles.errorButtonText}>
          Try Again
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const BottomNav = ({ activeTab, onTabPress, isLoading = false }: BottomNavProps) => {
  // Track error state for tab press operations
  const [tabPressError, setTabPressError] = useState<Error | null>(null);

  // Create a safe theme object with all required properties and fallbacks
  const theme = useTheme() || {};
  const insets = useSafeAreaInsets();

  // Ensure we have fallback values if theme properties are undefined
  const primaryColor = theme?.colors?.Primary?.Resting || '#E03A3A';
  const secondaryColor = theme?.colors?.Text?.Secondary || '#717171';
  const borderColor = theme?.colors?.Border?.Primary || '#E5E5E5';
  const borderWidth = theme?.borderWidth?.['10'] || 1;
  const surfaceColor = theme?.colors?.Surface?.Primary || '#FFFFFF';
  const errorColor = theme?.colors?.Error?.Resting || '#DC2626';

  // Safe tab press handler with error handling
  const handleTabPress = useCallback(
    (tabName: string) => {
      try {
        // Reset any previous errors
        setTabPressError(null);

        // Validate tab name before calling the navigation handler
        if (!['Today', 'ForYou', 'AllNews', 'Search', 'Saved'].includes(tabName)) {
          console.warn(`Invalid tab name: ${tabName}`);
          return;
        }

        // Call the provided onTabPress function
        onTabPress(tabName);
      } catch (error) {
        // Handle and log any errors
        console.error('Error pressing tab:', error);
        setTabPressError(error instanceof Error ? error : new Error('Unknown error'));
      }
    },
    [onTabPress],
  );

  // If we're in an error state, show an error message
  if (tabPressError) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: surfaceColor,
            borderTopWidth: borderWidth,
            borderTopColor: borderColor,
          },
        ]}
      >
        <Typography variant="body-01" color={errorColor} style={styles.inlineErrorText}>
          Navigation error. Please try again.
        </Typography>
        <TouchableOpacity
          style={[styles.dismissButton, { backgroundColor: primaryColor }]}
          onPress={() => setTabPressError(null)}
        >
          <Typography variant="button" color={surfaceColor}>
            Dismiss
          </Typography>
        </TouchableOpacity>
      </View>
    );
  }

  // Define tabs with proper typing
  const tabs: TabConfig[] = [
    { name: 'Today', icon: 'home' },
    { name: 'ForYou', icon: 'user', label: 'For You' },
    { name: 'AllNews', icon: 'grid', label: 'All News' },
    { name: 'Search', icon: 'search' },
    { name: 'Saved', icon: 'bookmark' },
  ];

  // Show loading indicator if in loading state
  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          styles.loadingContainer,
          {
            borderTopWidth: borderWidth,
            borderTopColor: borderColor,
            paddingBottom: insets.bottom || 0,
            backgroundColor: surfaceColor,
          },
        ]}
      >
        <ActivityIndicator size="small" color={primaryColor} />
      </View>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={BottomNavErrorFallback}
      onError={error => console.error('BottomNav error:', error)}
      onReset={() => setTabPressError(null)}
    >
      <View
        style={[
          styles.container,
          {
            borderTopWidth: borderWidth,
            borderTopColor: borderColor,
            paddingBottom: insets.bottom || 0,
            backgroundColor: surfaceColor,
          },
        ]}
      >
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tab, tab.disabled && styles.disabledTab]}
            onPress={() => handleTabPress(tab.name)}
            disabled={tab.disabled}
            activeOpacity={0.7}
          >
            <Feather
              name={tab.icon}
              size={24}
              color={activeTab === tab.name ? primaryColor : secondaryColor}
            />
            <Typography
              variant="caption"
              color={activeTab === tab.name ? primaryColor : secondaryColor}
              style={[styles.tabLabel, tab.disabled && styles.disabledElement]}
            >
              {tab.label || tab.name}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  disabledElement: {
    opacity: 0.7,
  } as const,
  disabledTab: {
    opacity: 0.5,
  },
  dismissButton: {
    borderRadius: 4,
    margin: 5,
    padding: 5,
  },
  errorButton: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  errorButtonText: {
    fontWeight: 'bold',
  } as const,
  errorContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    justifyContent: 'center',
    minHeight: 56,
    padding: 10,
    width: '100%',
  },
  errorText: {
    marginBottom: 8,
  } as const,
  inlineErrorText: {
    padding: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    marginTop: 4,
  } as const,
});

export default BottomNav;
