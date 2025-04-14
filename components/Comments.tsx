'use client';

import React, { useCallback, useMemo } from 'react';
import { View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { Comment as CommentType, CommentsProps } from '../types';
import CommentItem from './CommentItem';
import { validateComments } from '../utils/typeValidation';
import { createCommentsStyles } from './styles/Comments.styles';
import { withPerformanceTracking } from '../utils/performance';

// Memoize the CommentItem component to prevent unnecessary re-renders
const MemoizedCommentItem = React.memo(CommentItem);

const Comments: React.FC<CommentsProps> = ({
  comments,
  totalComments = 0,
  onShowAllPress,
  onSubmitComment,
  onLikeComment,
  onReplyComment,
  onViewReplies,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createCommentsStyles(theme), [theme]);
  const [commentText, setCommentText] = React.useState('');
  const [likedComments, setLikedComments] = React.useState<Record<string | number, boolean>>({});

  // Validate comments array - memoize to prevent unnecessary validation
  const validComments = useMemo(() => validateComments(comments), [comments]);

  const handleSubmitComment = useCallback(() => {
    if (commentText.trim() && onSubmitComment) {
      onSubmitComment(commentText.trim());
      setCommentText('');
    }
  }, [commentText, onSubmitComment]);

  const handleLikeComment = useCallback((commentId: string | number) => {
    const isCurrentlyLiked = likedComments[commentId] || false;
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !isCurrentlyLiked
    }));
    if (onLikeComment) {
      onLikeComment(commentId, !isCurrentlyLiked);
    }
  }, [likedComments, onLikeComment]);

  const handleReplyComment = useCallback((commentId: string | number) => {
    if (onReplyComment) {
      onReplyComment(commentId);
    }
  }, [onReplyComment]);

  const handleViewReplies = useCallback((commentId: string | number) => {
    if (onViewReplies) {
      onViewReplies(commentId);
    }
  }, [onViewReplies]);

  const renderComment = useCallback(({ item: comment }: { item: CommentType }) => (
    <MemoizedCommentItem
      comment={comment}
      isLiked={likedComments[comment.id] || false}
      onLike={handleLikeComment}
      onReply={handleReplyComment}
      onViewReplies={handleViewReplies}
    />
  ), [likedComments, handleLikeComment, handleReplyComment, handleViewReplies]);

  const keyExtractor = useCallback((item: CommentType) => item.id.toString(), []);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 100, // Approximate height of each comment
    offset: 100 * index,
    index,
  }), []);

  const ListFooterComponent = useMemo(() => (
    <>
      <View style={{ height: theme.space['40'] }} />
      {totalComments > comments.length && onShowAllPress && (
        <TouchableOpacity onPress={onShowAllPress} style={{ alignItems: 'center' }}>
          <Typography 
            variant="body-02" 
            color={theme.colors.Primary.Resting}
            style={{ textAlign: 'center' }}
          >
            Show all {totalComments} comments
          </Typography>
        </TouchableOpacity>
      )}
      <View style={{ height: theme.space['70'] }} />
    </>
  ), [totalComments, comments.length, onShowAllPress, theme.space]);

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

        {/* Comments list with performance optimizations */}
        <FlatList
          data={validComments}
          renderItem={renderComment}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          contentContainerStyle={[styles.listContent, { paddingBottom: theme.space['60'] }]}
          ListFooterComponent={ListFooterComponent}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={3}
          initialNumToRender={3}
          updateCellsBatchingPeriod={50}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
          }}
        />
      </View>
    </View>
  );
};

export default withPerformanceTracking(React.memo(Comments), 'Comments');
