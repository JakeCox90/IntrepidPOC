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
} 