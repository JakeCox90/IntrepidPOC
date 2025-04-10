'use client';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { StatusBar } from 'expo-status-bar';
import Typography from '../components/Typography';

const HomeScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.Primary.Resting }]}>
        <Typography variant="h1" color={theme.colors.Text.Inverse}>
          Today
        </Typography>
      </View>

      {/* Placeholder content */}
      <View
        style={[styles.placeholderContainer, { backgroundColor: theme.colors.Surface.Primary }]}
      >
        <Typography variant="h3" color={theme.colors.Text.Secondary} style={styles.placeholderText}>
          Coming soon...
        </Typography>
        <Typography
          variant="body-01"
          color={theme.colors.Text.Secondary}
          style={styles.placeholderSubtext}
        >
          This feature is currently under development
        </Typography>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 16,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  placeholderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  placeholderSubtext: {
    textAlign: 'center',
  },
  placeholderText: {
    marginBottom: 12,
    textAlign: 'center',
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export default HomeScreen;
