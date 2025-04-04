import { palette, sizing } from "./primitives"

/**
 * Foundations
 *
 * The second level of the design system.
 * These are the semantic tokens that are used to build components.
 */

// Colors
export const colors = {
  // Brand colors
  Primary: {
    Resting: palette.blue[60],
    Disabled: palette.grey[30],
    Pressed: palette.blue[80],
    Selected: palette.blue[100],
  },
  Secondary: {
    Resting: palette.grey[30],
    Disabled: palette.grey[30],
    Pressed: palette.grey[40],
    Selected: palette.grey[90],
  },
  Text: {
    Primary: palette.grey[100],
    Secondary: palette.grey[60],
    Inverse: palette.grey[10],
    Disabled: palette.grey[40],
    Error: palette.red[70],
  },
  Surface: {
    Primary: palette.grey[10],
    Secondary: palette.grey[20],
    Disabled: palette.grey[30],
    "Overlay-01": palette.blackTint[70],
    "Overlay-02": palette.blackTint[20],
  },
  Error: {
    Resting: palette.red[30],
    Pressed: palette.red[80],
    Disabled: palette.grey[20],
  },
  Warning: {
    Resting: palette.amber[60],
    Pressed: palette.amber[80],
    Disabled: palette.amber[20],
  },
  Success: {
    Resting: palette.green[60],
    Pressed: palette.green[80],
    Disabled: palette.green[20],
  },
  Border: {
    "Border-Primary": palette.blackTint[10],
    "Border-Secondary": palette.blackTint[40],
    "Skeleton-01": palette.blackTint[20],
    "Skeleton-02": palette.blackTint[30],
    Error: palette.red[40],
  },
  Section: {
    Breaking: palette.yellow[60],
  },
}

// Border Width
export const borderWidths = {
  "00": 0,
  "10": 1,
  "20": 2,
  "30": 4,
}

// Opacity
export const opacity = {
  "0": 0,
  "10": 0.1,
  "20": 0.2,
  "30": 0.3,
  "40": 0.4,
  "50": 0.5,
  "60": 0.6,
  "70": 0.7,
  "80": 0.8,
  "90": 0.9,
  "100": 1,
}

// Space
export const space = {
  "00": sizing["00"],
  "10": sizing["10"],
  "20": sizing["20"],
  "30": sizing["30"],
  "40": sizing["40"],
  "50": sizing["50"],
  "60": sizing["60"],
  "70": sizing["70"],
  "80": sizing["80"],
  "90": sizing["90"],
  "100": sizing["100"],
  "110": sizing["110"],
  "120": sizing["120"],
  "130": sizing["130"],
}

// Radius
export const radius = {
  "radius-00": 0,
  "radius-05": 2,
  "radius-10": 4,
  "radius-20": 8,
  "radius-30": 12,
  "radius-40": 16,
  "radius-45": 20,
  "radius-50": 24,
  "radius-60": 32,
  "radius-default": 8,
  "radius-full": 9999,
  "radius-pill": 9999,
}

// Typography
export const fontSize = {
  "0": 68,
  "1": 47,
  "2": 33,
  "3": 24,
  "4": 20,
  "5": 16,
  "6": 14,
  "7": 18,
  "8": 12,
  "9": 10,
}

export const fontWeight = {
  regular: 400,
  "semi bold": 600,
  bold: 700,
}

export const lineHeight = {
  "0": 80,
  "1": 58,
  "2": 40,
  "3": 32,
  "4": 28,
  "5": 22,
  "6": 20,
  "7": 26,
  "8": 0,
}

// Typography styles
export const typography = {
  fontFamily: {
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semiBold: "Inter-SemiBold",
    bold: "Inter-Bold",
  },
  // Typography scale based on the design system
  styles: {
    h1: {
      fontSize: fontSize["0"],
      lineHeight: lineHeight["0"],
      fontWeight: fontWeight["bold"],
      fontFamily: "Inter-Bold",
    },
    h2: {
      fontSize: fontSize["1"],
      lineHeight: lineHeight["1"],
      fontWeight: fontWeight["bold"],
      fontFamily: "Inter-Bold",
    },
    h3: {
      fontSize: fontSize["2"],
      lineHeight: lineHeight["2"],
      fontWeight: fontWeight["bold"],
      fontFamily: "Inter-Bold",
    },
    h4: {
      fontSize: fontSize["3"],
      lineHeight: lineHeight["3"],
      fontWeight: fontWeight["bold"],
      fontFamily: "Inter-Bold",
    },
    h5: {
      fontSize: fontSize["4"],
      lineHeight: lineHeight["4"],
      fontWeight: fontWeight["bold"],
      fontFamily: "Inter-Bold",
    },
    h6: {
      fontSize: fontSize["5"],
      lineHeight: lineHeight["5"],
      fontWeight: fontWeight["bold"],
      fontFamily: "Inter-Bold",
    },
    overline: {
      fontSize: fontSize["6"],
      lineHeight: lineHeight["6"],
      fontWeight: fontWeight["semi bold"],
      fontFamily: "Inter-SemiBold",
      textTransform: "uppercase",
    },
    "subtitle-01": {
      fontSize: fontSize["7"],
      lineHeight: lineHeight["7"],
      fontWeight: fontWeight["semi bold"],
      fontFamily: "Inter-SemiBold",
    },
    "subtitle-02": {
      fontSize: fontSize["6"],
      lineHeight: lineHeight["6"],
      fontWeight: fontWeight["semi bold"],
      fontFamily: "Inter-SemiBold",
    },
    "body-01": {
      fontSize: fontSize["7"],
      lineHeight: lineHeight["7"],
      fontWeight: fontWeight["regular"],
      fontFamily: "Inter-Regular",
    },
    "body-02": {
      fontSize: fontSize["6"],
      lineHeight: lineHeight["5"],
      fontWeight: fontWeight["regular"],
      fontFamily: "Inter-Regular",
    },
    button: {
      fontSize: fontSize["6"],
      lineHeight: lineHeight["6"],
      fontWeight: 500, // Medium weight
      fontFamily: "Inter-Medium",
    },
    caption: {
      fontSize: fontSize["6"],
      lineHeight: 18, // Custom value
      fontWeight: fontWeight["regular"],
      fontFamily: "Inter-Regular",
    },
    annotation: {
      fontSize: fontSize["8"],
      lineHeight: 14, // Custom value
      fontWeight: fontWeight["regular"],
      fontFamily: "Inter-Regular",
    },
    helper: {
      fontSize: fontSize["6"],
      lineHeight: 16, // Custom value
      fontWeight: fontWeight["regular"],
      fontFamily: "Inter-Regular",
    },
    "input-label": {
      fontSize: fontSize["9"],
      lineHeight: 16, // Custom value
      fontWeight: 500, // Medium weight
      fontFamily: "Inter-Medium",
    },
    "input-text": {
      fontSize: fontSize["6"],
      lineHeight: 18, // Custom value
      fontWeight: fontWeight["regular"],
      fontFamily: "Inter-Regular",
    },
  },
}

// Shadows
export const shadows = {
  none: "none",
  sm: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  lg: "0px 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0px 20px 25px rgba(0, 0, 0, 0.15)",
}

// Z-index
export const zIndex = {
  base: 0,
  elevated: 1,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
}
export const borderWidth = borderWidths

