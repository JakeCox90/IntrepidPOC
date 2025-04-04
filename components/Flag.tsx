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
  const getSectionColor = (categoryOrText: string) => {
    const normalizedText = categoryOrText.toUpperCase()

    // Map to exact section names from The Sun website
    if (
      normalizedText.includes("SPORT") ||
      normalizedText.includes("FOOTBALL") ||
      normalizedText.includes("BOXING") ||
      normalizedText.includes("F1") ||
      normalizedText.includes("RUGBY") ||
      normalizedText.includes("CRICKET") ||
      normalizedText.includes("TENNIS") ||
      normalizedText.includes("GOLF")
    ) {
      return theme.colors.Section.Sport
    } else if (normalizedText.includes("TV") || normalizedText.includes("TELEVISION")) {
      return theme.colors.Section.TV
    } else if (normalizedText.includes("SHOWBIZ") || normalizedText.includes("CELEBRITY")) {
      return theme.colors.Section.Showbiz
    } else if (normalizedText.includes("TECH") || normalizedText.includes("TECHNOLOGY")) {
      return theme.colors.Section.Tech
    } else if (normalizedText.includes("TRAVEL")) {
      return theme.colors.Section.Travel
    } else if (normalizedText.includes("MONEY") || normalizedText.includes("FINANCE")) {
      return theme.colors.Section.Money
    } else if (normalizedText.includes("HEALTH")) {
      return theme.colors.Section.Health
    } else if (normalizedText.includes("POLITICS")) {
      return theme.colors.Section.Politics
    } else if (normalizedText.includes("MOTORS") || normalizedText.includes("CAR")) {
      return theme.colors.Section.Motors
    } else if (
      normalizedText.includes("FABULOUS") ||
      normalizedText.includes("FASHION") ||
      normalizedText.includes("BEAUTY")
    ) {
      return theme.colors.Section.Fabulous
    } else if (normalizedText.includes("FOOD")) {
      return theme.colors.Section.Food
    } else if (normalizedText.includes("PROPERTY")) {
      return theme.colors.Section.Property
    } else if (normalizedText.includes("PUZZLES")) {
      return theme.colors.Section.Puzzles
    } else if (normalizedText.includes("DEAR DEIDRE")) {
      return theme.colors.Section["Dear Deidre"]
    } else if (normalizedText.includes("OPINION")) {
      return theme.colors.Section.Opinion
    } else if (normalizedText.includes("US NEWS")) {
      return theme.colors.Section["US News"]
    } else if (normalizedText.includes("WORLD NEWS")) {
      return theme.colors.Section["World News"]
    } else if (normalizedText.includes("UK NEWS")) {
      return theme.colors.Section["UK News"]
    } else {
      return theme.colors.Section.News // Default to News
    }
  }

  // Default colors based on text or category
  let defaultBgColor = category ? getSectionColor(category) : getSectionColor(text)

  let defaultTextColor = theme.colors.Text.Inverse

  // Special cases for specific flags
  if (text.toUpperCase() === "EXCLUSIVE") {
    defaultBgColor = "#4361ee" // Blue color for EXCLUSIVE
  } else if (text.toUpperCase().includes("FIND")) {
    defaultBgColor = "#f9c74f" // Yellow for FIND alerts
    defaultTextColor = "#000000"
  } else if (text.toUpperCase().includes("SEA")) {
    defaultBgColor = "#43aa8b" // Teal for SEA related
  } else if (text.toUpperCase().includes("ICE")) {
    defaultBgColor = "#90e0ef" // Light blue for ICE related
    defaultTextColor = "#000000"
  }

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

