"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import Flag from "./Flag"

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
  const fontFamily = theme?.typography?.fontFamily?.bold || "System"
  const fontSize = titleStyle === "large" ? 40 : theme?.fontSize?.["3"] || 24
  const spacing = theme?.space?.["40"] || 16
  const smallSpacing = theme?.space?.["20"] || 8
  const borderWidth = theme?.borderWidth?.["10"] || 1
  const borderColor = theme?.colors?.Border?.["Border-Primary"] || "#EEEEEE"

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
              <Flag text={flag.text} category={flag.category} style={styles.flag} />
            </View>
          )}
          <Text
            style={[
              styles.title,
              {
                color: txtColor,
                fontFamily: fontFamily,
                fontSize: fontSize,
              },
            ]}
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

