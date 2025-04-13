import { StyleSheet } from 'react-native';
import type { ThemeType } from '../../theme/ThemeProvider';

export const createStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    accordionContainer: {
      marginBottom: theme.space['20'],
    },
    articleContent: {
      marginTop: theme.space['20'],
    },
    audioPlayerContainer: {
      marginBottom: theme.space['40'],
      marginTop: theme.space['20'],
    },
    backToHomeButton: {
      borderRadius: theme.radius['radius-20'],
      marginTop: theme.space['30'],
      paddingHorizontal: theme.space['30'],
    },
    bottomSpacing: {
      height: theme.space['80'],
      paddingBottom: theme.space['20'],
    },
    contentContainer: {
      paddingHorizontal: theme.space['40'],
      paddingVertical: theme.space['40'],
    },
    container: {
      backgroundColor: theme.colors.Surface.Primary,
      flex: 1,
    },
    errorContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: theme.space['30'],
    },
    paragraph: {
      marginBottom: theme.space['20'],
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      paddingBottom: theme.space['20'],
      paddingTop: theme.space['20'],
    },
  });
}; 