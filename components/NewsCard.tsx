'use client';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from '../components/Typography';
import Flag from './Flag';
import LazyImage from './LazyImage';
import { getCategoryColor } from '../utils/categoryColors';

interface NewsCardProps {
  title: string;
  imageUrl: string;
  category: string;
  timestamp: string;
  onPress: () => void;
}

const cardWidth = 200; // Width for horizontal scrolling cards

// Common acronyms and country codes that should not be colored
const COMMON_ACRONYMS = [
  'UK', 'USA', 'US', 'EU', 'UN', 'NHS', 'BBC', 'ITV', 'CNN', 'FBI', 'CIA', 'NASA',
  'WHO', 'WTO', 'IMF', 'NATO', 'EU', 'UNESCO', 'UNICEF', 'WWF', 'FIFA', 'UEFA',
  'NBA', 'NFL', 'MLB', 'NHL', 'F1', 'GP', 'PM', 'MP', 'MPs', 'MPs', 'MPs', 'MPs',
  'CEO', 'CFO', 'CTO', 'COO', 'VIP', 'DIY', 'DNA', 'RNA', 'HIV', 'AIDS', 'COVID',
  'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR', 'PCR',
];

const NewsCard = ({ title, imageUrl, category, timestamp, onPress }: NewsCardProps) => {
  const theme = useTheme();
  const categoryColor = getCategoryColor(category, theme);

  // Function to render title with colored all-caps text
  const renderTitleWithColoredCaps = () => {
    // Split the title into words
    const words = title.split(' ');
    
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
          numberOfLines={4}
          style={styles.title}
        >
          {title}
        </Typography>
      );
    }
    
    // If there are all-caps words, render them with the section color
    return (
      <View style={styles.titleContainer}>
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
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.Surface.Primary,
          borderRadius: theme.radius['radius-default'],
          borderWidth: theme.borderWidth['10'],
          borderColor: theme.colors.Border.Primary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
      testID="news-card-touchable"
    >
      <View style={styles.imageContainer}>
        <LazyImage
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
          showLoader={false}
        />
      </View>
      <View style={styles.content}>
        {category && (
          <View style={styles.flagContainer}>
            <Flag text={category} category={category} variant="minimal" />
          </View>
        )}
        {renderTitleWithColoredCaps()}
        <Typography
          variant="annotation"
          color={theme.colors.Text.Secondary}
          style={styles.timestamp}
        >
          {timestamp}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

// Create standard StyleSheet with static styles
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: cardWidth,
  },
  content: {
    padding: 12,
  },
  flagContainer: {
    marginBottom: 4,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: 100,
    width: '100%',
  },
  timestamp: {},
  title: {
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
});

export default NewsCard;
