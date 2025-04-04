"use client"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar as RNStatusBar,
  Platform,
  SafeAreaView,
} from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Get status bar height
const STATUSBAR_HEIGHT = RNStatusBar.currentHeight || (Platform.OS === "ios" ? 44 : 0)

interface HeaderProps {
  title: string
  showBackButton?: boolean
  onBackPress?: () => void
  showProfileButton?: boolean
  onProfilePress?: () => void
  rightButtons?: Array<{
    label?: string
    icon?: string
    onPress: () => void
  }>
  backgroundColor?: string
  titleStyle?: "large" | "regular"
  titleAlignment?: "left" | "center"
}

const Header = ({
  title,
  showBackButton = false,
  onBackPress,
  showProfileButton = false,
  onProfilePress,
  rightButtons = [],
  backgroundColor,
  titleStyle = "regular",
  titleAlignment = "left",
}: HeaderProps) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  // Use provided background color or default to theme primary
  const bgColor = backgroundColor || theme.colors.Primary.Resting

  return (
    <View style={styles.container}>
      {/* Status bar area */}
      <View style={[styles.statusBar, { backgroundColor: bgColor, height: STATUSBAR_HEIGHT }]} />

      {/* Header content */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <SafeAreaView edges={["right", "left"]} style={styles.safeArea}>
          <View style={styles.headerContent}>
            {/* Left side - Back button or empty space */}
            <View style={styles.leftContainer}>
              {showBackButton && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={onBackPress}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name="chevron-back"
                    size={28}
                    color={titleStyle === "large" ? "#FFFFFF" : theme.colors.Primary.Resting}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Title */}
            <View
              style={[
                styles.titleContainer,
                titleAlignment === "center" && styles.titleContainerCenter,
                titleStyle === "large" && styles.titleContainerLarge,
              ]}
            >
              <Text
                style={[
                  styles.title,
                  titleStyle === "large" && styles.titleLarge,
                  titleAlignment === "center" && styles.titleCenter,
                  { color: titleStyle === "large" ? "#FFFFFF" : theme.colors.Text.Primary },
                ]}
                numberOfLines={1}
              >
                {title}
              </Text>
            </View>

            {/* Right side - Profile button or action buttons */}
            <View style={styles.rightContainer}>
              {rightButtons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.rightButton}
                  onPress={button.onPress}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {button.icon ? (
                    <Feather
                      name={button.icon}
                      size={24}
                      color={titleStyle === "large" ? "#FFFFFF" : theme.colors.Primary.Resting}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.buttonText,
                        { color: titleStyle === "large" ? "#FFFFFF" : theme.colors.Primary.Resting },
                      ]}
                    >
                      {button.label}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}

              {showProfileButton && (
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={onProfilePress}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Feather name="user" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  statusBar: {
    width: "100%",
  },
  header: {
    width: "100%",
  },
  safeArea: {
    width: "100%",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56, // Standard iOS header height
  },
  leftContainer: {
    minWidth: 40,
    alignItems: "flex-start",
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 8,
  },
  titleContainerCenter: {
    alignItems: "center",
  },
  titleContainerLarge: {
    paddingBottom: 8,
  },
  title: {
    fontSize: 17, // iOS standard title size
    fontWeight: "600",
    textAlign: "left",
  },
  titleLarge: {
    fontSize: 34,
    fontWeight: "700",
    fontStyle: "italic",
  },
  titleCenter: {
    textAlign: "center",
  },
  rightContainer: {
    flexDirection: "row",
    minWidth: 40,
    justifyContent: "flex-end",
  },
  rightButton: {
    marginLeft: 16,
    padding: 4,
  },
  profileButton: {
    marginLeft: 16,
    padding: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
  },
})

export default Header

