'use client';
import { View, StyleSheet } from 'react-native';
// import { useTheme } from '../theme/ThemeProvider';
import Skeleton from './Skeleton';

const SkeletonArticle = () => {
  return (
    <View style={styles.container}>
      {/* Header skeleton */}
      <Skeleton height={50} borderRadius={0} />

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <Skeleton width={80} height={24} borderRadius={4} />
      </View>

      {/* Title */}
      <Skeleton height={32} style={styles.title} />
      <Skeleton height={32} width="80%" style={styles.title} />

      {/* Subtitle */}
      <Skeleton height={20} style={styles.subtitle} />
      <Skeleton height={20} width="90%" style={styles.subtitle} />

      {/* Reading time */}
      <View style={styles.readingTimeContainer}>
        <Skeleton width={120} height={16} />
      </View>

      {/* Author info */}
      <View style={styles.authorContainer}>
        <Skeleton width={150} height={18} style={styles.authorName} />
        <Skeleton width={200} height={16} />
      </View>

      {/* Article Image */}
      <Skeleton height={250} style={styles.articleImage} />

      {/* Article content */}
      <View style={styles.articleContent}>
        <Skeleton height={18} style={styles.paragraph} />
        <Skeleton height={18} style={styles.paragraph} />
        <Skeleton height={18} width="95%" style={styles.paragraph} />
        <Skeleton height={18} style={styles.paragraph} />
        <Skeleton height={18} width="90%" style={styles.paragraph} />
        <Skeleton height={18} style={styles.paragraph} />
        <Skeleton height={18} width="85%" style={styles.paragraph} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  articleContent: {
    marginBottom: 24,
  },
  articleImage: {
    borderRadius: 4,
    marginBottom: 16,
  },
  authorContainer: {
    marginBottom: 16,
  },
  authorName: {
    marginBottom: 4,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  paragraph: {
    marginBottom: 12,
  },
  readingTimeContainer: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 16,
  },
  title: {
    marginBottom: 8,
  },
});

export default SkeletonArticle;
