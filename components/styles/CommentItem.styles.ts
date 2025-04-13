import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createCommentItemStyles = (theme: ThemeType) =>
  StyleSheet.create({
    // Container styles
    commentItem: {
      backgroundColor: theme.colors.Surface.Primary,
      borderColor: theme.colors.Border.Primary,
      borderWidth: theme.borderWidth['10'],
      borderRadius: theme.radius['radius-default'],
      marginBottom: theme.space['40'],
      overflow: 'hidden',
    },

    // Header section
    commentHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: theme.space['40'],
    },

    // Author section
    commentAuthorContainer: {
      flexDirection: 'row',
      flex: 1,
    },
    avatarContainer: {
      marginRight: theme.space['30'],
    },
    avatar: {
      backgroundColor: theme.colors.Surface.Secondary,
      height: theme.space['80'],
      width: theme.space['80'],
      borderRadius: theme.radius['radius-default'],
    },
    nameTimeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.space['10'],
    },
    authorName: {
      marginRight: theme.space['20'],
    },

    // Content section
    commentContent: {
      flex: 1,
    },
    commentText: {
      marginBottom: theme.space['20'],
    },

    // Interaction buttons
    replyButton: {
      marginTop: theme.space['20'],
    },
    likeButton: {
      padding: theme.space['10'],
      marginLeft: theme.space['20'],
    },
    likeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    likeCount: {
      marginLeft: theme.space['10'],
    },

    // Replies section
    repliesContainer: {
      marginTop: 0,
    },
    divider: {
      width: '100%',
      borderTopWidth: theme.borderWidth['10'],
      borderTopColor: theme.colors.Border.Primary,
    },
    viewRepliesContainer: {
      padding: theme.space['40'],
    },
  }); 