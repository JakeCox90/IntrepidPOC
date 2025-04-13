/**
 * Comment Types
 * This file contains type definitions for comments and related functionality.
 */

/**
 * Represents a user who authored a comment
 */
export interface CommentAuthor {
  /** Unique identifier for the user */
  id: string;
  /** Display name of the user */
  name: string;
  /** Optional URL to the user's avatar image */
  avatar?: string;
  /** Optional role or title of the user */
  role?: string;
  /** Optional verification status of the user */
  isVerified?: boolean;
}

/**
 * Represents a comment in the system
 */
export interface Comment {
  /** Unique identifier for the comment */
  id: string | number;
  /** Reference to the user who authored the comment */
  userId: string;
  /** Author information */
  author: CommentAuthor;
  /** The comment text content */
  text: string;
  /** ISO timestamp when the comment was created */
  createdAt: string;
  /** ISO timestamp when the comment was last updated */
  updatedAt: string;
  /** Number of likes the comment has received */
  likes: number;
  /** Optional array of replies to this comment */
  replies?: Comment[];
  /** Whether the comment has been edited */
  isEdited?: boolean;
  /** ID of the parent comment if this is a reply */
  parentId?: string | number;
  /** Optional metadata about the comment */
  metadata?: {
    /** Whether the comment is pinned */
    isPinned?: boolean;
    /** Whether the comment is hidden */
    isHidden?: boolean;
    /** Whether the comment is reported */
    isReported?: boolean;
    /** Optional reason for hiding/reporting */
    moderationReason?: string;
  };
  /** Optional array of user IDs who have liked this comment */
  likedBy?: string[];
  /** Optional array of user IDs who have reported this comment */
  reportedBy?: string[];
}

/**
 * Props for the Comment component
 */
export interface CommentProps {
  /** The comment data to display */
  comment: Comment;
  /** Whether the current user has liked this comment */
  isLiked: boolean;
  /** Callback when the like button is pressed */
  onLike: (commentId: string | number) => void;
  /** Callback when the reply button is pressed */
  onReply: (commentId: string | number) => void;
  /** Optional callback when viewing replies */
  onViewReplies?: (commentId: string | number) => void;
  /** Optional callback when reporting a comment */
  onReport?: (commentId: string | number, reason: string) => void;
  /** Optional callback when editing a comment */
  onEdit?: (commentId: string | number, newText: string) => void;
  /** Optional callback when deleting a comment */
  onDelete?: (commentId: string | number) => void;
  /** Whether the current user can moderate this comment */
  canModerate?: boolean;
  /** Whether the current user can edit this comment */
  canEdit?: boolean;
  /** Whether the current user can delete this comment */
  canDelete?: boolean;
}

/**
 * Props for the Comments component
 */
export interface CommentsProps {
  /** Array of comments to display */
  comments: Comment[];
  /** Total number of comments available */
  totalComments?: number;
  /** Optional callback when "Show all" is pressed */
  onShowAllPress?: () => void;
  /** Optional callback when a new comment is submitted */
  onSubmitComment?: (text: string) => void;
  /** Optional callback when a comment is liked/unliked */
  onLikeComment?: (commentId: string | number, isLiked: boolean) => void;
  /** Optional callback when replying to a comment */
  onReplyComment?: (commentId: string | number) => void;
  /** Optional callback when viewing replies to a comment */
  onViewReplies?: (commentId: string | number) => void;
  /** Optional callback when reporting a comment */
  onReportComment?: (commentId: string | number, reason: string) => void;
  /** Optional callback when editing a comment */
  onEditComment?: (commentId: string | number, newText: string) => void;
  /** Optional callback when deleting a comment */
  onDeleteComment?: (commentId: string | number) => void;
  /** Whether comments are currently loading */
  isLoading?: boolean;
  /** Optional error message to display */
  error?: string;
  /** Whether to show the comment input field */
  showCommentInput?: boolean;
  /** Maximum number of replies to show before "View more" */
  maxRepliesToShow?: number;
  /** Whether to enable comment moderation features */
  enableModeration?: boolean;
}

/**
 * Type for comment sorting options
 */
export type CommentSortOption = 'newest' | 'oldest' | 'mostLiked' | 'mostReplied';

/**
 * Type for comment filtering options
 */
export interface CommentFilterOptions {
  /** Whether to show only top-level comments */
  topLevelOnly?: boolean;
  /** Whether to show only comments with replies */
  withRepliesOnly?: boolean;
  /** Whether to show only comments from verified users */
  verifiedOnly?: boolean;
  /** Optional search term to filter comments */
  searchTerm?: string;
  /** Optional date range to filter comments */
  dateRange?: {
    start: string;
    end: string;
  };
} 