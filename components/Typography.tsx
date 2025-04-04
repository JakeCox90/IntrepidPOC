"use client"

import type React from "react"
import { Text, type TextStyle, type TextProps } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "overline"
  | "subtitle-01"
  | "subtitle-02"
  | "body-01"
  | "body-02"
  | "button"
  | "caption"
  | "annotation"
  | "helper"
  | "input-label"
  | "input-text"

interface TypographyProps extends TextProps {
  variant: TypographyVariant
  color?: string
  style?: TextStyle | TextStyle[]
  children: React.ReactNode
}

const Typography = ({ variant, color, style, children, ...props }: TypographyProps) => {
  const theme = useTheme()
  const typographyStyle = theme.typography.styles[variant]

  return (
    <Text
      style={[
        {
          fontSize: typographyStyle.fontSize,
          lineHeight: typographyStyle.lineHeight,
          fontFamily: typographyStyle.fontFamily,
          fontWeight: typographyStyle.fontWeight,
          color: color || theme.colors.Text.Primary,
          ...(typographyStyle.textTransform && { textTransform: typographyStyle.textTransform }),
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

