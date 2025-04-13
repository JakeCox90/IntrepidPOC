'use client';

import React from 'react';
import { View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { Comment as CommentType, CommentsProps } from '../types';
import CommentItem from './CommentItem';
import { validateComments } from '../utils/typeValidation';
import { createCommentsStyles } from './styles/Comments.styles';

export const Comments: React.FC<CommentsProps> = ({
  comments,
  totalComments = 0,
  onShowAllPress,
  onSubmitComment,
  onLikeComment,
  onReplyComment,
  onViewReplies,
}) => {
  const theme = useTheme();
  const styles = createCommentsStyles(theme);
  const [commentText, setCommentText] = React.useState('');
  const [likedComments, setLikedComments] = React.useState<Record<string | number, boolean>>({});

  // Validate comments array
  const validComments = validateComments(comments);

  const handleSubmitComment = () => {
    if (commentText.trim() && onSubmitComment) {
      onSubmitComment(commentText.trim());
      setCommentText('');
    }
  };

  const handleLikeComment = (commentId: string | number) => {
    const isCurrentlyLiked = likedComments[commentId] || false;
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !isCurrentlyLiked
    }));
    if (onLikeComment) {
      onLikeComment(commentId, !isCurrentlyLiked);
    }
  };

  const handleReplyComment = (commentId: string | number) => {
    if (onReplyComment) {
      onReplyComment(commentId);
    }
  };

  const handleViewReplies = (commentId: string | number) => {
    if (onViewReplies) {
      onViewReplies(commentId);
    }
  };

  const renderComment = ({ item: comment }: { item: CommentType }) => (
    <CommentItem
      comment={comment}
      isLiked={likedComments[comment.id] || false}
      onLike={handleLikeComment}
      onReply={handleReplyComment}
      onViewReplies={handleViewReplies}
    />
  );

  return (
    <View style={styles.container}>
      <View style={[styles.commentsSection, styles.commentSectionBackground]}>
        <View style={styles.commentsSectionHeader}>
          <View style={styles.headerTitle}>
            <Typography variant="h5" color={theme.colors.Text.Primary}>
              Comments
            </Typography>
          </View>
          {totalComments > 0 && (
            <TouchableOpacity 
              style={styles.headerAction}
              onPress={onShowAllPress}
            >
              <Typography variant="button" color={theme.colors.Primary.Resting}>
                Show all ({totalComments})
              </Typography>
            </TouchableOpacity>
          )}
        </View>

        {/* Comments list */}
        <FlatList
          data={validComments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            totalComments > comments.length && onShowAllPress ? (
              <TouchableOpacity onPress={onShowAllPress}>
                <Typography variant="body-02" color={theme.colors.Primary.Resting}>
                  Show all {totalComments} comments
                </Typography>
              </TouchableOpacity>
            ) : null
          }
        />

        {/* Add comment input */}
        <View style={styles.addCommentContainer}>
          <TextInput
            style={styles.input}
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Add a comment..."
            placeholderTextColor={theme.colors.Text.Secondary}
            multiline
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitComment}
            disabled={!commentText.trim()}
          >
            <Ionicons
              name="send"
              size={24}
              color={commentText.trim() ? theme.colors.Primary.Resting : theme.colors.Text.Secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Comments;
