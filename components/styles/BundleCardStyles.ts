import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

// Constants
export const CARD_WIDTH = 280;
export const CARD_HEIGHT = 265;

// Base styles that don't depend on theme
export const baseStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    height: CARD_HEIGHT,
    overflow: 'hidden',
    width: CARD_WIDTH,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  notifyButton: {
    alignSelf: 'flex-end',
  },
  notifyIconContainer: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  storyCount: {
    opacity: 0.8,
  },
  subtitle: {
    marginBottom: 4,
    opacity: 0.9,
  },
  title: {
    fontWeight: '700',
    marginBottom: 4,
  },
});

// Themed styles that depend on the theme
export const getThemedStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    notifyIconContainer: {
      backgroundColor: theme.colors.Surface.Overlay01,
    },
    overlay: {
      backgroundColor: theme.colors.Surface.Overlay02,
    },
  });
}; 