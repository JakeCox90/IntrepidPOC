import { StyleSheet } from 'react-native';
import type { ThemeType } from '../../theme/ThemeProvider';

export const createCardHorizontalStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    actionButton: {
      marginLeft: 16,
      padding: 4,
    },
    actionsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    categoryText: {
      marginBottom: 4,
    },
    container: {
      backgroundColor: '#FFFFFF',
      borderColor: theme.colors.Border['Border-Primary'],
      borderRadius: theme.radius['radius-default'],
      borderWidth: theme.borderWidth['10'],
      marginBottom: 16,
      paddingBottom: 0,
      paddingTop: 16,
    },
    contentContainer: {
      flexDirection: 'row',
      paddingBottom: 16,
      paddingHorizontal: 16,
      paddingTop: 0,
    },
    flagsContainer: {
      marginBottom: 4,
    },
    footer: {
      alignItems: 'center',
      borderTopColor: theme.colors.Border['Border-Primary'],
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 8,
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    image: {
      borderRadius: 8,
      height: 100,
      width: 100,
    },
    imageContainer: {
      marginRight: 16,
    },
    placeholderImage: {
      alignItems: 'center',
      backgroundColor: '#E5E5E5',
      borderRadius: 8,
      height: 100,
      justifyContent: 'center',
      width: 100, // Lighter gray to match the screenshot
    },
    readTimeContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    readTimeText: {
      marginLeft: 6,
    },
    textContent: {
      flex: 1,
      justifyContent: 'flex-start',
    },
  });
};
