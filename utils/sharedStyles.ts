import { StyleSheet } from 'react-native';
import type { ThemeType } from '../theme/ThemeProvider';

export const createSharedStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    bottomNavSpacing: {
      height: theme.space['80'],
      paddingBottom: theme.space['20'],
    },
  });
}; 