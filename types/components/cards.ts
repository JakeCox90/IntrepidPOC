import type { StyleProp, ViewStyle } from 'react-native';
import type React from 'react';

/**
 * Card Component Types
 * This file contains type definitions for card components used throughout the application.
 */

/**
 * Base props for all card components
 * Contains common properties shared across different card types
 */
export interface CardBaseProps {
  /** Unique identifier for the card */
  id?: number | string;
  /** Callback function when card is pressed */
  onPress?: () => void;
  /** Callback function when bookmark button is pressed */
  onBookmark?: () => void;
  /** Callback function when share button is pressed */
  onShare?: () => void;
  /** Custom styles for the card container */
  style?: StyleProp<ViewStyle>;
  /** Custom styles for the card footer */
  footerStyle?: StyleProp<ViewStyle>;
  /** Card content */
  children?: React.ReactNode;
  /** Estimated read time for the content */
  readTime?: string;
  /** Timestamp for when the content was published/updated */
  timestamp?: string;
  /** Whether to render the footer */
  renderFooter?: boolean;
}

/**
 * Props for the CardHero component
 * Used for featured or hero card layouts
 */
export interface CardHeroProps extends Omit<CardBaseProps, 'children'> {
  /** Main title of the article */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** URL of the hero image */
  imageUrl: string;
  /** Category of the article */
  category?: string;
  /** Special flag (e.g., 'EXCLUSIVE', 'BREAKING') */
  flag?: string;
}

/**
 * Props for the CardHorizontal component
 * Used for horizontal card layouts
 */
export interface CardHorizontalProps extends Omit<CardBaseProps, 'children'> {
  /** Main title of the article */
  title: string;
  /** URL of the article image */
  imageUrl: string;
  /** Category of the article */
  category: string;
  /** Special flag (e.g., 'EXCLUSIVE', 'BREAKING') */
  flag?: string;
} 