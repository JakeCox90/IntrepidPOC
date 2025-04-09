"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useColorScheme } from "react-native"
import { colors } from "../design-system/Foundations/colors"
import { space } from "../design-system/Foundations/space"
import { radius } from "../design-system/Foundations/radius"
import { shadows } from "../design-system/Foundations/shadows"
import { zIndex } from "../design-system/Foundations/zIndex"
import { borderWidth } from "../design-system/Foundations/borderWidth"
import { opacity } from "../design-system/Foundations/opacity"
import { typographyScale, typographyLineHeight, typographyVariants } from "../design-system/typography"

// Define the theme type
export type ThemeType = {
  colors: {
    Primary: {
      Resting: string
      Disabled: string
      Pressed: string
      Selected: string
    }
    Secondary: {
      Resting: string
      Disabled: string
      Pressed: string
      Selected: string
    }
    Text: {
      Primary: string
      Secondary: string
      Inverse: string
      Disabled: string
      Error: string
    }
    Surface: {
      Primary: string
      Secondary: string
      Disabled: string
      "Overlay-01": string
      "Overlay-02": string
    }
    Error: {
      Resting: string
      Pressed: string
      Disabled: string
      Background: string
      Border: string
      Text: string
    }
    Warning: {
      Resting: string
      Pressed: string
      Disabled: string
    }
    Success: {
      Resting: string
      Pressed: string
      Disabled: string
    }
    Border: {
      "Border-Primary": string
      "Border-Secondary": string
      "Skeleton-01": string
      "Skeleton-02": string
      Error: string
    }
    Section: {
      News: string
      Sport: string
      TV: string
      Showbiz: string
      Fabulous: string
      Money: string
      Travel: string
      Tech: string
      Motors: string
      Health: string
      "UK News": string
      "World News": string
      "Irish News": string
      "Scottish News": string
      Politics: string
      "Royal Family": string
      "US News": string
      Opinion: string
      Football: string
      Boxing: string
      Racing: string
      UFC: string
      F1: string
      Cricket: string
      Rugby: string
      Golf: string
      Tennis: string
      NFL: string
      "Dream Team": string
      Soaps: string
      "Reality TV": string
      "TV News": string
      Celebrity: string
      Music: string
      Film: string
      Fashion: string
      Beauty: string
      Food: string
      Parenting: string
      Property: string
      Bills: string
      Banking: string
      Pensions: string
      "Beach Holidays": string
      "UK Holidays": string
      "City Breaks": string
      Cruises: string
      Phones: string
      Gaming: string
      Science: string
      "New Cars": string
      "Used Cars": string
      Fitness: string
      Diet: string
      "Health News": string
      Puzzles: string
      "Dear Deidre": string
      "Sun Bingo": string
      "Sun Vegas": string
      "Sun Savers": string
      "Sun Casino": string
      "Sun Win": string
      "Sun Selects": string
    }
  }
  typography: {
    fontFamily: {
      regular: string
      medium: string
      semiBold: string
      bold: string
    }
    scale: typeof typographyScale
    lineHeight: typeof typographyLineHeight
    variants: typeof typographyVariants
  }
  space: typeof space
  radius: typeof radius
  borderWidth: typeof borderWidth
  opacity: typeof opacity
  shadows: typeof shadows
  zIndex: typeof zIndex
  isDark: boolean
  toggleTheme: () => void
}

// Ensure all required properties exist in the theme objects
const ensureThemeProperties = (theme: Partial<ThemeType>): ThemeType => {
  // Make sure typography exists with all required properties
  if (!theme.typography) {
    theme.typography = {
      fontFamily: {
        regular: "Inter-Regular",
        medium: "Inter-Medium",
        semiBold: "Inter-SemiBold",
        bold: "Inter-Bold",
      },
      scale: typographyScale,
      lineHeight: typographyLineHeight,
      variants: typographyVariants,
    }
  }

  // Make sure other properties exist
  if (!theme.space) theme.space = space
  if (!theme.radius) theme.radius = radius
  if (!theme.borderWidth) theme.borderWidth = borderWidth
  if (!theme.opacity) theme.opacity = opacity
  if (!theme.shadows) theme.shadows = shadows
  if (!theme.zIndex) theme.zIndex = zIndex

  return theme as ThemeType
}

// Create light theme
const lightTheme: ThemeType = ensureThemeProperties({
  colors: colors,
  typography: {
    fontFamily: {
      regular: "Inter-Regular",
      medium: "Inter-Medium",
      semiBold: "Inter-SemiBold",
      bold: "Inter-Bold",
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
})

// Create dark theme
const darkTheme: ThemeType = ensureThemeProperties({
  colors: {
    ...colors,
    Surface: {
      Primary: "#1d1d1b", // Dark background
      Secondary: "#313131", // Darker background
      Disabled: "#4d4d4d",
      "Overlay-01": colors.Surface["Overlay-01"],
      "Overlay-02": "#313131",
    },
    Text: {
      Primary: "#ffffff",
      Secondary: "#a0a0a0",
      Inverse: "#1d1d1b",
      Disabled: "#6c6c6c",
      Error: colors.Text.Error,
    },
    Border: {
      "Border-Primary": "#ffffff",
      "Border-Secondary": "#a0a0a0",
      "Skeleton-01": "#4d4d4d",
      "Skeleton-02": "#6c6c6c",
      Error: colors.Border.Error,
    },
  },
  typography: {
    fontFamily: {
      regular: "Inter-Regular",
      medium: "Inter-Medium",
      semiBold: "Inter-SemiBold",
      bold: "Inter-Bold",
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
})

// Create the theme context
const ThemeContext = createContext<ThemeType>(lightTheme)

// Hook to use the theme
export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: ReactNode
}

// Theme provider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme()
  const [isDark, setIsDark] = useState(colorScheme === "dark")

  useEffect(() => {
    setIsDark(colorScheme === "dark")
  }, [colorScheme])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const theme = isDark
    ? ensureThemeProperties({ ...darkTheme, toggleTheme })
    : ensureThemeProperties({ ...lightTheme, toggleTheme })

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

