import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

// Static styles that don't use theme
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorSubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  searchButton: {
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  searchContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
  },
  searchInputContainer: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    marginRight: 8,
    paddingHorizontal: 12,
  },
  searchResults: {
    padding: 16,
  },
  trendingColumns: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  trendingContainer: {
    flex: 1,
    padding: 16,
  },
  trendingItem: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  trendingList: {
    paddingBottom: 16,
  },
  trendingTitle: {
    marginBottom: 16,
  },
});

// Function to create dynamic styles that use theme
export const createDynamicStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.Surface.Primary,
      flex: 1,
    },
    searchContainer: {
      borderBottomColor: theme.colors.Border.Primary,
      borderBottomWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchInput: {
      flex: 1,
      fontFamily: theme.typography.fontFamily[theme.typography.variants['input-text'].weight],
      fontSize: theme.typography.scale[theme.typography.variants['input-text'].scale],
      height: 44,
      lineHeight: theme.typography.lineHeight[theme.typography.variants['input-text'].scale],
    },
  });
};
