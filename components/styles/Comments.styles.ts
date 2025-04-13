import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createCommentsStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.Surface.Primary,
    },
    commentsSection: {
      flex: 1,
      backgroundColor: theme.colors.Surface.Primary,
    },
    commentSectionBackground: {
      backgroundColor: theme.colors.Surface.Secondary,
    },
    commentsSectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.space['40'],
    },
    headerTitle: {
      flex: 1,
    },
    headerAction: {
      marginLeft: theme.space['20'],
    },
    listContent: {
      padding: theme.space['40'],
    },
    addCommentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.space['20'],
      borderTopWidth: 1,
      borderTopColor: theme.colors.Border.Primary,
    },
    input: {
      flex: 1,
      marginRight: theme.space['20'],
      padding: theme.space['10'],
      borderRadius: 8,
      backgroundColor: theme.colors.Surface.Secondary,
      color: theme.colors.Text.Primary,
    },
    submitButton: {
      padding: theme.space['10'],
    },
    commentItem: {
      marginBottom: theme.space['20'],
      padding: theme.space['20'],
      borderRadius: 8,
    },
  }); 