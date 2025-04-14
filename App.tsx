import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View, LogBox, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InterRegular from './assets/fonts/Inter-Regular.ttf';
import InterMedium from './assets/fonts/Inter-Medium.ttf';
import InterSemiBold from './assets/fonts/Inter-SemiBold.ttf';
import InterBold from './assets/fonts/Inter-Bold.ttf';
import TabNavigator from './navigation/TabNavigator';
import { ThemeProvider } from './theme/ThemeProvider';
import { colors } from './design-system/Foundations/colors';
import Typography from './components/Typography';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { AudioPlayerDrawer } from './components/AudioPlayerDrawer';
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
          <Typography variant="h3" color="Error.Text">Error loading fonts</Typography>
          <Typography variant="body-02" color="Text.Primary" style={styles.errorMessageText}>{error.message}</Typography>
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color={colors.Primary.Resting} />
          <Typography variant="h3" style={styles.loadingText}>
            Loading...
          </Typography>
          <Typography variant="body-02" style={styles.loadingSubtext}>
            Please wait while we prepare your experience
          </Typography>
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <BookmarkProvider>
            <AudioPlayerProvider>
              <NavigationContainer>
                <TabNavigator />
                <AudioPlayerDrawer />
              </NavigationContainer>
            </AudioPlayerProvider>
          </BookmarkProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  errorMessageText: {
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  loadingSubtext: {
    marginTop: 10,
  },
});
