import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createFlagStyles = (_theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });
};
