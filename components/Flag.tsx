'use client';
import { View, type ViewStyle, type TextStyle } from 'react-native';
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
  const styles = createFlagStyles(theme);

  // Default colors based on text or category
  const defaultBgColor = category
    ? getCategoryColor(category, theme)
    : getCategoryColor(text, theme);
  const defaultTextColor = variant === 'filled' ? theme.colors.Text.Inverse : defaultBgColor;

  const sharedTextStyle: TextStyle[] = [
    styles.text,
    ...(textStyle ? [textStyle] : []),
  ];

  if (variant === 'minimal') {
    return (
      <View style={[styles.minimalContainer, style]}>
        <Typography variant="overline" color={color || defaultBgColor} style={sharedTextStyle}>
          {text.toUpperCase()}
        </Typography>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || defaultBgColor }, style]}>
      <Typography variant="overline" color={color || defaultTextColor} style={sharedTextStyle}>
        {text.toUpperCase()}
      </Typography>
    </View>
  );
};

export default Flag;
