import { StyleSheet } from 'react-native';
import type { ThemeType } from '../../theme/ThemeProvider';

export const createReadTimeStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      marginLeft: theme.space['10'],
    },
  });
}; 