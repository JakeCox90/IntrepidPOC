import { ViewStyle, TextStyle } from 'react-native';
import { Article } from './article';

// Navigation Types
export interface NavigationParams {
  articleId?: string;
  article?: Article;
  category?: {
    id: string | number;
    name: string;
  };
  source?: string;
}

// Comment Types
export interface Comment {
  id: string | number;
  author: string;
  text: string;
  time: string;
  likes: number;
  replies?: Comment[];
}

// Flag Types
export interface FlagProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  category?: string;
  variant?: FlagVariant;
}

export type FlagVariant = 'minimal' | 'filled';

// Cache Types
export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// Tab Types
export interface TabState {
  visited: boolean;
  lastVisited: number | null;
  loading: boolean;
  dataFetched: boolean;
  scrollPosition?: number;
}

export interface TabStates {
  [key: string]: TabState;
}

// Bundle Types
export interface Bundle {
  id: string;
  title: string;
  subtitle: string;
  storyCount: number;
  imageUrl: string;
}

// Navigation Types
export interface NavigationType {
  navigate: (name: string, params?: object) => void;
  reset: (state: { index: number; routes: { name: string; params?: object }[] }) => void;
  emit?: (event: string, ...args: unknown[]) => void;
}

// Header Types
export interface HeaderButton {
  label: string;
  onPress: () => void;
}

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightButtons?: HeaderButton[];
  backgroundColor?: string;
  textColor?: string;
  flag?: Pick<FlagProps, 'text' | 'category'> | null;
  titleStyle?: 'default' | 'large';
  showProfileButton?: boolean;
  onProfilePress?: () => void;
} 