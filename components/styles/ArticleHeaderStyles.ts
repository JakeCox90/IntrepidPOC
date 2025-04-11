import { StyleSheet, Dimensions } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

const { width } = Dimensions.get('window');
export const imageHeight = (width * 2) / 3; // 3:2 ratio

// Base styles that don't depend on theme
export const baseStyles = StyleSheet.create({
  articleImage: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  container: {
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  placeholderImage: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  readingTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    marginRight: 8,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 12,
  },
  readingTime: {
    marginLeft: 4,
  },
  authorContainer: {
    marginBottom: 16,
  },
});

// Function to get themed styles based on the current theme
export const getThemedStyles = (theme: ThemeType) => {
  // Get the border radius from theme
  const borderRadius = theme?.radius?.['radius-default'] || 8;

  return {
    articleImage: {
      backgroundColor: theme?.colors?.Border?.Skeleton01 || theme?.colors?.Surface?.Secondary,
      borderRadius: borderRadius,
      height: imageHeight,
      marginBottom: theme?.space?.['40'] || 16,
      overflow: 'hidden',
    },
    authorContainer: {
      marginBottom: theme?.space?.['40'] || 16,
    },
    flag: {
      marginRight: theme?.space?.['20'] || 8,
    },
    readingTime: {
      marginLeft: theme?.space?.['10'] || 4,
    },
    readingTimeContainer: {
      marginBottom: theme?.space?.['20'] || 8,
    },
    subtitle: {
      marginBottom: theme?.space?.['30'] || 12,
    },
    tagsContainer: {
      marginBottom: theme?.space?.['20'] || 8,
    },
    title: {
      marginBottom: theme?.space?.['20'] || 8,
    },
    imageContainer: {
      backgroundColor: theme?.colors?.Border?.Skeleton01 || theme?.colors?.Surface?.Secondary,
      borderRadius: theme?.radius?.['radius-default'] || 8,
      height: imageHeight,
      marginBottom: theme?.space?.['40'] || 16,
      overflow: 'hidden' as const,
      borderWidth: theme.borderWidth['10'],
      borderColor: theme.colors.Border.Primary,
    },
    image: {
      borderRadius: borderRadius - 1,
    },
  };
}; 