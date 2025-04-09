import { StyleSheet } from "react-native"
import type { ThemeType } from "../../theme/ThemeProvider"

export const createCardHorizontalStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF",
      marginBottom: 16,
      paddingTop: 16,
      paddingBottom: 0,
      borderRadius: theme.radius["radius-default"],
      borderWidth: theme.borderWidth["10"],
      borderColor: theme.colors.Border["Border-Primary"],
    },
    contentContainer: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 0,
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
      backgroundColor: "#E5E5E5", // Lighter gray to match the screenshot
    },
    textContent: {
      flex: 1,
      justifyContent: "flex-start",
    },
    flagsContainer: {
      marginBottom: 4,
    },
    categoryText: {
      marginBottom: 4,
    },
    footer: {
      paddingHorizontal: 16,
      paddingBottom: 8,
      paddingTop: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: theme.colors.Border["Border-Primary"],
    },
    readTimeContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    readTimeText: {
      marginLeft: 6,
    },
    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionButton: {
      marginLeft: 16,
      padding: 4,
    },
  })
}
