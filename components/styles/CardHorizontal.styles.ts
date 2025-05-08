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
    container: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.Border.Primary,
      paddingBottom: 12,
      marginBottom: 12,
    },
    contentContainer: {
      flexDirection: 'row',
    },

    // Group: Text and content styles
    flagsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    textContent: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    title: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 4,
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

    // Group: Read time styles
    readTimeContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
};
