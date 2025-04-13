'use client';

import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import Card from './Card';
import { Feather } from '@expo/vector-icons';
import LazyImage from './LazyImage';
import { createCardHorizontalStyles } from './styles/CardHorizontal.styles';
import { getCategoryColor } from '../utils/categoryColors';
import Flag from './Flag';

interface CardHorizontalProps {
  id?: number | string;
  title: string;
  imageUrl: string;
  category: string;
  flag?: string;
  timestamp?: string;
  readTime?: string;
  onPress: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
}

// Common flags used by The Sun
const COMMON_FLAGS = [
  'EXCLUSIVE',
  'BREAKING',
  'REVEALED',
  'PICTURED',
  'WATCH',
  'UPDATED',
  'LIVE',
  'SHOCK',
  'TRAGIC',
  'HORROR',
  'URGENT',
  'WARNING',
];

// Common acronyms and country codes that should not be colored
const COMMON_ACRONYMS = [
  'UK', 'USA', 'US', 'EU', 'UN', 'NHS', 'BBC', 'ITV', 'CNN', 'FBI', 'CIA', 'NASA',
  'WHO', 'WTO', 'IMF', 'NATO', 'EU', 'UNESCO', 'UNICEF', 'WWF', 'FIFA', 'UEFA',
  'NBA', 'NFL', 'MLB', 'NHL', 'F1', 'GP', 'PM', 'MP', 'MPs', 'MPs', 'MPs', 'MPs',
  'CEO', 'CFO', 'CTO', 'COO', 'VIP', 'DIY', 'DNA', 'RNA', 'HIV', 'AIDS', 'COVID',
  'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR',
];

const CardHorizontal = ({
  id,
  title,
  imageUrl,
  category,
  flag,
  readTime = '3 min read',
  onPress,
  onBookmark,
  onShare,
}: CardHorizontalProps) => {
  const theme = useTheme();
  const styles = createCardHorizontalStyles(theme);

  const categoryText = category || '';
  const categoryColor = getCategoryColor(categoryText, theme);

  // If no flag is provided, use the title directly
  let mainTitle = title || '';

  if (!flag) {
    // Split title to check if it has a prefix in all caps (like "EXCLUSIVE")
    const titleParts = mainTitle.split(' ');

    if (titleParts.length > 1) {
      // Check if the first word is a common flag
      const firstWord = titleParts[0].toUpperCase();
      if (COMMON_FLAGS.includes(firstWord)) {
        // First word is a flag, remove it from the title
        mainTitle = titleParts.slice(1).join(' ');
      }
      // Check if first two words are a common flag (like "BREAKING NEWS")
      else if (titleParts.length > 2) {
        const firstTwoWords = `${titleParts[0]} ${titleParts[1]}`.toUpperCase();
        if (COMMON_FLAGS.some(f => firstTwoWords.includes(f))) {
          // First two words contain a flag, remove them from the title
          mainTitle = titleParts.slice(2).join(' ');
        }
      }
    }
  }

  // Function to render title with colored all-caps text
  const renderTitleWithColoredCaps = () => {
    // Split the title into words
    const words = mainTitle.split(' ');
    
    // Check if any word is in all caps, not a common acronym, and not a number
    const hasAllCaps = words.some(word => 
      word === word.toUpperCase() && 
      word.length > 1 && 
      !COMMON_ACRONYMS.includes(word) &&
      !/^\d+$/.test(word) // Exclude numbers
    );
    
    if (!hasAllCaps) {
      // If no all-caps words, render the title normally
      return (
        <Typography
          variant="h6"
          color={theme.colors.Text.Primary}
          style={styles.title}
          numberOfLines={3}
        >
          {mainTitle}
        </Typography>
      );
    }
    
    // If there are all-caps words, render them with the section color
    return (
      <Typography
        variant="h6"
        style={styles.title}
        numberOfLines={3}
      >
        {words.map((word, index) => {
          // Check if the word is in all caps, longer than 1 character, not a common acronym, and not a number
          const isAllCaps = 
            word === word.toUpperCase() && 
            word.length > 1 && 
            !COMMON_ACRONYMS.includes(word) &&
            !/^\d+$/.test(word); // Exclude numbers
          
          return (
            <Typography
              key={index}
              variant="h6"
              color={isAllCaps ? categoryColor : theme.colors.Text.Primary}
            >
              {word}{index < words.length - 1 ? ' ' : ''}
            </Typography>
          );
        })}
      </Typography>
    );
  };

  return (
    <Card id={id} onPress={onPress} style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Image or Placeholder */}
        <View style={styles.imageContainer}>
          {imageUrl && imageUrl.trim() !== '' ? (
            <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderImage}>
              <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
            </View>
          )}
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <View style={styles.flagsContainer}>
            {flag && COMMON_FLAGS.includes(flag.toUpperCase()) && (
              <Flag
                text={flag}
                variant="minimal"
                color={flag.toUpperCase() === 'BREAKING' ? theme.colors.Status.Breaking : 
                       flag.toUpperCase() === 'EXCLUSIVE' ? theme.colors.Status.Exclusive :
                       theme.colors.Error.Resting}
                style={{ marginRight: 8 }}
              />
            )}
            {categoryText && (
              <Flag
                text={categoryText}
                variant="minimal"
                category={categoryText}
              />
            )}
          </View>

          {renderTitleWithColoredCaps()}
        </View>
      </View>

      {/* Footer with read time and actions */}
      <View style={styles.footer}>
        <View style={styles.readTimeContainer}>
          <Feather name="book-open" size={16} color={theme.colors.Text.Secondary} />
          <Typography
            variant="body-02"
            color={theme.colors.Text.Secondary}
            style={styles.readTimeText}
          >
            {readTime}
          </Typography>
        </View>

        <View style={styles.actionsContainer}>
          {onBookmark && (
            <TouchableOpacity onPress={onBookmark} style={styles.actionButton}>
              <Feather name="bookmark" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}

          {onShare && (
            <TouchableOpacity onPress={onShare} style={styles.actionButton}>
              <Feather name="share" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
};

export default CardHorizontal;
