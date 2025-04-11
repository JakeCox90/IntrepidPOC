import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { ThemeProvider } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

/**
 * Shared card styles for use across the app
 *
 * NOTE ON COLORS: This is a static stylesheet without access to theme.
 * When using these styles, override any colors with theme values:
 *
 * Example usage:
 *
 * const MyComponent = () => {
 *   const theme = useTheme();
 *   return <View style={[cardStyles.container, { backgroundColor: theme.colors.Surface.Primary }]}>...</View>;
 * };
 */
export const cardStyles = StyleSheet.create({
  //-------------------------
  // Article card styles
  //-------------------------
  articleContainer: {
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  articleContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  articleImage: {
    borderRadius: 8,
    height: 100,
    width: 100,
  },
  articleTextContent: {
    flex: 1,
    marginRight: 12,
  },

  //-------------------------
  // CatchUp card styles
  //-------------------------
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

  category: {
    marginBottom: 4,
  },
  //-------------------------
  // Common card styles
  //-------------------------
  container: {
    // NOTE: Replace with theme.colors.Surface.Primary when using
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },

  //-------------------------
  // Hero card styles
  //-------------------------
  heroContainer: {
    marginBottom: 16,
    width: width - 32,
  },
  heroContent: {
    padding: 16,
  },
  heroImage: {
    height: 200,
    width: '100%',
  },

  //-------------------------
  // Horizontal card styles
  //-------------------------
  horizontalCardContent: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 16,
  },
  horizontalContainer: {
    borderRadius: 16,
    marginBottom: 16,
  },
  horizontalImage: {
    height: 100,
    marginRight: 16,
    width: 100,
  },
  horizontalTextContent: {
    flex: 1,
  },

  //-------------------------
  // Text element styles
  //-------------------------

  flagContainer: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
  },

  //-------------------------
  // Footer & action styles
  //-------------------------
  actionButton: {
    marginLeft: 16,
    padding: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  readTime: {
    marginLeft: 6,
  },
  readTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  //-------------------------
  // Other elements
  //-------------------------
  prefix: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  titleContainer: {
    flexDirection: 'column',
  },
});
