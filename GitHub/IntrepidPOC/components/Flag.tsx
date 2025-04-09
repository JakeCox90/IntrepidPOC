"use client"
import { View, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"
import { getCategoryColor } from "../utils/categoryColors"
import { createFlagStyles } from "./styles/Flag.styles"

type FlagVariant = "minimal" | "filled"

interface FlagProps {
  text: string
  color?: string
  backgroundColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
  category?: string
  variant?: FlagVariant
  typographyVariant?: "overline" | "annotation" | "caption"
}

const Flag = ({
  text,
  color,
  backgroundColor,
  style,
  textStyle,
  category,
  variant = "filled",
  typographyVariant = "overline",
}: FlagProps) => {
  const theme = useTheme()
  const styles = createFlagStyles(theme)

  // Default colors based on text or category
  const defaultBgColor = category ? getCategoryColor(category, theme) : getCategoryColor(text, theme)
  const defaultTextColor = variant === "filled" ? theme.colors.Text.Inverse : defaultBgColor

  if (variant === "minimal") {
    return (
      <Typography variant={typographyVariant} color={color || defaultBgColor} style={[textStyle]}>
        {text.toUpperCase()}
      </Typography>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || defaultBgColor }, style]}>
      <Typography variant={typographyVariant} color={color || defaultTextColor} style={textStyle}>
        {text.toUpperCase()}
      </Typography>
    </View>
  )
}

export default Flag
