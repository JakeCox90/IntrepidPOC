import { StyleSheet, Dimensions } from 'react-native';
import type { ThemeType } from '../../theme/ThemeProvider';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  activeDot: {
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  backButton: {
    marginRight: 8,
    padding: 8,
  },
  bottomContainer: {
    padding: 16,
  },
  cardsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  cardsStack: {
    height: height * 0.6,
    position: 'relative',
    width: width - 32,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  emptyStateContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateSubtitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyStateTitle: {
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'center',
  },
  flagContainer: {
    marginBottom: 8,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressDot: {
    borderRadius: 4,
    height: 8,
    marginHorizontal: 4,
    width: 8,
  },
  reloadButton: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  swipeInstructionContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  swipeInstructionText: {
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
  },
});

export const createDynamicStyles = (_theme: ThemeType) => {
  return StyleSheet.create({
    card: {
      flex: 1,
      position: 'relative',
    },
    cardContainer: {
      borderRadius: 16,
      height: height * 0.6,
      overflow: 'hidden',
      position: 'absolute',
      width: width - 32,
    },
    cardContent: {
      bottom: 0,
      left: 0,
      padding: 16,
      position: 'absolute',
      right: 0,
    },
    cardImage: {
      height: '100%',
      width: '100%',
    },
    cardOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    cardShadow: {
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    cardTitle: {
      marginBottom: 8,
    },
  });
};
