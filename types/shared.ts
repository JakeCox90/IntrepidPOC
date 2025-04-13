import { ViewStyle, TextStyle } from 'react-native';
import { Article } from './article';

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

// Re-export types from other files
export { Comment, CommentProps, CommentsProps } from './comments';
export { CacheItem, CacheOptions, CacheService } from './cache'; 