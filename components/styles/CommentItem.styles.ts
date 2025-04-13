import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createCommentItemStyles = (theme: ThemeType) =>
  StyleSheet.create({
    authorName: {
      marginRight: theme.space['20'],
    },
    avatar: {
      backgroundColor: theme.colors.Surface.Secondary,
      height: theme.space['40'],
      width: theme.space['40'],
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
    },
    commentText: {
      marginBottom: theme.space['20'],
    },
    commentTime: {},
    divider: {
      width: '100%',
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