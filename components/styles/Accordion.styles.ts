import { StyleSheet } from 'react-native';
import type { ThemeType } from '../../theme/ThemeProvider';

/**
 * Creates theme-dependent styles for the Accordion component
 * 
 * This function should be called inside components with the theme from useTheme().
 * 
 * Example usage:
 * 
 * const MyComponent = () => {
 *   const theme = useTheme();
 *   const styles = createAccordionStyles(theme);
 *   return <View style={styles.wrapper}>...</View>;
 * };
 */
export const createAccordionStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    // Group: Container and layout styles
    wrapper: {
      marginBottom: 16,
      overflow: 'hidden',
      backgroundColor: theme.colors.Surface.Primary,
      borderRadius: theme.radius['radius-default'],
      borderWidth: theme.borderWidth['10'],
      borderColor: theme.colors.Border.Primary,
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 68,
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    content: {
      padding: 16,
    },
    contentContainer: {
      overflow: 'hidden',
    },

    // Group: State-specific styles
    collapsedHeader: {
      borderBottomWidth: 0,
      borderRadius: 0,
    },
    expandedHeader: {
      borderBottomWidth: 1,
      borderColor: theme.colors.Border.Primary,
      borderRadius: 0,
    },
    expandedContent: {
      height: 'auto',
    },
  });
}; 