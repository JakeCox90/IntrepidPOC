"use client"
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"

interface FlagProps {
  text: string
  color?: string
  backgroundColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
  category?: string
}

const Flag = ({ text, color, backgroundColor, style, textStyle, category }: FlagProps) => {
  const theme = useTheme()

  // Get section color based on category or text
  const getSectionColor = (categoryOrText: string): string => {
    if (!categoryOrText) return theme.colors.Section.News

    const normalizedText = categoryOrText.toUpperCase()

    // Main sections
    if (
      normalizedText.includes("NEWS") ||
      normalizedText.includes("UK NEWS") ||
      normalizedText.includes("WORLD NEWS") ||
      normalizedText.includes("US NEWS") ||
      normalizedText.includes("IRISH NEWS") ||
      normalizedText.includes("SCOTTISH NEWS") ||
      normalizedText.includes("POLITICS") ||
      normalizedText.includes("OPINION") ||
      normalizedText.includes("ROYAL")
    ) {
      return theme.colors.Section.News
    }

    if (
      normalizedText.includes("SPORT") ||
      normalizedText.includes("FOOTBALL") ||
      normalizedText.includes("BOXING") ||
      normalizedText.includes("RACING") ||
      normalizedText.includes("UFC") ||
      normalizedText.includes("F1") ||
      normalizedText.includes("CRICKET") ||
      normalizedText.includes("RUGBY") ||
      normalizedText.includes("GOLF") ||
      normalizedText.includes("TENNIS") ||
      normalizedText.includes("NFL") ||
      normalizedText.includes("DREAM TEAM")
    ) {
      return theme.colors.Section.Sport
    }

    if (
      normalizedText.includes("TV") ||
      normalizedText.includes("TELEVISION") ||
      normalizedText.includes("SOAPS") ||
      normalizedText.includes("REALITY") ||
      normalizedText.includes("PUZZLES")
    ) {
      return theme.colors.Section.TV
    }

    if (
      normalizedText.includes("SHOWBIZ") ||
      normalizedText.includes("CELEBRITY") ||
      normalizedText.includes("MUSIC") ||
      normalizedText.includes("FILM") ||
      normalizedText.includes("DEAR DEIDRE")
    ) {
      return theme.colors.Section.Showbiz
    }

    if (
      normalizedText.includes("FABULOUS") ||
      normalizedText.includes("FASHION") ||
      normalizedText.includes("BEAUTY") ||
      normalizedText.includes("FOOD") ||
      normalizedText.includes("PARENTING")
    ) {
      return theme.colors.Section.Fabulous
    }

    if (
      normalizedText.includes("MONEY") ||
      normalizedText.includes("BANKING") ||
      normalizedText.includes("BILLS") ||
      normalizedText.includes("PENSIONS") ||
      normalizedText.includes("PROPERTY")
    ) {
      return theme.colors.Section.Money
    }

    if (
      normalizedText.includes("TRAVEL") ||
      normalizedText.includes("HOLIDAY") ||
      normalizedText.includes("BEACH") ||
      normalizedText.includes("CRUISE") ||
      normalizedText.includes("SUN BINGO")
    ) {
      return theme.colors.Section.Travel
    }

    if (
      normalizedText.includes("TECH") ||
      normalizedText.includes("PHONE") ||
      normalizedText.includes("GAMING") ||
      normalizedText.includes("SCIENCE") ||
      normalizedText.includes("HEALTH") ||
      normalizedText.includes("FITNESS") ||
      normalizedText.includes("DIET")
    ) {
      return theme.colors.Section.Tech
    }

    if (normalizedText.includes("MOTORS") || normalizedText.includes("CAR")) {
      return theme.colors.Section.Motors
    }

    if (
      normalizedText.includes("SUN VEGAS") ||
      normalizedText.includes("SUN SAVERS") ||
      normalizedText.includes("SUN CASINO") ||
      normalizedText.includes("SUN WIN")
    ) {
      return "#FFD700" // Gold
    }

    if (normalizedText.includes("SUN SELECTS")) {
      return theme.colors.Section.News
    }

    // Special flags
    if (normalizedText === "EXCLUSIVE") {
      return "#4361ee" // Blue color for EXCLUSIVE
    } else if (normalizedText.includes("BREAKING")) {
      return "#E03A3A" // Red for BREAKING news
    } else if (normalizedText.includes("LIVE")) {
      return "#E03A3A" // Red for LIVE updates
    }

    // Default to News if no match
    return theme.colors.Section.News
  }

  // Default colors based on text or category
  const defaultBgColor = category ? getSectionColor(category) : getSectionColor(text)
  const defaultTextColor = theme.colors.Text.Inverse

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || defaultBgColor }, style]}>
      <Typography variant="overline" color={color || defaultTextColor} style={textStyle}>
        {text.toUpperCase()}
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
})

export default Flag

