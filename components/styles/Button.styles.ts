import { StyleSheet } from 'react-native';
import { ThemeType } from '@theme/ThemeProvider';

export const createButtonStyles = (theme: ThemeType) =>
  StyleSheet.create({
    // Base button styles
    button: {
      height: 44,
      borderRadius: theme.radius['radius-20'],
      paddingHorizontal: theme.space['40'],
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Variant styles
    fullWidth: {
      width: '100%',
    },

    secondaryBorder: {
      borderWidth: theme.borderWidth['10'],
      borderColor: theme.colors.Border.Primary,
    },

    // Content styles
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    contentWithIcon: {
      marginHorizontal: theme.space['20'],
    },

    // Text styles
    label: {
      fontSize: theme.typography.scale.md,
      fontFamily: theme.typography.fontFamily.semiBold,
    },

    // Icon styles
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  }); 