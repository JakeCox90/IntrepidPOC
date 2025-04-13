/**
 * Type Validation Utilities
 * 
 * This file contains utility functions to validate that objects conform to our type definitions.
 * These functions can be used for runtime type checking, especially when dealing with external data.
 */

import { Comment, CommentAuthor, Article, CacheItem } from '../types';

/**
 * Type guard to check if an object is a valid CommentAuthor
 */
export function isValidCommentAuthor(author: any): author is CommentAuthor {
  return (
    author &&
    typeof author === 'object' &&
    typeof author.id === 'string' &&
    typeof author.name === 'string' &&
    (author.avatar === undefined || typeof author.avatar === 'string')
  );
}

/**
 * Type guard to check if an object is a valid Comment
 */
export function isValidComment(comment: any): comment is Comment {
  if (!comment || typeof comment !== 'object') return false;
  
  // Check required fields
  if (
    typeof comment.id === 'undefined' ||
    typeof comment.userId !== 'string' ||
    !isValidCommentAuthor(comment.author) ||
    typeof comment.text !== 'string' ||
    typeof comment.createdAt !== 'string' ||
    typeof comment.updatedAt !== 'string' ||
    typeof comment.likes !== 'number'
  ) {
    return false;
  }
  
  // Check optional fields if they exist
  if (comment.replies !== undefined) {
    if (!Array.isArray(comment.replies)) return false;
    if (!comment.replies.every((reply: any) => isValidComment(reply))) return false;
  }
  
  if (comment.isEdited !== undefined && typeof comment.isEdited !== 'boolean') return false;
  if (comment.parentId !== undefined && typeof comment.parentId !== 'string' && typeof comment.parentId !== 'number') return false;
  
  return true;
}

/**
 * Type guard to check if an object is a valid Article
 */
export function isValidArticle(article: any): article is Article {
  return (
    article &&
    typeof article === 'object' &&
    typeof article.id === 'string' &&
    typeof article.title === 'string' &&
    typeof article.content === 'string' &&
    typeof article.author === 'string' &&
    typeof article.date === 'string' &&
    typeof article.imageUrl === 'string' &&
    typeof article.category === 'string' &&
    typeof article.timestamp === 'string' &&
    typeof article.summary === 'string' &&
    (article.subcategory === undefined || typeof article.subcategory === 'string') &&
    (article.flag === undefined || typeof article.flag === 'string') &&
    (article.readTime === undefined || typeof article.readTime === 'string') &&
    (article.tags === undefined || Array.isArray(article.tags)) &&
    (article.relatedArticles === undefined || Array.isArray(article.relatedArticles))
  );
}

/**
 * Type guard to check if an object is a valid CacheItem
 */
export function isValidCacheItem<T>(item: any, dataValidator?: (data: any) => data is T): item is CacheItem<T> {
  if (!item || typeof item !== 'object') return false;
  
  // Check required fields
  if (typeof item.timestamp !== 'number') return false;
  
  // If a data validator is provided, use it to validate the data
  if (dataValidator) {
    return dataValidator(item.data);
  }
  
  // Otherwise, just check that data exists
  return item.data !== undefined;
}

/**
 * Validates an array of comments
 */
export function validateComments(comments: any[]): Comment[] {
  return comments.filter(isValidComment);
}

/**
 * Validates a single comment and returns it if valid, or null if invalid
 */
export function validateComment(comment: any): Comment | null {
  return isValidComment(comment) ? comment : null;
} 