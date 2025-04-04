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
          backgroundColor: theme.colors.background,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity
            style={[styles.backButton, { marginRight: theme.spacing.sm }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.primary,
              fontFamily: theme.typography.fontFamily.bold,
              fontSize: theme.typography.fontSize.xl,
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

