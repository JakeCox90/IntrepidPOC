import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createAudioPlayerStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 68,
      justifyContent: 'space-between',
      overflow: 'hidden',
      width: '100%',
      borderColor: theme.colors.Border.Primary,
      borderWidth: theme.borderWidth['10'],
      borderRadius: theme.radius['radius-default'],
      backgroundColor: theme.colors.Surface.Primary,
    },
    contentContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    duration: {
      marginLeft: 4,
    },
    durationContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    leftSection: {
      flex: 1,
      justifyContent: 'center',
    },
    playButton: {
      alignItems: 'center',
      borderRadius: 20,
      height: 40,
      justifyContent: 'center',
      marginLeft: 16,
      width: 40,
    },
    staticTextContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 4,
    },
    tickerContainer: {
      marginBottom: 4,
      overflow: 'hidden',
    },
    tickerContent: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    truncatedTitle: {
      flex: 1,
    },
  }); 