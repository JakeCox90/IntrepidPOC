import type { ImageProps, TextProps, ViewStyle, TextStyle, DimensionValue } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import type React from 'react';
import { type TypographyVariant } from '../../design-system/typography';

/**
 * UI Component Types
 * This file contains type definitions for basic UI components used throughout the application.
 */

/**
 * Props for the Skeleton component
 * Used for loading state placeholders
 */
export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ViewStyle;
  borderRadius?: number;
}

/**
 * Props for the AnimatedSplash component
 * Used for the initial app loading screen
 */
export interface AnimatedSplashProps {
  onAnimationComplete: () => void;
}

/**
 * Props for the LazyImage component
 * Enhanced Image component with loading states
 */
export interface LazyImageProps extends ImageProps {
  fallbackSource?: number;
  showLoadingIndicator?: boolean;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

/**
 * Props for the SvgIcon component
 * Wrapper for SVG icons with consistent sizing
 */
export interface SvgIconProps extends Omit<SvgProps, 'width' | 'height'> {
  source: React.FC<SvgProps>;
  width?: number;
  height?: number;
  color?: string;
}

/**
 * Props for the Typography component
 * Text component with predefined styles
 */
export interface TypographyProps extends TextProps {
  variant: TypographyVariant;
  color?: string;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

/**
 * Props for the SkeletonLoader component
 * Container component for skeleton loading states
 */
export type SkeletonType =
  | 'today'
  | 'allNews'
  | 'search'
  | 'article'
  | 'catchUp'
  | 'hero'
  | 'horizontal'
  | 'forYou';

export interface SkeletonLoaderProps {
  type: SkeletonType;
  count?: number;
  showTitle?: boolean;
  title?: string;
}

/**
 * Props for the Tabs component
 * Navigation component for tabbed interfaces
 */
export interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
  variant?: 'primary' | 'secondary';
  backgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  textVariant?: 'overline' | 'body-02' | 'subtitle-02';
  animated?: boolean;
}

/**
 * Props for the AudioPlayer component
 * Media player for audio content
 */
export interface AudioPlayerProps {
  url: string;
  title?: string;
  author?: string;
  onComplete?: () => void;
  autoPlay?: boolean;
} 