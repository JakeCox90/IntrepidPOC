import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

// Base styles that don't depend on theme
export const baseStyles = StyleSheet.create({
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
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Function to get themed styles based on the current theme
export const getThemedStyles = (theme: ThemeType) => {
  // Ensure we have fallback values if theme properties are undefined
  const primaryColor = theme?.colors?.Primary?.Resting || '#E03A3A';
  const secondaryColor = theme?.colors?.Text?.Secondary || '#717171';
  const borderColor = theme?.colors?.Border?.Primary || '#E5E5E5';
  const borderWidth = theme?.borderWidth?.['10'] || 1;
  const surfaceColor = theme?.colors?.Surface?.Primary || '#FFFFFF';

  return {
    container: {
      borderTopWidth: borderWidth,
      borderTopColor: borderColor,
      backgroundColor: surfaceColor,
    },
    tabLabel: {
      color: (isActive: boolean) => isActive ? primaryColor : secondaryColor,
    },
  };
}; 