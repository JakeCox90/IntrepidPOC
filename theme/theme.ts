import {
  typographyScale,
  typographyLineHeight,
  typographyVariants,
} from '../design-system/typography';

// Design system tokens based on your foundations
export const lightTheme = {
  colors: {
    primary: '#E03A3A', // The Sun's red color
    secondary: '#1E1E1E',
    background: '#FFFFFF',
    text: {
      primary: '#000000',
      secondary: '#4A4A4A',
      tertiary: '#717171',
    },
    border: '#E5E5E5',
    accent: '#007AFF', // iOS blue color
  },
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semiBold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    scale: typographyScale,
    lineHeight: typographyLineHeight,
    variants: typographyVariants,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  opacity: {
    light: 0.3,
    medium: 0.5,
    high: 0.8,
  },
};

export const darkTheme = {
  colors: {
    primary: '#E03A3A', // The Sun's red color
    secondary: '#E5E5E5',
    background: '#121212',
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      tertiary: '#999999',
    },
    border: '#333333',
    accent: '#0A84FF', // iOS blue color for dark mode
  },
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semiBold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    scale: typographyScale,
    lineHeight: typographyLineHeight,
    variants: typographyVariants,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  opacity: {
    light: 0.3,
    medium: 0.5,
    high: 0.8,
  },
};
