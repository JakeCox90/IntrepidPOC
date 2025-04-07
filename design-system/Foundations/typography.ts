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

