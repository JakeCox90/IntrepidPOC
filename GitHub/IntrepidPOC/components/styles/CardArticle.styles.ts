import { StyleSheet } from "react-native"
import type { ThemeType } from "../../theme/ThemeProvider"
import { cardStyles } from "../../utils/cardStyles"

export const createCardArticleStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      ...cardStyles.articleContainer,
      paddingVertical: 16,
      borderBottomColor: theme.colors.Border["Border-Primary"],
      borderWidth: theme.borderWidth["10"],
      borderColor: theme.colors.Border["Border-Primary"],
    },
    content: {
      ...cardStyles.articleContent,
      marginBottom: 12,
    },
    textContent: {
      ...cardStyles.articleTextContent,
      marginRight: 12,
    },
    flagContainer: {
      ...cardStyles.flagContainer,
      marginBottom: 8,
      flexDirection: "row",
    },
    title: {
      ...cardStyles.title,
      marginBottom: 0,
    },
    image: {
      ...cardStyles.articleImage,
    },
  })
}
