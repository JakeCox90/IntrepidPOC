"use client"

import type React from "react"
import { Text, type TextStyle, type TextProps } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { type TypographyVariant } from "../design-system/typography"

interface TypographyProps extends TextProps {
  variant: TypographyVariant
  color?: string
  style?: TextStyle | TextStyle[]
  children: React.ReactNode
}

const Typography = ({ variant, color, style, children, ...props }: TypographyProps) => {
  const theme = useTheme()
  const variantStyle = theme.typography.variants[variant]
  const { scale, weight, lineHeight, letterSpacing, textTransform } = variantStyle

  return (
    <Text
      style={[
        {
          fontSize: theme.typography.scale[scale],
          lineHeight: lineHeight || theme.typography.lineHeight[scale],
          fontFamily: theme.typography.fontFamily[weight],
          color: color || theme.colors.Text.Primary,
          ...(letterSpacing && { letterSpacing }),
          ...(textTransform && { textTransform }),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

export default Typography

