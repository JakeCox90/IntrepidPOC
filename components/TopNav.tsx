"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

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
}

const TopNav = ({
  title,
  showBackButton = false,
  onBackPress,
  backgroundColor,
  textColor,
  rightButtons = [],
}: TopNavProps) => {
  const theme = useTheme()
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  // Safely get theme values with fallbacks
  const bgColor = backgroundColor || "#F5F5F5" // Default to gray for article header
  const txtColor = textColor || theme?.colors?.Text?.Primary || "#000000"
  const fontFamily = theme?.typography?.fontFamily?.semiBold || "System"
  const spacing = theme?.space?.["40"] || 16
  const smallSpacing = theme?.space?.["20"] || 8

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          paddingHorizontal: spacing,
          paddingVertical: smallSpacing,
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
          <Text
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
          </Text>
        </View>

        {rightButtons.length > 0 && (
          <View style={styles.rightButtonsContainer}>
            {rightButtons.map((button, index) => (
              <TouchableOpacity key={index} style={styles.rightButton} onPress={button.onPress}>
                <Text style={[styles.rightButtonText, { color: txtColor }]}>{button.label}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
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
})

export default TopNav

