"use client"
import { View, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"
import { getCategoryColor } from "../utils/categoryColors"

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

  // Default colors based on text or category
  const defaultBgColor = category ? getCategoryColor(category, theme) : getCategoryColor(text, theme)
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

