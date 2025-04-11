import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createFlagStyles = (_theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      minHeight: 24, // Ensure consistent height
    },
    minimalContainer: {
      alignSelf: 'flex-start',
      minHeight: 24, // Match the filled variant height
      justifyContent: 'center',
    },
    text: {
      lineHeight: 16, // Ensure consistent text height
    },
  });
};
