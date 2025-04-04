"use client"
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

interface FlagProps {
  text: string
  color?: string
  backgroundColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
}

const Flag = ({ text, color, backgroundColor, style, textStyle }: FlagProps) => {
  const theme = useTheme()

  // Default colors based on text
  let defaultBgColor = theme.colors.Primary.Resting
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
      <Text style={[styles.text, { color: color || defaultTextColor }, textStyle]}>{text.toUpperCase()}</Text>
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
  text: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
})

export default Flag

