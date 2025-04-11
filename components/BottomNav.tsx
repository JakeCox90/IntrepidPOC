'use client';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, TextStyle } from 'react-native';
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
type IconName = 'home' | 'user' | 'grid' | 'search' | 'bookmark';

// Define tab configuration type
interface TabConfig {
  name: ValidTabName;
  icon: IconName;
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
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  // Ensure we have fallback values if theme properties are undefined
  const primaryColor = theme?.colors?.Primary?.Resting || '#E03A3A';
  const secondaryColor = theme?.colors?.Text?.Secondary || '#717171';
  const borderColor = theme?.colors?.Border?.Primary || '#E5E5E5';
  const borderWidth = theme?.borderWidth?.['10'] || 1;
  const surfaceColor = theme?.colors?.Surface?.Primary || '#FFFFFF';

  // Define tabs with proper typing
  const tabs: TabConfig[] = [
    { name: 'Today', icon: 'home' },
    { name: 'ForYou', icon: 'user', label: 'For You' },
    { name: 'AllNews', icon: 'grid', label: 'All News' },
    { name: 'Search', icon: 'search' },
    { name: 'Saved', icon: 'bookmark' },
  ];

  return (
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
          onPress={() => onTabPress(tab.name)}
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
            style={[styles.tabLabel]}
          >
            {tab.label || tab.name}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  disabledTab: {
    opacity: 0.5,
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
  },
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
  },
  errorButton: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  errorButtonText: {
    fontWeight: 'bold',
  },
});

export default BottomNav;
