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

// Define the theme type with strict typing
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

// Theme validation function
const validateTheme = (theme: Partial<ThemeType>): boolean => {
  // Check required color properties
  if (!theme.colors?.Primary?.Resting ||
      !theme.colors?.Text?.Primary ||
      !theme.colors?.Surface?.Primary ||
      !theme.colors?.Border?.Primary) {
    console.error('Missing required theme color properties');
    return false;
  }

  return true;
};

// Create light theme
const lightTheme: ThemeType = {
  colors: {
    ...colors,
    Surface: {
      Primary: '#FFFFFF',
      Secondary: '#F5F5F5',
      Disabled: '#E5E5E5',
      Overlay01: 'rgba(0, 0, 0, 0.3)',
      Overlay02: 'rgba(0, 0, 0, 0.5)',
    },
    Text: {
      Primary: '#000000',
      Secondary: '#717171',
      Inverse: '#FFFFFF',
      Disabled: '#A0A0A0',
      Error: colors.Text.Error,
    },
    Border: {
      Primary: '#E5E5E5',
      Secondary: '#CCCCCC',
      Skeleton01: '#F5F5F5',
      Skeleton02: '#EBEBEB',
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
  isDark: false,
  toggleTheme: () => {},
};

// Create dark theme
const darkTheme: ThemeType = {
  ...lightTheme,
  colors: {
    ...colors,
    Surface: {
      Primary: '#1D1D1B',
      Secondary: '#313131',
      Disabled: '#4D4D4D',
      Overlay01: 'rgba(0, 0, 0, 0.5)',
      Overlay02: 'rgba(0, 0, 0, 0.7)',
    },
    Text: {
      Primary: '#FFFFFF',
      Secondary: '#A0A0A0',
      Inverse: '#1D1D1B',
      Disabled: '#6C6C6C',
      Error: colors.Text.Error,
    },
    Border: {
      Primary: '#333333',
      Secondary: '#4D4D4D',
      Skeleton01: '#2A2A2A',
      Skeleton02: '#333333',
      Error: colors.Border.Error,
    },
  },
  isDark: true,
};

// Create the theme context
const ThemeContext = createContext<ThemeType>(lightTheme);

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

  // Create the theme object
  const theme: ThemeType = {
    ...(isDark ? darkTheme : lightTheme),
    toggleTheme,
    isDark,
  };

  // Validate theme before providing it
  if (!validateTheme(theme)) {
    console.error('Invalid theme configuration');
    // Fallback to light theme if validation fails
    return <ThemeContext.Provider value={lightTheme}>{children}</ThemeContext.Provider>;
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
