import { StyleSheet } from 'react-native';
import { ThemeType } from '@theme/ThemeProvider';

// Constants
export const MINI_PLAYER_HEIGHT = 60;
export const TAB_NAV_HEIGHT = 49;
export const SPRING_CONFIG = {
  damping: 20,
  mass: 1,
  stiffness: 200,
};

export const createAudioPlayerDrawerStyles = (theme: ThemeType) =>
  StyleSheet.create({
    // Base container styles
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%',
      backgroundColor: theme.colors.Surface.Primary,
      borderTopLeftRadius: theme.radius['radius-40'],
      borderTopRightRadius: theme.radius['radius-40'],
      shadowColor: theme.colors.Text.Primary,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      zIndex: 9999,
    },

    // Header styles
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.space['40'],
      marginBottom: theme.space['40'],
    },

    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.space['40'],
      height: MINI_PLAYER_HEIGHT,
    },

    // Mini player styles
    miniPlayerImage: {
      width: 40,
      height: 40,
      borderRadius: theme.radius['radius-20'],
      backgroundColor: theme.colors.Surface.Secondary,
      marginRight: theme.space['30'],
    },

    miniPlayerTextContainer: {
      flex: 1,
      marginRight: theme.space['30'],
    },

    // Content styles
    content: {
      flex: 1,
      padding: theme.space['40'],
      paddingTop: MINI_PLAYER_HEIGHT + theme.space['40'],
      paddingBottom: theme.space['40'] + TAB_NAV_HEIGHT,
    },

    // Album art styles
    albumArt: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: theme.radius['radius-40'],
      backgroundColor: theme.colors.Surface.Secondary,
      marginBottom: theme.space['60'],
    },

    // Controls styles
    controls: {
      alignItems: 'center',
      marginBottom: theme.space['60'],
    },

    playbackControls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.space['60'],
      gap: theme.space['60'],
    },
  }); 