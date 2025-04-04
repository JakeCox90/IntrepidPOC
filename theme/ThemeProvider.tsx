"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import { colors, space, radius, typography, shadows, zIndex, borderWidth, opacity } from "../design-system/foundations"

// Define the theme type
type ThemeType = {
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
      Breaking: string
    }
  }
  typography: typeof typography
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
const ensureThemeProperties = (theme) => {
  // Make sure typography and fontFamily exist
  if (!theme.typography) theme.typography = typography
  if (!theme.typography.fontFamily) theme.typography.fontFamily = typography.fontFamily

  // Make sure other properties exist
  if (!theme.space) theme.space = space
  if (!theme.radius) theme.radius = radius
  if (!theme.borderWidth) theme.borderWidth = borderWidth
  if (!theme.opacity) theme.opacity = opacity
  if (!theme.shadows) theme.shadows = shadows
  if (!theme.zIndex) theme.zIndex = zIndex

  return theme
}

// Create light theme
const lightTheme: ThemeType = ensureThemeProperties({
  colors: colors,
  typography,
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
  typography,
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

// Theme provider component
export const ThemeProvider = ({ children }) => {
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

