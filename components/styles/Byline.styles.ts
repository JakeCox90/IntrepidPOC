import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const baseStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  authorName: {
    marginBottom: 4,
  },
});

export const getThemedStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
  },
  authorName: {
    color: theme.colors.Text.Primary,
  },
  publishDate: {
    color: theme.colors.Text.Secondary,
  },
}); 