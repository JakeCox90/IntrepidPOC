import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createForYouScreenStyles = (theme: ThemeType, insets: { top: number }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.Surface.Primary,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.space['40'],
    },
    errorText: {
      ...theme.typography.variants['body-01'],
      color: theme.colors.Error.Text,
      textAlign: 'center',
      margin: theme.space['40'],
    },
    tabTransitioning: {
      opacity: 0.7,
    },
    bottomPadding: {
      height: theme.space['70'],
    },
    bundlesStack: {
      marginBottom: theme.space['40'],
    },
    centerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    horizontalRailContainer: {
      marginTop: theme.space['40'],
      paddingBottom: theme.space['40'],
    },
    scrollView: {
      flex: 1,
    },
    section: {
      padding: theme.space['40'],
      paddingBottom: 0,
    },
    sectionTitle: {
      marginBottom: theme.space['40'],
    },
    topStoriesStack: {
      marginBottom: theme.space['40'],
    },
  }); 