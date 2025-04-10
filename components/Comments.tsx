'use client';

import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';

interface CommentType {
  id: number | string;
  author: string;
  text: string;
  time: string;
  likes: number;
  replies?: CommentType[];
}

interface CommentsProps {
  comments: CommentType[];
  totalComments?: number;
  onShowAllPress?: () => void;
  onSubmitComment?: (text: string) => void;
  onLikeComment?: (commentId: number | string, isLiked: boolean) => void;
  onReplyComment?: (commentId: number | string) => void;
  onViewReplies?: (commentId: number | string) => void;
}

const Comments = ({
  comments: initialComments,
  totalComments = 0,
  onShowAllPress,
  onSubmitComment,
  onLikeComment,
  onReplyComment,
  onViewReplies,
}: CommentsProps) => {
  const theme = useTheme();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(initialComments);
  const [likedComments, setLikedComments] = useState<Record<string | number, boolean>>({});

  const handleSubmitComment = () => {
    if (commentText.trim() && onSubmitComment) {
      onSubmitComment(commentText.trim());
      setCommentText('');
    }
  };

  const handleLikeComment = (commentId: number | string) => {
    // Toggle like status
    const isCurrentlyLiked = likedComments[commentId] || false;
    const newLikedState = !isCurrentlyLiked;

    // Update liked comments state
    setLikedComments(prev => ({
      ...prev,
      [commentId]: newLikedState,
    }));

    // Update comment likes count
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes + (newLikedState ? 1 : -1),
          };
        }
        return comment;
      }),
    );

    // Call the parent handler if provided
    if (onLikeComment) {
      onLikeComment(commentId, newLikedState);
    }
  };

  const renderComment = ({ item }: { item: CommentType }) => {
    const isLiked = likedComments[item.id] || false;

    return (
      <View
        style={[
          styles.commentItem,
          {
            backgroundColor: theme.colors.Surface.Primary,
            borderColor: theme.colors.Border['Border-Primary'],
            borderWidth: theme.borderWidth['10'],
          },
        ]}
      >
        <View style={styles.commentHeader}>
          <View style={styles.commentAuthorContainer}>
            <View style={styles.avatarContainer}>
              {/* Placeholder avatar - in a real app, you would use the user's avatar */}
              <View style={styles.avatar} />
            </View>
            <View>
              <View style={styles.nameTimeContainer}>
                <Typography
                  variant="subtitle-02"
                  color={theme.colors.Text.Primary}
                  style={styles.authorName}
                >
                  {item.author}
                </Typography>
                <Typography
                  variant="body-02"
                  color={theme.colors.Text.Secondary}
                  style={styles.commentTime}
                >
                  {item.time}
                </Typography>
              </View>
              <Typography
                variant="body-02"
                color={theme.colors.Text.Secondary}
                style={styles.commentText}
              >
                {item.text}
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.commentFooter}>
          <TouchableOpacity
            style={styles.replyButton}
            onPress={() => onReplyComment && onReplyComment(item.id)}
          >
            <Typography
              variant="body-02"
              color={theme.colors.Primary.Resting}
              style={styles.replyText}
            >
              Reply
            </Typography>
          </TouchableOpacity>

          {item.replies && item.replies.length > 0 && (
            <View style={styles.viewRepliesContainer}>
              <Typography
                variant="body-02"
                color={theme.colors.Text.Secondary}
                style={styles.bulletPoint}
              >
                •
              </Typography>
              <TouchableOpacity onPress={() => onViewReplies && onViewReplies(item.id)}>
                <Typography variant="body-02" color={theme.colors.Text.Secondary}>
                  View {item.replies.length} {item.replies.length === 1 ? 'reply' : 'replies'}
                </Typography>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.likeContainer}>
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => handleLikeComment(item.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={24}
                color={isLiked ? theme.colors.Primary.Resting : theme.colors.Text.Secondary}
              />
            </TouchableOpacity>
            {item.likes > 0 && (
              <Typography
                variant="body-02"
                color={isLiked ? theme.colors.Primary.Resting : theme.colors.Text.Secondary}
                style={styles.likeCount}
              >
                {item.likes}
              </Typography>
            )}
          </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    addCommentContainer: {
      alignItems: 'center',
      borderTopColor: theme.colors.Border['Border-Primary'],
      borderTopWidth: 1,
      flexDirection: 'row',
      padding: 16,
    },
    authorName: {
      marginRight: 8,
    },
    avatar: {
      backgroundColor: theme.colors.Surface.Secondary,
      borderRadius: 16,
      height: 32,
      width: 32,
    },
    avatarContainer: {
      marginRight: 12,
    },
    bulletPoint: {
      marginHorizontal: 8,
    },
    commentAuthorContainer: {
      flexDirection: 'row',
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
      marginBottom: 8,
    },
    commentInput: {
      backgroundColor: theme.colors.Surface.Secondary,
      borderRadius: 8,
      flex: 1,
      fontFamily: theme.typography.fontFamily[theme.typography.variants['input-text'].weight],
      fontSize: theme.typography.scale[theme.typography.variants['input-text'].scale],
      lineHeight: theme.typography.lineHeight[theme.typography.variants['input-text'].scale],
      maxHeight: 120,
      minHeight: 40,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    commentItem: {
      borderRadius: 8,
      marginBottom: 16,
      padding: 16,
    },
    commentText: {
      marginBottom: 8,
    },
    commentTime: {},
    commentsList: {
      paddingBottom: 16,
    },
    commentsSection: {
      padding: 16,
    },
    commentsSectionHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    likeButton: {
      padding: 4,
    },
    likeContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    likeCount: {
      marginLeft: 4,
    },
    nameTimeContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 4,
    },
    replyButton: {
      marginRight: 8,
    },
    replyText: {},
    viewRepliesContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
    },
  });

  return (
    <View
      style={[
        styles.commentsSection,
        { backgroundColor: theme.isDark ? theme.colors.Surface.Secondary : '#F5F5F5' },
      ]}
    >
      <View style={styles.commentsSectionHeader}>
        <Typography variant="h5" color={theme.colors.Text.Primary}>
          Comments
        </Typography>
        {totalComments > 0 && (
          <TouchableOpacity onPress={onShowAllPress}>
            <Typography variant="button" color={theme.colors.Primary.Resting}>
              Show all ({totalComments})
            </Typography>
          </TouchableOpacity>
        )}
      </View>

      {/* Comments list */}
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.commentsList}
      />

      {/* Add comment input */}
      <View style={[styles.addCommentContainer, { backgroundColor: theme.colors.Surface.Primary }]}>
        <TextInput
          style={[
            styles.commentInput,
            {
              color: theme.colors.Text.Primary,
              textAlign: 'left',
              textAlignVertical: 'center',
            },
          ]}
          placeholder="Leave a comment"
          placeholderTextColor={theme.colors.Text.Secondary}
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
      </View>
    </View>
  );
};

export default Comments;
