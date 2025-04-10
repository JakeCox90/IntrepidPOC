'use client';

import type React from 'react';
import { Text, type TextStyle, type TextProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { type TypographyVariant } from '../design-system/typography';

// Default styles to use when theme is not available
const defaultFontSizes = {
  'size-12': 12,
  'size-14': 14,
  'size-16': 16,
  'size-18': 18,
  'size-20': 20,
  'size-24': 24,
  'size-32': 32,
  'size-40': 40,
};

const defaultLineHeights = {
  'size-12': 16,
  'size-14': 20,
  'size-16': 24,
  'size-18': 28,
  'size-20': 28,
  'size-24': 32,
  'size-32': 40,
  'size-40': 48,
};

const defaultVariants = {
  'display-01': { scale: 'size-40', weight: 'bold', lineHeight: 48 },
  'display-02': { scale: 'size-32', weight: 'bold', lineHeight: 40 },
  'title-01': { scale: 'size-24', weight: 'bold', lineHeight: 32 },
  'title-02': { scale: 'size-20', weight: 'bold', lineHeight: 28 },
  'subtitle-01': { scale: 'size-18', weight: 'semiBold', lineHeight: 24 },
  'subtitle-02': { scale: 'size-16', weight: 'semiBold', lineHeight: 24 },
  'body-01': { scale: 'size-16', weight: 'regular', lineHeight: 24 },
  'body-02': { scale: 'size-14', weight: 'regular', lineHeight: 20 },
  'caption-01': { scale: 'size-12', weight: 'regular', lineHeight: 16 },
  'button': { scale: 'size-14', weight: 'medium', lineHeight: 20 },
  'overline': { scale: 'size-14', weight: 'semiBold', textTransform: 'uppercase', lineHeight: 20, letterSpacing: 1 },
};

interface TypographyProps extends TextProps {
  variant: TypographyVariant;
  color?: string;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const Typography = ({ variant, color, style, children, ...props }: TypographyProps) => {
  // Safely get theme with fallbacks for when it's not available
  const theme = useTheme();
  
  // Get variant style with fallback to default
  const variantStyle = theme?.typography?.variants?.[variant] || defaultVariants[variant];
  
  // Safely destructure properties with fallbacks
  const { 
    scale = 'size-16', 
    weight = 'regular', 
    lineHeight, 
    letterSpacing, 
    textTransform 
  } = variantStyle || {};

  // Determine font family with fallback
  const fontFamily = (() => {
    // If theme is available and has fontFamily
    if (theme?.typography?.fontFamily?.[weight]) {
      return theme.typography.fontFamily[weight];
    }
    
    // Default font mappings if theme is unavailable
    switch (weight) {
      case 'bold': return 'Inter-Bold';
      case 'semiBold': return 'Inter-SemiBold';
      case 'medium': return 'Inter-Medium';
      default: return 'Inter-Regular';
    }
  })();

  return (
    <Text
      style={[
        {
          // Use font size with fallback
          fontSize: theme?.typography?.scale?.[scale] || defaultFontSizes[scale] || 16,
          
          // Use line height with fallbacks
          lineHeight: lineHeight || 
                      theme?.typography?.lineHeight?.[scale] || 
                      defaultLineHeights[scale] || 24,
          
          // Use font family with fallback
          fontFamily,
          
          // Use color with fallback
          color: color || 
                 theme?.colors?.Text?.Primary || 
                 '#000000',
          
          // Apply optional properties only if they exist
          ...(letterSpacing && { letterSpacing }),
          ...(textTransform && { textTransform }),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typography;
