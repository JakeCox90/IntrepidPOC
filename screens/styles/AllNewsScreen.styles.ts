import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createAllNewsScreenStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.Surface.Secondary,
    },
    contentContainer: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
    },
    emptyContainer: {
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      textAlign: 'center',
    },
    errorContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    errorSubtext: {
      textAlign: 'center',
    },
    errorText: {
      marginBottom: 8,
    },
    newsList: {
      padding: 16,
    },
    newsListContainer: {
      flex: 1,
    },
    horizontalCardsContainer: {
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.Border.Primary,
      paddingTop: 12,
    },
    horizontalCardWrapper: {
      marginBottom: 12,
    },
  }); 