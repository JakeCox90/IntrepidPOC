'use client';

import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { CommentProps } from '../types';
import { formatRelativeTime } from '../utils/timeFormat';
import { useState, useCallback, useMemo, memo } from 'react';
import { createCommentItemStyles } from './styles/CommentItem.styles';

const CommentItem = ({ comment, isLiked: initialIsLiked, onLike, onReply, onViewReplies }: CommentProps) => {
  const theme = useTheme();
  const styles = createCommentItemStyles(theme);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(comment.likes);

  // Format the timestamp to a human-readable format - memoize to prevent unnecessary formatting
  const formattedTime = useMemo(() => formatRelativeTime(comment.createdAt), [comment.createdAt]);
  
  // Check if the comment has replies - memoize to prevent unnecessary calculations
  const { hasReplies, repliesCount } = useMemo(() => {
    const hasReplies = comment.replies !== undefined && Array.isArray(comment.replies) && comment.replies.length > 0;
    const repliesCount = hasReplies && comment.replies ? comment.replies.length : 0;
    return { hasReplies, repliesCount };
  }, [comment.replies]);

  const handleLike = useCallback(() => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    }
    onLike(comment.id);
  }, [isLiked, onLike, comment.id]);

  const handleReply = useCallback(() => {
    onReply(comment.id);
  }, [onReply, comment.id]);

  const handleViewReplies = useCallback(() => {
    if (onViewReplies) {
      onViewReplies(comment.id);
    }
  }, [onViewReplies, comment.id]);

  // Memoize the author name component
  const AuthorName = useMemo(() => (
    <Typography
      variant="subtitle-02"
      color={theme.colors.Text.Primary}
      style={styles.authorName}
    >
      {comment.author.name}
    </Typography>
  ), [comment.author.name, theme.colors.Text.Primary, styles.authorName]);

  // Memoize the comment time component
  const CommentTime = useMemo(() => (
    <Typography
      variant="body-02"
      color={theme.colors.Text.Secondary}
      style={styles.commentTime}
    >
      {formattedTime}
    </Typography>
  ), [formattedTime, theme.colors.Text.Secondary, styles.commentTime]);

  // Memoize the comment text component
  const CommentText = useMemo(() => (
    <Typography
      variant="body-02"
      color={theme.colors.Text.Secondary}
      style={styles.commentText}
    >
      {comment.text}
    </Typography>
  ), [comment.text, theme.colors.Text.Secondary, styles.commentText]);

  // Memoize the reply button component
  const ReplyButton = useMemo(() => (
    <TouchableOpacity
      style={styles.replyButton}
      onPress={handleReply}
    >
      <Typography 
        variant="body-02" 
        color={theme.colors.Primary.Resting}
      >
        Reply
      </Typography>
    </TouchableOpacity>
  ), [styles.replyButton, theme.colors.Primary.Resting, handleReply]);

  // Memoize the like button component
  const LikeButton = useMemo(() => (
    <TouchableOpacity
      style={styles.likeButton}
      onPress={handleLike}
    >
      <View style={styles.likeContainer}>
        <Ionicons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={theme.space['40']}
          color={isLiked ? theme.colors.Primary.Resting : theme.colors.Text.Secondary}
        />
        {likesCount > 0 && (
          <Typography
            variant="body-02"
            color={isLiked ? theme.colors.Primary.Resting : theme.colors.Text.Secondary}
            style={styles.likeCount}
          >
            {likesCount}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  ), [isLiked, likesCount, styles.likeButton, styles.likeContainer, styles.likeCount, theme.colors.Primary.Resting, theme.colors.Text.Secondary, theme.space, handleLike]);

  // Memoize the view replies button component
  const ViewRepliesButton = useMemo(() => (
    hasReplies && onViewReplies ? (
      <View style={styles.repliesContainer}>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.viewRepliesContainer}
          onPress={handleViewReplies}
        >
          <Typography variant="body-02" color={theme.colors.Primary.Resting}>
            View {repliesCount} {repliesCount === 1 ? 'reply' : 'replies'}
          </Typography>
        </TouchableOpacity>
      </View>
    ) : null
  ), [hasReplies, onViewReplies, styles.repliesContainer, styles.divider, styles.viewRepliesContainer, theme.colors.Primary.Resting, repliesCount, handleViewReplies]);

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <View style={styles.commentAuthorContainer}>
          <View style={styles.avatarContainer}>
            {/* Placeholder avatar - in a real app, you would use the user's avatar */}
            <View style={styles.avatar} />
          </View>
          <View style={styles.commentContent}>
            <View style={styles.nameTimeContainer}>
              {AuthorName}
              {CommentTime}
            </View>
            {CommentText}
            {ReplyButton}
          </View>
        </View>
        
        {/* Like button moved to the right side */}
        {LikeButton}
      </View>

      {/* View replies button */}
      {ViewRepliesButton}
    </View>
  );
};

export default memo(CommentItem); 