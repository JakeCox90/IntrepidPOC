import { StyleSheet } from 'react-native';
import type { ThemeType } from '../../theme/ThemeProvider';
import { cardStyles } from '../../utils/cardStyles';

export const createCardArticleStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      ...cardStyles.articleContainer,
      borderBottomColor: theme.colors.Border['Border-Primary'],
      borderColor: theme.colors.Border['Border-Primary'],
      borderWidth: theme.borderWidth['10'],
      paddingVertical: 16,
    },
    content: {
      ...cardStyles.articleContent,
      marginBottom: 12,
    },
    flagContainer: {
      ...cardStyles.flagContainer,
      flexDirection: 'row',
      marginBottom: 8,
    },
    image: {
      ...cardStyles.articleImage,
    },
    textContent: {
      ...cardStyles.articleTextContent,
      marginRight: 12,
    },
    title: {
      ...cardStyles.title,
      marginBottom: 0,
    },
  });
};
