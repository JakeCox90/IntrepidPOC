import { StyleSheet, Platform, StatusBar } from 'react-native';
import { ThemeType } from '@theme/ThemeProvider';

export const createTopNavStyles = (theme: ThemeType) =>
  StyleSheet.create({
    // Base container styles
    container: {
      width: '100%',
      backgroundColor: theme.colors.Surface.Primary,
      paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
      paddingHorizontal: theme.space['40'],
      borderBottomColor: theme.colors.Border.Primary,
    },

    // Explore variant styles
    exploreContainer: {
      width: '100%',
      backgroundColor: theme.colors.Surface.Primary,
      paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
      paddingHorizontal: theme.space['40'],
      paddingBottom: theme.space['40'],
    },

    exploreTitle: {
      marginTop: theme.space['60'],
      marginBottom: theme.space['20'],
    },

    // Content styles
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 48,
      paddingVertical: theme.space['20'],
    },

    contentWithStepper: {
      height: 64,
      paddingVertical: theme.space['30'],
    },

    // Back button styles
    backButton: {
      padding: theme.space['10'],
      marginRight: theme.space['20'],
    },

    // Title styles
    titleContainer: {
      flex: 1,
    },

    title: {
      // Empty style object for potential future customization
    },

    // Right buttons styles
    rightButtonsContainer: {
      flexDirection: 'row',
    },

    rightButton: {
      marginLeft: theme.space['40'],
    },

    // Border styles
    borderBottom: {
      borderBottomWidth: theme.borderWidth['10'],
    },
  }); 