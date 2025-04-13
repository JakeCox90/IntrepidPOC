import React, { createContext, useContext, useState, useCallback } from 'react';

interface BookmarkContextType {
  bookmarkedArticles: Set<string | number>;
  toggleBookmark: (articleId: string | number) => void;
  isBookmarked: (articleId: string | number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string | number>>(new Set());

  const toggleBookmark = useCallback((articleId: string | number) => {
    setBookmarkedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  }, []);

  const isBookmarked = useCallback((articleId: string | number) => {
    return bookmarkedArticles.has(articleId);
  }, [bookmarkedArticles]);

  return (
    <BookmarkContext.Provider value={{ bookmarkedArticles, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
}; 