import type { Article } from './article';
import type { NavigationParams } from './shared';

/**
 * Props for the ArticleScreen component
 */
export interface ArticleScreenProps {
  route: {
    params: NavigationParams;
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

/**
 * Props for the ArticleSwipeScreen component
 */
export interface ArticleSwipeScreenProps {
  route: {
    params: NavigationParams;
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

/**
 * Props for the TodayScreen component
 */
export interface TodayScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

/**
 * Props for the CategoryScreen component
 */
export interface CategoryScreenProps {
  route: {
    params: {
      category: {
        id: string | number;
        name: string;
      };
    };
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

/**
 * Props for the ArticleStackScreen component
 */
export interface ArticleStackScreenProps {
  route: {
    params: NavigationParams;
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
} 