'use client';

import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { CommentProps } from '../types';
import { formatRelativeTime } from '../utils/timeFormat';
import { useState } from 'react';
import { createCommentItemStyles } from './styles/CommentItem.styles';

const CommentItem = ({ comment, isLiked: initialIsLiked, onLike, onReply, onViewReplies }: CommentProps) => {
  const theme = useTheme();
  const styles = createCommentItemStyles(theme);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(comment.likes);

  // Format the timestamp to a human-readable format
  const formattedTime = formatRelativeTime(comment.createdAt);
  
  // Check if the comment has replies
  const hasReplies = Array.isArray(comment.replies) && comment.replies.length > 0;
  const repliesCount = hasReplies ? comment.replies.length : 0;

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    }
    onLike(comment.id);
  };

  return (
    <View
      style={[
        styles.commentItem,
        {
          backgroundColor: theme.colors.Surface.Primary,
          borderColor: theme.colors.Border.Primary,
          borderWidth: theme.borderWidth['10'],
          borderRadius: theme.radius['radius-default'],
        },
      ]}
    >
      <View style={styles.commentHeader}>
        <View style={styles.commentAuthorContainer}>
          <View style={styles.avatarContainer}>
            {/* Placeholder avatar - in a real app, you would use the user's avatar */}
            <View style={[styles.avatar, { borderRadius: theme.radius['radius-default'] }]} />
          </View>
          <View style={styles.commentContent}>
            <View style={styles.nameTimeContainer}>
              <Typography
                variant="subtitle-02"
                color={theme.colors.Text.Primary}
                style={styles.authorName}
              >
                {comment.author.name}
              </Typography>
              <Typography
                variant="body-02"
                color={theme.colors.Text.Secondary}
                style={styles.commentTime}
              >
                {formattedTime}
              </Typography>
            </View>
            <Typography
              variant="body-02"
              color={theme.colors.Text.Secondary}
              style={styles.commentText}
            >
              {comment.text}
            </Typography>
            
            {/* Reply button below comment text */}
            <TouchableOpacity
              style={styles.replyButton}
              onPress={() => onReply(comment.id)}
            >
              <Typography 
                variant="body-02" 
                color={theme.colors.Primary.Resting}
              >
                Reply
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Like button moved to the right side */}
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
      </View>

      {/* View replies button */}
      {hasReplies && onViewReplies && (
        <View style={styles.repliesContainer}>
          <View 
            style={[
              styles.divider, 
              { 
                borderTopWidth: theme.borderWidth['10'],
                borderTopColor: theme.colors.Border.Primary,
              }
            ]} 
          />
          <TouchableOpacity
            style={styles.viewRepliesContainer}
            onPress={() => onViewReplies(comment.id)}
          >
            <Typography variant="body-02" color={theme.colors.Primary.Resting}>
              View {repliesCount} {repliesCount === 1 ? 'reply' : 'replies'}
            </Typography>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CommentItem; 