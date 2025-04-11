import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

// Static styles that don't use theme
export const styles = StyleSheet.create({
  articleContent: {
    flex: 1,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  container: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});

// Function to create dynamic styles that use theme
export const createDynamicStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    articleCard: {
      borderRadius: 8,
      elevation: 2,
      marginBottom: 16,
      padding: 16,
      shadowColor: theme.colors.Text.Secondary, // Using a color that exists in the theme
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  });
};
