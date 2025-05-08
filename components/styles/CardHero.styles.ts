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
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    flag: {
      marginRight: 8,
    },
    flagContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    heroContent: {
      paddingHorizontal: 0,
      paddingVertical: 12,
    },
    image: {
      ...cardStyles.heroImage,
      borderRadius: theme.radius['radius-default'],
    },
    subtitle: {
      marginBottom: 12,
    },
    title: {
      marginBottom: 8,
    },
    titleContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 8,
    },
    footer: {
      alignItems: 'center',
      borderTopColor: theme.colors.Border.Primary,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 8,
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    readTimeContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 8,
    },
    readTimeText: {
      marginLeft: 6,
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      marginLeft: 16,
      padding: 4,
    },
  });
};
