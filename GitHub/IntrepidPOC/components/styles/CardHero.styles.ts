import { StyleSheet } from "react-native"
import type { ThemeType } from "../../theme/ThemeProvider"
import { cardStyles } from "../../utils/cardStyles"

export const createCardHeroStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      ...cardStyles.container,
      ...cardStyles.heroContainer,
      borderWidth: theme.borderWidth["10"],
      borderColor: theme.colors.Border["Border-Primary"],
    },
    heroContent: {
      padding: 16,
    },
    flagContainer: {
      marginBottom: 8,
      flexDirection: "row",
    },
    category: {
      marginBottom: 4,
    },
    title: {
      marginBottom: 8,
    },
    subtitle: {
      marginBottom: 12,
    },
    image: {
      ...cardStyles.heroImage,
    },
  })
}
