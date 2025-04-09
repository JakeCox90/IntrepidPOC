"use client"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import Flag from "./Flag"
import { Typography } from "./Typography"

interface HeaderButton {
  label: string
  onPress: () => void
}

interface FlagProps {
  text: string
  category?: string
}

interface HeaderProps {
  title: string
  showBackButton?: boolean
  onBackPress?: () => void
  rightButtons?: HeaderButton[]
  backgroundColor?: string
  textColor?: string
  flag?: FlagProps | null
  titleStyle?: "default" | "large"
  titleVariant?: "h3" | "h4" | "h5" | "h6" | "subtitle-01"
  buttonVariant?: "button" | "subtitle-02"
  showProfileButton?: boolean
  onProfilePress?: () => void
}

const Header = ({
  title,
  showBackButton = false,
  onBackPress,
  rightButtons = [],
  backgroundColor,
  textColor,
  flag,
  titleStyle = "default",
  titleVariant,
  buttonVariant = "button",
  showProfileButton = false,
  onProfilePress,
}: HeaderProps) => {
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
  const bgColor = backgroundColor || theme?.colors?.Surface?.Primary || "#FFFFFF"
  const txtColor = textColor || theme?.colors?.Text?.Primary || "#000000"
  const spacing = theme?.space?.["40"] || 16
  const smallSpacing = theme?.space?.["20"] || 8
  const borderWidth = theme?.borderWidth?.["10"] || 1
  const borderColor = theme?.colors?.Border?.["Border-Primary"] || "#EEEEEE"

  // Determine title variant based on titleStyle
  const actualTitleVariant = titleVariant || (titleStyle === "large" ? "h3" : "h6")

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          paddingHorizontal: spacing,
          paddingVertical: spacing,
          borderBottomWidth: borderWidth,
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
          {flag && (
            <View style={styles.flagContainer}>
              <Flag text={flag.text} category={flag.category} style={styles.flag} variant="minimal" />
            </View>
          )}
          <Typography variant={actualTitleVariant} color={txtColor} numberOfLines={1} style={styles.title}>
            {title}
          </Typography>
        </View>

        {rightButtons.length > 0 && (
          <View style={styles.rightButtonsContainer}>
            {rightButtons.map((button, index) => (
              <TouchableOpacity key={index} style={styles.rightButton} onPress={button.onPress}>
                <Typography variant={buttonVariant} color={txtColor} style={styles.rightButtonText}>
                  {button.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {showProfileButton && (
          <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
            <Ionicons name="person-circle-outline" size={24} color={txtColor} />
          </TouchableOpacity>
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
  },
  backButton: {},
  titleContainer: {
    flex: 1,
  },
  flagContainer: {
    marginBottom: 8,
  },
  flag: {},
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
  profileButton: {
    marginLeft: 16,
    padding: 4,
  },
})

export default Header
