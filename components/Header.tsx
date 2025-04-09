"use client"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import Flag from "./Flag"
import Typography from "./Typography"

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

  const bgColor = backgroundColor || theme.colors.Surface.Primary
  const txtColor = textColor || theme.colors.Text.Primary
  const spacing = theme.space["40"]
  const smallSpacing = theme.space["20"]
  const borderWidth = theme.borderWidth["10"]
  const borderColor = theme.colors.Border["Border-Primary"]

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
          <Typography
            variant={titleStyle === "large" ? "h1" : "h2"}
            color={txtColor}
          >
            {title}
          </Typography>
        </View>

        {rightButtons.length > 0 && (
          <View style={styles.rightButtonsContainer}>
            {rightButtons.map((button, index) => (
              <TouchableOpacity key={index} style={styles.rightButton} onPress={button.onPress}>
                <Typography variant="button" color={txtColor}>
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
  rightButtonsContainer: {
    flexDirection: "row",
  },
  rightButton: {
    marginLeft: 16,
  },
  profileButton: {
    marginLeft: 16,
    padding: 4,
  },
})

export default Header

