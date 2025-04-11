import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View, LogBox, Platform, StyleSheet, Text } from 'react-native';
import InterRegular from './assets/fonts/Inter-Regular.ttf';
import InterMedium from './assets/fonts/Inter-Medium.ttf';
import InterSemiBold from './assets/fonts/Inter-SemiBold.ttf';
import InterBold from './assets/fonts/Inter-Bold.ttf';
import TabNavigator from './navigation/TabNavigator';
import { ThemeProvider } from './theme/ThemeProvider';
import { colors } from './design-system/Foundations/colors';
// Ignore specific warnings that might be related to third-party libraries
LogBox.ignoreLogs([
  'Reanimated 2',
  'Failed to create a worklet',
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  // Add the topInsetsChange error to ignored logs
  'Unsupported top level event type "topInsetsChange" dispatched',
]);

// Patch for topInsetsChange error in React Native 0.73
if (Platform.OS === 'ios') {
  // This is a workaround for the topInsetsChange error
  // It ensures the app doesn't crash when this event is dispatched
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Unsupported top level event type "topInsetsChange"')
    ) {
      // Suppress this specific error
      return;
    }
    originalConsoleError(...args);
  };
}

interface LoadingScreenProps {
  error?: Error | null;
}

function LoadingScreen({ error }: LoadingScreenProps) {
  // Use default theme colors since ThemeProvider isn't available during loading
  return (
    <View style={styles.loadingContainer}>
      {error ? (
        <>
          <Text style={styles.errorText}>Error loading fonts</Text>
          <Text style={styles.errorMessageText}>{error.message}</Text>
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color={colors.Primary.Resting} />
          <Text style={styles.loadingMessageText}>Loading fonts...</Text>
        </>
      )}
    </View>
  );
}

export default function App(): React.ReactElement {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': InterRegular,
    'Inter-Medium': InterMedium,
    'Inter-SemiBold': InterSemiBold,
    'Inter-Bold': InterBold,
  });

  if (!fontsLoaded) {
    return <LoadingScreen error={fontError} />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  errorMessageText: {
    color: colors.Text.Primary,
    fontSize: 14,
    marginTop: 10,
  },
  errorText: {
    color: colors.Error.Text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingMessageText: {
    color: colors.Text.Primary,
    fontSize: 14,
    marginTop: 10,
  },
});
