import { StyleSheet } from 'react-native';
import { ThemeType } from '../theme/theme';

export const createFlagStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });
};
