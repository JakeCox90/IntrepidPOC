import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createCommentsStyles = (theme: ThemeType) =>
  StyleSheet.create({
    // Container styles
    container: {
      flex: 1,
      backgroundColor: theme.colors.Surface.Primary,
    },

    // Comments section
    commentsSection: {
      flex: 1,
      backgroundColor: theme.colors.Surface.Primary,
    },
    commentSectionBackground: {
      backgroundColor: theme.colors.Surface.Secondary,
    },

    // Header section
    commentsSectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.space['40'],
      paddingTop: theme.space['60'],
      paddingBottom: theme.space['20'],
    },
    headerTitle: {
      flex: 1,
    },
    headerAction: {
      marginLeft: theme.space['20'],
    },

    // List styles
    listContent: {
      padding: theme.space['40'],
    },

    // Comment input section
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
      borderRadius: theme.radius['radius-default'],
      backgroundColor: theme.colors.Surface.Secondary,
      color: theme.colors.Text.Primary,
    },
    submitButton: {
      padding: theme.space['10'],
    },
  }); 