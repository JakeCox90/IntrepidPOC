"use client"
import { View, StyleSheet, TouchableOpacity, Platform, StatusBar } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Typography from "./Typography"

interface TopNavProps {
  title: string
  showBackButton?: boolean
  onBackPress?: () => void
  backgroundColor?: string
  textColor?: string
  rightButtons?: Array<{
    label: string
    onPress: () => void
  }>
  variant?: "default" | "explore"
}

const TopNav = ({
  title,
  showBackButton = false,
  onBackPress,
  backgroundColor,
  textColor,
  rightButtons = [],
  variant = "default",
}: TopNavProps) => {
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
  const bgColor = backgroundColor || theme?.colors?.Surface?.Primary || "#FFFFFF"
  const txtColor = textColor || theme?.colors?.Text?.Primary || "#1D1D1B"
  const fontFamily = theme?.typography?.fontFamily?.semiBold || "System"
  const spacing = theme?.space?.["40"] || 16
  const smallSpacing = theme?.space?.["20"] || 8
  const borderColor = theme?.colors?.Border?.["Border-Primary"] || "#E5E5E5"

  if (variant === "explore") {
    return (
      <View
        style={[
          styles.exploreContainer,
          {
            backgroundColor: bgColor,
            paddingTop: insets.top || (Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0),
            paddingHorizontal: spacing,
          },
        ]}
      >
        <Typography
          variant="h3"
          style={[
            styles.exploreTitle,
            {
              color: txtColor,
            },
          ]}
        >
          {title}
        </Typography>
      </View>
    )
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          paddingTop: insets.top || (Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0),
          paddingHorizontal: spacing,
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
        },
      ]}
    >
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity style={[styles.backButton, { marginRight: smallSpacing }]} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color={txtColor} />
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <Typography
            variant="body-01"
            style={[
              styles.title,
              {
                color: txtColor,
                fontFamily: fontFamily,
                fontSize: 16,
                fontWeight: "600",
              },
            ]}
            numberOfLines={1}
          >
            {title}
          </Typography>
        </View>

        {rightButtons.length > 0 && (
          <View style={styles.rightButtonsContainer}>
            {rightButtons.map((button, index) => (
              <TouchableOpacity key={index} style={styles.rightButton} onPress={button.onPress}>
                <Typography
                  variant="body-01"
                  style={[styles.rightButtonText, { color: txtColor }]}
                >
                  {button.label}
                </Typography>
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
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 1,
  },
  title: {},
  rightButtonsContainer: {
    flexDirection: "row",
  },
  rightButton: {
    marginLeft: 16,
  },
  rightButtonText: {
    fontWeight: "600",
  },
  // New styles for explore variant
  exploreContainer: {
    width: "100%",
    paddingBottom: 16,
  },
  exploreTitle: {
    marginTop: 24,
    marginBottom: 8,
  },
})

export default TopNav
