import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import { ActivityIndicator, View, LogBox, Platform } from "react-native"
import Typography from "./components/Typography"

import TabNavigator from "./navigation/TabNavigator"
import { ThemeProvider } from "./theme/ThemeProvider"

// Ignore specific warnings that might be related to third-party libraries
LogBox.ignoreLogs([
  "Reanimated 2",
  "Failed to create a worklet",
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  // Add the topInsetsChange error to ignored logs
  'Unsupported top level event type "topInsetsChange" dispatched',
])

// Patch for topInsetsChange error in React Native 0.73
if (Platform.OS === "ios") {
  // This is a workaround for the topInsetsChange error
  // It ensures the app doesn't crash when this event is dispatched
  const originalConsoleError = console.error
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes('Unsupported top level event type "topInsetsChange"')) {
      // Suppress this specific error
      return
    }
    originalConsoleError(...args)
  }
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  })

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#E03A3A" />
        <Typography variant="body-01" style={{ marginTop: 10 }}>Loading fonts...</Typography>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

