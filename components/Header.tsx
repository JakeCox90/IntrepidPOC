"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

interface HeaderProps {
  title: string
  showBackButton?: boolean
}

const Header = ({ title, showBackButton = false }: HeaderProps) => {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.Surface.Primary,
          paddingHorizontal: theme.space["40"],
          paddingVertical: theme.space["40"],
          borderBottomWidth: theme.borderWidth["10"],
          borderBottomColor: theme.colors.Border["Border-Primary"],
        },
      ]}
    >
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity
            style={[styles.backButton, { marginRight: theme.space["20"] }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.Text.Primary} />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.Primary.Resting,
              fontFamily: theme.typography.fontFamily.bold,
              fontSize: theme.fontSize["3"],
            },
          ]}
        >
          {title}
        </Text>
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
  title: {},
})

export default Header

