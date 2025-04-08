import { StyleSheet } from "react-native"
import type { ThemeType } from "../../theme/ThemeProvider"

export const createCardHorizontalStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF",
      marginBottom: 16,
      paddingVertical: 16,
      borderRadius: theme.radius["radius-default"],
      borderWidth: theme.borderWidth["10"],
      borderColor: theme.colors.Border["Border-Primary"],
    },
    contentContainer: {
      flexDirection: "row",
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    imageContainer: {
      marginRight: 16,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    placeholderImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.Border["Skeleton-01"],
    },
    textContent: {
      flex: 1,
    },
    flagsContainer: {
      flexDirection: "row",
      marginBottom: 8,
    },
    title: {
      // Let the h6 token control the typography
    },
    footer: {
      paddingBottom: 0,
    },
  })
}
