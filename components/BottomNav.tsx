"use client"
import { View, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ErrorBoundary } from "react-error-boundary"
import { useState, useCallback } from "react"

// Define valid tab names as a type to ensure type safety
type ValidTabName = "Today" | "ForYou" | "AllNews" | "Search" | "Saved";

// Define tab configuration type
interface TabConfig {
  name: ValidTabName;
  icon: string;
  label?: string;
  disabled?: boolean;
}

// Component props with improved type safety
interface BottomNavProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
  isLoading?: boolean;
}

// Props for the ErrorFallback component
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// ErrorFallback component for the BottomNav
const BottomNavErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const theme = useTheme();
  const errorBgColor = theme?.colors?.Error?.Background || "#FEF2F2";
  const errorBorderColor = theme?.colors?.Error?.Border || "#FECACA";
  const errorTextColor = theme?.colors?.Error?.Text || "#DC2626";
  const errorButtonBgColor = theme?.colors?.Error?.Resting || "#DC2626";
  const errorButtonTextColor = theme?.colors?.Surface?.Primary || "#FFFFFF";
  
  return (
    <View style={[styles.errorContainer, { 
      backgroundColor: errorBgColor, 
      borderTopColor: errorBorderColor 
    }]}>
      <Text style={[styles.errorText, { color: errorTextColor }]}>
        Navigation error occurred
      </Text>
      <TouchableOpacity 
        style={[styles.errorButton, { backgroundColor: errorButtonBgColor }]}
        onPress={resetErrorBoundary}
      >
        <Text style={[styles.errorButtonText, { color: errorButtonTextColor }]}>
          Try Again
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const BottomNav = ({ activeTab, onTabPress, isLoading = false }: BottomNavProps) => {
  // Track error state for tab press operations
  const [tabPressError, setTabPressError] = useState<Error | null>(null);
  
  // Create a safe theme object with all required properties and fallbacks
  const theme = useTheme() || {};
  const insets = useSafeAreaInsets();

  // Ensure we have fallback values if theme properties are undefined
  const fontFamily = theme?.typography?.fontFamily?.regular || "System";
  const fontSize = 12; // Fixed fallback value since fontSize is not in ThemeType
  const primaryColor = theme?.colors?.Primary?.Resting || "#E03A3A";
  const secondaryColor = theme?.colors?.Text?.Secondary || "#717171";
  const borderColor = theme?.colors?.Border?.["Border-Primary"] || "#E5E5E5";
  const borderWidth = theme?.borderWidth?.["10"] || 1;
  const surfaceColor = theme?.colors?.Surface?.Primary || "#FFFFFF";
  const errorColor = theme?.colors?.Error?.Resting || "#DC2626";
  
  // Safe tab press handler with error handling
  const handleTabPress = useCallback((tabName: string) => {
    try {
      // Reset any previous errors
      setTabPressError(null);
      
      // Validate tab name before calling the navigation handler
      if (!["Today", "ForYou", "AllNews", "Search", "Saved"].includes(tabName)) {
        console.warn(`Invalid tab name: ${tabName}`);
        return;
      }
      
      // Call the provided onTabPress function
      onTabPress(tabName);
    } catch (error) {
      // Handle and log any errors
      console.error("Error pressing tab:", error);
      setTabPressError(error instanceof Error ? error : new Error("Unknown error"));
    }
  }, [onTabPress]);
  
  // If we're in an error state, show an error message
  if (tabPressError) {
    return (
      <View style={[styles.container, { backgroundColor: surfaceColor, borderTopWidth: borderWidth, borderTopColor: borderColor }]}>
        <Text style={{ color: errorColor, textAlign: 'center', padding: 10 }}>
          Navigation error. Please try again.
        </Text>
        <TouchableOpacity 
          style={{ padding: 5, backgroundColor: primaryColor, borderRadius: 4, margin: 5 }}
          onPress={() => setTabPressError(null)}
        >
          <Text style={{ color: surfaceColor }}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Define tabs with proper typing
  const tabs: TabConfig[] = [
    { name: "Today", icon: "home" },
    { name: "ForYou", icon: "user", label: "For You" },
    { name: "AllNews", icon: "grid", label: "All News" },
    { name: "Search", icon: "search" },
    { name: "Saved", icon: "bookmark" },
  ];

  // Show loading indicator if in loading state
  if (isLoading) {
    return (
      <View 
        style={[
          styles.container, 
          {
            borderTopWidth: borderWidth,
            borderTopColor: borderColor,
            paddingBottom: insets.bottom || 0,
            backgroundColor: surfaceColor,
            justifyContent: 'center',
          }
        ]}
      >
        <ActivityIndicator size="small" color={primaryColor} />
      </View>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={BottomNavErrorFallback}
      onError={(error) => console.error("BottomNav error:", error)}
      onReset={() => setTabPressError(null)}
    >
      <View
        style={[
          styles.container,
          {
            borderTopWidth: borderWidth,
            borderTopColor: borderColor,
            paddingBottom: insets.bottom || 0,
            backgroundColor: surfaceColor,
          }
        ]}
      >
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab.name} 
            style={[
              styles.tab,
              tab.disabled && styles.disabledTab
            ]} 
            onPress={() => handleTabPress(tab.name)}
            disabled={tab.disabled}
            activeOpacity={0.7}
          >
            <Feather 
              name={tab.icon as any} 
              size={24} 
              color={activeTab === tab.name ? primaryColor : secondaryColor} 
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: activeTab === tab.name ? primaryColor : secondaryColor,
                  fontFamily: fontFamily,
                  fontSize: fontSize,
                },
                tab.disabled && styles.disabledText
              ]}
            >
              {tab.label || tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabLabel: {
    marginTop: 4,
  },
  disabledTab: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
  errorContainer: {
    padding: 10,
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 56,
  },
  errorText: {
    marginBottom: 8,
  },
  errorButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  errorButtonText: {
    fontWeight: "bold",
  },
})

export default BottomNav
