import { useCallback } from 'react';
import { Share } from 'react-native';
import { useContentCache } from './useContentCache';
import { getArticleById } from '../services/mockArticleService';
import { Article, Comment } from '../types';
import { isValidArticle, isValidComment, validateComments } from '../utils/typeValidation';

// Cache key prefix for articles
const ARTICLE_CACHE_PREFIX = 'article_';

interface UseArticleProps {
  articleId: string;
  initialArticle?: Article;
}

interface UseArticleReturn {
  article: Article | null;
  loading: boolean;
  error: Error | null;
  handleShare: () => Promise<void>;
  handleShowAllComments: () => void;
  handleSubmitComment: (text: string) => void;
  handleLikeComment: (commentId: string | number, isLiked: boolean) => void;
  handleReplyComment: (commentId: string | number) => void;
  handleViewReplies: (commentId: string | number) => void;
}

export const useArticle = ({ articleId, initialArticle }: UseArticleProps): UseArticleReturn => {
  // Use the useContentCache hook to manage article data
  const { data: rawArticle, loading, error, setData } = useContentCache<Article>(
    `${ARTICLE_CACHE_PREFIX}${articleId}`,
    async () => {
      // If we have the article in initial data, use that instead of fetching
      if (initialArticle) {
        return initialArticle;
      }
      // Otherwise fetch the article
      const fetchedArticle = await getArticleById(articleId);
      if (!fetchedArticle) {
        throw new Error('Article not found');
      }
      return fetchedArticle;
    },
    initialArticle // Use the article passed as initial data if available
  );

  // Validate the article data
  const article = rawArticle && isValidArticle(rawArticle) ? rawArticle : null;

  // Share functionality
  const handleShare = useCallback(async () => {
    if (!article) return;
    try {
      await Share.share({
        message: article.title,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  }, [article]);

  // Comment handlers
  const handleShowAllComments = useCallback(() => {
    // TODO: Implement show all comments functionality
    console.log('Show all comments');
  }, []);

  const handleSubmitComment = useCallback((text: string) => {
    // TODO: Implement comment submission
    console.log('Submit comment:', text);
  }, []);

  const handleLikeComment = useCallback((commentId: string | number, isLiked: boolean) => {
    // TODO: Implement comment like functionality
    console.log('Like comment:', commentId, 'Liked status:', isLiked);
  }, []);

  const handleReplyComment = useCallback((commentId: string | number) => {
    // TODO: Implement reply to comment functionality
    console.log('Reply to comment:', commentId);
  }, []);

  const handleViewReplies = useCallback((commentId: string | number) => {
    // TODO: Implement view replies functionality
    console.log('View replies for comment:', commentId);
  }, []);

  return {
    article,
    loading,
    error,
    handleShare,
    handleShowAllComments,
    handleSubmitComment,
    handleLikeComment,
    handleReplyComment,
    handleViewReplies,
  };
}; 