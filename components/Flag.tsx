'use client';
import { View, type ViewStyle, type TextStyle } from 'react-native';
import { useMemo, memo } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { getCategoryColor } from '../utils/categoryColors';
import { createFlagStyles } from './styles/Flag.styles';
import { FlagProps, FlagVariant } from '../types/shared';

const Flag = ({
  text,
  color,
  backgroundColor,
  style,
  textStyle,
  category,
  variant = 'filled',
}: FlagProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createFlagStyles(theme), [theme]);

  // Default colors based on text or category - memoize to prevent unnecessary calculations
  const { defaultBgColor, defaultTextColor } = useMemo(() => {
    const bgColor = category
      ? getCategoryColor(category, theme)
      : getCategoryColor(text, theme);
    const txtColor = variant === 'filled' ? theme.colors.Text.Inverse : bgColor;
    
    return {
      defaultBgColor: bgColor,
      defaultTextColor: txtColor
    };
  }, [category, text, theme, variant]);

  // Memoize the text style
  const sharedTextStyle = useMemo((): TextStyle[] => [
    styles.text,
    ...(textStyle ? [textStyle] : []),
  ], [styles.text, textStyle]);

  // Memoize the text component
  const TextComponent = useMemo(() => (
    <Typography 
      variant="overline" 
      color={color || (variant === 'minimal' ? defaultBgColor : defaultTextColor)} 
      style={sharedTextStyle}
    >
      {text.toUpperCase()}
    </Typography>
  ), [color, variant, defaultBgColor, defaultTextColor, sharedTextStyle, text]);

  // Render minimal variant
  if (variant === 'minimal') {
    return (
      <View style={[styles.minimalContainer, style]}>
        {TextComponent}
      </View>
    );
  }

  // Render filled variant
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || defaultBgColor }, style]}>
      {TextComponent}
    </View>
  );
};

export default memo(Flag);
