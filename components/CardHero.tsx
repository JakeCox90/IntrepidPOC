'use client';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Flag from './Flag';
import Typography from './Typography';
import LazyImage from './LazyImage';
import Card from './Card';
import { createCardHeroStyles } from './styles/CardHero.styles';
import { getCategoryColor } from '../utils/categoryColors';
import { Feather } from '@expo/vector-icons';
import type { CardHeroProps } from '../types/components';

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

const CardHero = ({
  title,
  subtitle,
  imageUrl,
  category,
  flag,
  readTime,
  onPress,
  onBookmark,
  onShare,
  style,
}: CardHeroProps) => {
  const theme = useTheme();
  const styles = createCardHeroStyles(theme);
  const categoryColor = category ? getCategoryColor(category, theme) : theme.colors.Primary.Resting;

  // Check if the flag is a common flag type
  const isCommonFlag = flag && COMMON_FLAGS.includes(flag.toUpperCase());

  // Function to render title with colored all-caps text
  const renderTitleWithColoredCaps = () => {
    // Split the title into words
    const words: string[] = title.split(' ');
    
    // Check if any word is in all caps, not a common acronym, and not a number
    const hasAllCaps = words.some((word: string) => 
      word === word.toUpperCase() && 
      word.length > 1 && 
      !COMMON_ACRONYMS.includes(word) &&
      !/^\d+$/.test(word) // Exclude numbers
    );
    
    if (!hasAllCaps) {
      // If no all-caps words, render the title normally
      return (
        <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.title}>
          {title}
        </Typography>
      );
    }
    
    // If there are all-caps words, render them with the section color
    return (
      <View style={styles.titleContainer}>
        {words.map((word: string, index: number) => {
          // Check if the word is in all caps, longer than 1 character, not a common acronym, and not a number
          const isAllCaps = 
            word === word.toUpperCase() && 
            word.length > 1 && 
            !COMMON_ACRONYMS.includes(word) &&
            !/^\d+$/.test(word); // Exclude numbers
          
          return (
            <Typography
              key={index}
              variant="h5"
              color={isAllCaps ? categoryColor : theme.colors.Text.Primary}
            >
              {word}{index < words.length - 1 ? ' ' : ''}
            </Typography>
          );
        })}
      </View>
    );
  };

  return (
    <Card
      onPress={onPress}
      onBookmark={onBookmark}
      onShare={onShare}
      readTime={readTime}
      style={styles.container}
    >
      <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.heroContent}>
        <View style={styles.flagContainer}>
          {isCommonFlag && (
            <Flag 
              text={flag} 
              style={styles.flag} 
              variant="minimal"
              color={flag.toUpperCase() === 'BREAKING' ? theme.colors.Status.Breaking : 
                     flag.toUpperCase() === 'EXCLUSIVE' ? theme.colors.Status.Exclusive :
                     theme.colors.Error.Resting}
            />
          )}
          {category && <Flag text={category} category={category} variant="minimal" />}
        </View>

        {renderTitleWithColoredCaps()}

        {subtitle && (
          <Typography
            variant="subtitle-01"
            color={theme.colors.Text.Secondary}
            numberOfLines={2}
            style={styles.subtitle}
          >
            {subtitle}
          </Typography>
        )}
      </View>

      {/* Footer with read time and actions - moved outside of heroContent */}
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

// Add styles directly to the component props where needed
// const styles = StyleSheet.create({
//   flag: {
//     marginRight: 8,
//   },
// });

export default CardHero;
