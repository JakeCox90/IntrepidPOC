import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const cardStyles = StyleSheet.create({
  // Common card styles
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },

  // Hero card specific
  heroContainer: {
    marginBottom: 16,
    width: width - 32,
  },
  heroImage: {
    height: 200,
    width: '100%',
  },
  heroContent: {
    padding: 16,
  },

  // Article card specific
  articleContainer: {
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  articleContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  articleTextContent: {
    flex: 1,
    marginRight: 12,
  },
  articleImage: {
    borderRadius: 8,
    height: 100,
    width: 100,
  },

  // Horizontal card specific
  horizontalContainer: {
    borderRadius: 16,
    marginBottom: 16,
  },
  horizontalCardContent: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 16,
  },
  horizontalImage: {
    height: 100,
    marginRight: 16,
    width: 100,
  },
  horizontalTextContent: {
    flex: 1,
  },

  // CatchUp card specific
  catchUpContainer: {
    borderRadius: 12,
    height: 160,
    marginRight: 12,
    width: 280,
  },
  catchUpImageContainer: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  catchUpOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    left: 0,
    padding: 16,
    position: 'absolute',
    right: 0,
  },

  // Common text elements
  flagContainer: {
    marginBottom: 8,
  },
  category: {
    marginBottom: 4,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 12,
  },

  // Footer elements
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  readTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  readTime: {
    marginLeft: 6,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
    padding: 4,
  },

  // Title elements
  titleContainer: {
    flexDirection: 'column',
  },
  prefix: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
});
