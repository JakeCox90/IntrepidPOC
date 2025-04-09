"use client"
import { View, StyleSheet, TouchableOpacity, Platform, StatusBar } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Typography from "../components/Typography"

interface TopNavProps {
  showBackButton?: boolean
  onBackPress?: () => void
  rightButtons?: Array<{
    label: string
    onPress: () => void
    icon?: string
  }>
  variant?: "default" | "explore"
}

const TopNav = ({ showBackButton = false, onBackPress, rightButtons = [], variant = "default" }: TopNavProps) => {
  const theme = useTheme()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  // Safely get theme values with fallbacks
  const spacing = theme?.space?.["40"] || 16
  const smallSpacing = theme?.space?.["20"] || 8
  const iconColor = theme?.colors?.Text?.Primary || "#000000"

  if (variant === "explore") {
    return (
      <View
        style={[
          styles.exploreContainer,
          {
            paddingTop: insets.top || (Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0),
            paddingHorizontal: spacing,
          },
        ]}
      >
        {/* Title removed as requested */}
      </View>
    )
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top || (Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0),
          paddingHorizontal: spacing,
        },
      ]}
    >
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity
            style={[
              styles.iconButton,
              {
                marginRight: smallSpacing,
                backgroundColor: "rgba(200, 200, 200, 0.3)", // Grey translucent background
              },
            ]}
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>
        )}

        <View style={styles.spacer} />

        {rightButtons.length > 0 && (
          <View style={styles.rightButtonsContainer}>
            {rightButtons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.iconButton,
                  {
                    marginLeft: smallSpacing,
                    backgroundColor: "rgba(200, 200, 200, 0.3)", // Grey translucent background
                  },
                ]}
                onPress={button.onPress}
              >
                {button.icon ? (
                  <Ionicons name={button.icon} size={24} color={iconColor} />
                ) : (
                  <Typography variant="button" color={iconColor}>
                    {button.label}
                  </Typography>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingVertical: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    flex: 1,
  },
  rightButtonsContainer: {
    flexDirection: "row",
  },
  // New styles for explore variant
  exploreContainer: {
    width: "100%",
    paddingBottom: 16,
  },
})

export default TopNav
