import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createCommentItemStyles = (theme: ThemeType) =>
  StyleSheet.create({
    authorName: {
      marginRight: theme.space['20'],
    },
    avatar: {
      backgroundColor: theme.colors.Surface.Secondary,
      height: theme.space['80'],
      width: theme.space['80'],
      borderRadius: theme.radius['radius-default'],
    },
    avatarContainer: {
      marginRight: theme.space['30'],
    },
    bulletPoint: {
      marginHorizontal: theme.space['20'],
    },
    commentAuthorContainer: {
      flexDirection: 'row',
      flex: 1,
    },
    commentContent: {
      flex: 1,
    },
    commentFooter: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    commentHeader: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.space['40'],
      paddingTop: theme.space['40'],
      paddingBottom: theme.space['40'],
    },
    commentItem: {
      marginBottom: theme.space['40'],
      overflow: 'hidden',
      backgroundColor: theme.colors.Surface.Primary,
      borderColor: theme.colors.Border.Primary,
      borderWidth: theme.borderWidth['10'],
      borderRadius: theme.radius['radius-default'],
    },
    commentText: {
      marginBottom: theme.space['20'],
    },
    commentTime: {},
    divider: {
      width: '100%',
      borderTopWidth: theme.borderWidth['10'],
      borderTopColor: theme.colors.Border.Primary,
    },
    likeButton: {
      padding: theme.space['10'],
      marginLeft: theme.space['20'],
    },
    likeContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    likeCount: {
      marginLeft: theme.space['10'],
    },
    nameTimeContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: theme.space['10'],
    },
    replyButton: {
      marginTop: theme.space['20'],
    },
    replyText: {},
    repliesContainer: {
      marginTop: 0,
    },
    viewRepliesContainer: {
      padding: theme.space['40'],
    },
  }); 