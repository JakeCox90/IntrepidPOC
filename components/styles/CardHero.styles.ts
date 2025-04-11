import { StyleSheet } from 'react-native';
import type { ThemeType } from '../../theme/ThemeProvider';
import { cardStyles } from '../../utils/cardStyles';

export const createCardHeroStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    category: {
      marginBottom: 4,
    },
    container: {
      ...cardStyles.container,
      ...cardStyles.heroContainer,
      borderColor: theme.colors.Border.Primary,
      borderWidth: theme.borderWidth['10'],
    },
    flagContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    flag: {
      marginRight: 8,
    },
    heroContent: {
      padding: 16,
    },
    image: {
      ...cardStyles.heroImage,
    },
    subtitle: {
      marginBottom: 12,
    },
    title: {
      marginBottom: 8,
    },
  });
};
