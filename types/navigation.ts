import type { Article } from './article';

/**
 * Navigation parameters used across the app
 */
export interface NavigationParams {
  articleId?: string;
  article?: Article;
  category?: {
    id: string | number;
    name: string;
  };
  source?: string;
}

/**
 * Navigation type used for navigation actions
 */
export interface NavigationType {
  navigate: (name: string, params?: object) => void;
  reset: (state: { index: number; routes: { name: string; params?: object }[] }) => void;
  emit?: (event: string, ...args: unknown[]) => void;
} 