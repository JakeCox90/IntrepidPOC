'use client';

import type React from 'react';
import { Text, type TextStyle, type TextProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { type TypographyVariant } from '../design-system/typography';
import { typography } from '../design-system/Foundations/typography';
import { TypographyProps } from '../types/components';

const Typography = ({ variant, color, style, children, ...props }: TypographyProps) => {
  const theme = useTheme();

  // Get variant style from foundation tokens
  const variantStyle = typography.styles[variant] || typography.styles['body-01'];

  // Map numeric font weight to string key
  const getFontWeightKey = (weight: number): keyof typeof typography.fontFamily => {
    switch (weight) {
      case 400:
        return 'regular';
      case 500:
        return 'medium';
      case 600:
        return 'semiBold';
      case 700:
        return 'bold';
      default:
        return 'regular';
    }
  };

  // Convert numeric font weight to string for React Native
  const getFontWeightString = (weight: number): TextStyle['fontWeight'] => {
    switch (weight) {
      case 400:
        return '400';
      case 500:
        return '500';
      case 600:
        return '600';
      case 700:
        return '700';
      default:
        return '400';
    }
  };

  // Determine font family with fallback
  const fontWeight = variantStyle.fontWeight || 400;
  const fontFamily = theme?.typography?.fontFamily?.[getFontWeightKey(fontWeight)] || variantStyle.fontFamily || 'Inter-Regular';

  // Create properly typed style object
  const textStyle: TextStyle = {
    fontSize: variantStyle.fontSize,
    lineHeight: variantStyle.lineHeight,
    fontFamily,
    color: color || theme?.colors?.Text?.Primary || '#000000',
    fontWeight: getFontWeightString(fontWeight),
  };

  // Add textTransform if it exists and is a valid value
  if ('textTransform' in variantStyle && 
      (variantStyle.textTransform === 'uppercase' || 
       variantStyle.textTransform === 'lowercase' || 
       variantStyle.textTransform === 'capitalize' || 
       variantStyle.textTransform === 'none')) {
    textStyle.textTransform = variantStyle.textTransform;
  }

  return (
    <Text
      style={[textStyle, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typography;
