import { ReactNode } from 'react';
import { View, ViewStyle, StyleProp, TextStyle } from 'react-native';
import Typography from '../components/Typography';
import { ThemeType } from '../theme/ThemeProvider';
import { getCategoryColor } from './categoryColors';

// Common acronyms and country codes that should not be colored
export const COMMON_ACRONYMS = [
  'UK', 'USA', 'US', 'EU', 'UN', 'NHS', 'BBC', 'ITV', 'CNN', 'FBI', 'CIA', 'NASA',
  'WHO', 'WTO', 'IMF', 'NATO', 'EU', 'UNESCO', 'UNICEF', 'WWF', 'FIFA', 'UEFA',
  'NBA', 'NFL', 'MLB', 'NHL', 'F1', 'GP', 'PM', 'MP', 'MPs',
  'CEO', 'CFO', 'CTO', 'COO', 'VIP', 'DIY', 'DNA', 'RNA', 'HIV', 'AIDS', 'COVID',
  'PCR',
];

interface RenderColoredTextProps {
  text: string;
  category: string;
  theme: ThemeType;
  typographyVariant: 'h3' | 'h5' | 'h6';
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Renders text with colored all-caps words based on category
 * @param text The text to render
 * @param category The category to determine the color
 * @param theme The current theme
 * @param typographyVariant The typography variant to use (h3, h5, or h6)
 * @param containerStyle Optional style for the container
 * @returns JSX element with colored text
 */
export const renderColoredText = ({
  text,
  category,
  theme,
  typographyVariant,
  containerStyle,
}: RenderColoredTextProps): JSX.Element => {
  // Split the text into words
  const words = text.split(' ');
  
  // Check if any word is in all caps, not a common acronym, and not a number
  const hasAllCaps = words.some((word: string): boolean => {
    const isAllCaps = word === word.toUpperCase() && 
      word.length > 1 && 
      !COMMON_ACRONYMS.includes(word) &&
      !(/^\d+$/.test(word));
    return isAllCaps;
  });

  // Get the category color
  const categoryColor = getCategoryColor(category, theme);
  
  if (!hasAllCaps) {
    // If no all-caps words, render the text normally
    return (
      <Typography
        variant={typographyVariant}
        color={theme.colors.Text.Primary}
        style={containerStyle as StyleProp<TextStyle>}
      >
        {text}
      </Typography>
    );
  }
  
  // If there are all-caps words, render them with the section color
  return (
    <View style={[containerStyle, { flexDirection: 'row', flexWrap: 'wrap' }]}>
      {words.map((word: string, index: number): JSX.Element => {
        const isAllCaps = word === word.toUpperCase() && 
          word.length > 1 && 
          !COMMON_ACRONYMS.includes(word) &&
          !(/^\d+$/.test(word));
        
        return (
          <Typography
            key={index}
            variant={typographyVariant}
            color={isAllCaps ? categoryColor : theme.colors.Text.Primary}
          >
            {word}{index < words.length - 1 ? ' ' : ''}
          </Typography>
        );
      })}
    </View>
  );
}; 