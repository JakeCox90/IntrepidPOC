'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../design-system/Foundations/colors';
import { space } from '../design-system/Foundations/space';
import { radius } from '../design-system/Foundations/radius';
import { shadows } from '../design-system/Foundations/shadows';
import { zIndex } from '../design-system/Foundations/zIndex';
import { borderWidth } from '../design-system/Foundations/borderWidth';
import { opacity } from '../design-system/Foundations/opacity';
import {
  typographyScale,
  typographyLineHeight,
  typographyVariants,
} from '../design-system/typography';

// Define the theme type
export type ThemeType = {
  colors: {
    Primary: {
      Resting: string;
      Disabled: string;
      Pressed: string;
      Selected: string;
    };
    Secondary: {
      Resting: string;
      Disabled: string;
      Pressed: string;
      Selected: string;
    };
    Text: {
      Primary: string;
      Secondary: string;
      Inverse: string;
      Disabled: string;
      Error: string;
    };
    Surface: {
      Primary: string;
      Secondary: string;
      Disabled: string;
      Overlay01: string;
      Overlay02: string;
    };
    Error: {
      Resting: string;
      Pressed: string;
      Disabled: string;
      Background: string;
      Border: string;
      Text: string;
    };
    Warning: {
      Resting: string;
      Pressed: string;
      Disabled: string;
    };
    Success: {
      Resting: string;
      Pressed: string;
      Disabled: string;
    };
    Border: {
      Primary: string;
      Secondary: string;
      Skeleton01: string;
      Skeleton02: string;
      Error: string;
    };
    Section: {
      News: string;
      Sport: string;
      TV: string;
      Showbiz: string;
      Fabulous: string;
      Money: string;
      Travel: string;
      Tech: string;
      Motors: string;
      Health: string;
      UKNews: string;
      WorldNews: string;
      IrishNews: string;
      ScottishNews: string;
      Politics: string;
      RoyalFamily: string;
      USNews: string;
      Opinion: string;
      Football: string;
      Boxing: string;
      Racing: string;
      UFC: string;
      F1: string;
      Cricket: string;
      Rugby: string;
      Golf: string;
      Tennis: string;
      NFL: string;
      DreamTeam: string;
      Soaps: string;
      RealityTV: string;
      TVNews: string;
      Celebrity: string;
      Music: string;
      Film: string;
      Fashion: string;
      Beauty: string;
      Food: string;
      Parenting: string;
      Property: string;
      Bills: string;
      Banking: string;
      Pensions: string;
      BeachHolidays: string;
      UKHolidays: string;
      CityBreaks: string;
      Cruises: string;
      Phones: string;
      Gaming: string;
      Science: string;
      NewCars: string;
      UsedCars: string;
      Fitness: string;
      Diet: string;
      HealthNews: string;
      Puzzles: string;
      DearDeidre: string;
      SunBingo: string;
      SunVegas: string;
      SunSavers: string;
      SunCasino: string;
      SunWin: string;
      SunSelects: string;
    };
  };
  typography: {
    fontFamily: {
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
    scale: typeof typographyScale;
    lineHeight: typeof typographyLineHeight;
    variants: typeof typographyVariants;
  };
  space: typeof space;
  radius: typeof radius;
  borderWidth: typeof borderWidth;
  opacity: typeof opacity;
  shadows: typeof shadows;
  zIndex: typeof zIndex;
  isDark: boolean;
  toggleTheme: () => void;
};

// Ensure all required properties exist in the theme objects
const ensureThemeProperties = (theme: Partial<ThemeType>): ThemeType => {
  // Make sure colors exist with all required properties
  if (!theme.colors) {
    theme.colors = colors;
  }

  // Make sure typography exists with all required properties
  if (!theme.typography) {
    theme.typography = {
      fontFamily: {
        regular: 'Inter-Regular',
        medium: 'Inter-Medium',
        semiBold: 'Inter-SemiBold',
        bold: 'Inter-Bold',
      },
      scale: typographyScale,
      lineHeight: typographyLineHeight,
      variants: typographyVariants,
    };
  }

  // Make sure other properties exist
  if (!theme.space) theme.space = space;
  if (!theme.radius) theme.radius = radius;
  if (!theme.borderWidth) theme.borderWidth = borderWidth;
  if (!theme.opacity) theme.opacity = opacity;
  if (!theme.shadows) theme.shadows = shadows;
  if (!theme.zIndex) theme.zIndex = zIndex;
  if (theme.toggleTheme === undefined) theme.toggleTheme = () => {};
  if (theme.isDark === undefined) theme.isDark = false;

  return theme as ThemeType;
};

// Create light theme
const lightTheme: ThemeType = ensureThemeProperties({
  colors: colors,
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
  space,
  radius,
  borderWidth,
  opacity,
  shadows,
  zIndex,
  isDark: false,
  toggleTheme: () => {},
});

// Create dark theme
const darkTheme: ThemeType = ensureThemeProperties({
  colors: {
    ...colors,
    Surface: {
      Primary: '#1d1d1b', // Dark background
      Secondary: '#313131', // Darker background
      Disabled: '#4d4d4d',
      Overlay01: colors.Surface.Overlay01,
      Overlay02: colors.Surface.Overlay02,
    },
    Text: {
      Primary: '#ffffff',
      Secondary: '#a0a0a0',
      Inverse: '#1d1d1b',
      Disabled: '#6c6c6c',
      Error: colors.Text.Error,
    },
    Border: {
      Primary: '#ffffff',
      Secondary: '#a0a0a0',
      Skeleton01: '#4d4d4d',
      Skeleton02: '#6c6c6c',
      Error: colors.Border.Error,
    },
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
  space,
  radius,
  borderWidth,
  opacity,
  shadows,
  zIndex,
  isDark: true,
  toggleTheme: () => {},
});

// Create a default theme to initialize the context
const defaultTheme: ThemeType = ensureThemeProperties({
  colors,
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
  space,
  radius,
  borderWidth,
  opacity,
  shadows,
  zIndex,
  isDark: false,
  toggleTheme: () => {},
});

// Create the theme context with the complete default theme
const ThemeContext = createContext<ThemeType>(defaultTheme);

// Hook to use the theme
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Create a fully formed theme object with proper toggle function
  const theme: ThemeType = isDark
    ? {
        ...darkTheme,
        toggleTheme,
        isDark: true,
      }
    : {
        ...lightTheme,
        toggleTheme,
        isDark: false,
      };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
