export type FontWeight = "regular" | "medium" | "semiBold" | "bold"

export type TypographyScale = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "display"

export type TypographyVariant =
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

export const typographyScale: Record<TypographyScale, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 40,
}

export const typographyLineHeight: Record<TypographyScale, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 36,
  xxxl: 40,
  display: 48,
}

export const typographyVariants: Record<TypographyVariant, {
  scale: TypographyScale
  weight: FontWeight
  lineHeight?: number
  letterSpacing?: number
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize"
}> = {
  h1: { scale: "display", weight: "bold" },
  h2: { scale: "xxxl", weight: "bold" },
  h3: { scale: "xxl", weight: "bold" },
  h4: { scale: "xl", weight: "semiBold" },
  h5: { scale: "lg", weight: "semiBold" },
  h6: { scale: "md", weight: "semiBold" },
  overline: { 
    scale: "xs", 
    weight: "medium", 
    textTransform: "uppercase",
    letterSpacing: 1.5
  },
  "subtitle-01": { scale: "lg", weight: "medium" },
  "subtitle-02": { scale: "md", weight: "medium" },
  "body-01": { scale: "md", weight: "regular" },
  "body-02": { scale: "sm", weight: "regular" },
  button: { scale: "md", weight: "medium" },
  caption: { scale: "xs", weight: "regular" },
  annotation: { scale: "xs", weight: "medium" },
  helper: { scale: "xs", weight: "regular" },
  "input-label": { scale: "sm", weight: "medium" },
  "input-text": { scale: "md", weight: "regular" },
} 