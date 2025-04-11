import { StyleSheet } from 'react-native';
import type { ThemeType } from '../../theme/ThemeProvider';

/**
 * Creates theme-dependent styles for horizontal cards
 *
 * This function should be called inside components with the theme from useTheme().
 *
 * Example usage:
 *
 * const MyComponent = () => {
 *   const theme = useTheme();
 *   const styles = createCardHorizontalStyles(theme);
 *   return <View style={styles.container}>...</View>;
 * };
 */
export const createCardHorizontalStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    // Group: Container and layout styles
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
      backgroundColor: theme.colors.Surface.Primary,
      borderColor: theme.colors.Border.Primary,
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

    // Group: Text and content styles
    flagsContainer: {
      marginBottom: 4,
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

    // Group: Image styles
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
      backgroundColor: theme.colors.Border.Skeleton01,
      borderRadius: 8,
      height: 100,
      justifyContent: 'center',
      width: 100,
    },

    // Group: Footer and metadata styles
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
