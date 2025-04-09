import { StyleSheet } from "react-native"
import type { ThemeType } from "../../theme/ThemeProvider"

export const createFlagStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      alignSelf: "flex-start",
    },
  })
}
