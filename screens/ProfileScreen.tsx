"use client"

import { useState } from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const theme = useTheme()

  const toggleDarkMode = (value) => {
    setDarkModeEnabled(value)
    if (theme.toggleTheme) {
      theme.toggleTheme()
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Typography variant="h5" color={theme.colors.text.primary}>
          Profile
        </Typography>
      </View>

      <ScrollView style={styles.content}>
        {/* User Info */}
        <View style={[styles.userSection, { borderBottomColor: theme.colors.border }]}>
          <View style={[styles.userAvatar, { backgroundColor: theme.colors.primary }]}>
            <Typography variant="h4" color={theme.colors.text.inverse}>
              JD
            </Typography>
          </View>
          <View style={styles.userInfo}>
            <Typography variant="subtitle-01" color={theme.colors.text.primary}>
              John Doe
            </Typography>
            <Typography variant="body-02" color={theme.colors.text.tertiary}>
              john.doe@example.com
            </Typography>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Typography variant="overline" color={theme.colors.text.tertiary} style={styles.sectionTitle}>
            ACCOUNT
          </Typography>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons name="person-outline" size={24} color={theme.colors.text.secondary} style={styles.menuIcon} />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Edit Profile
            </Typography>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color={theme.colors.text.secondary}
              style={styles.menuIcon}
            />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Change Password
            </Typography>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons name="card-outline" size={24} color={theme.colors.text.secondary} style={styles.menuIcon} />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Subscription
            </Typography>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Typography variant="overline" color={theme.colors.text.tertiary} style={styles.sectionTitle}>
            PREFERENCES
          </Typography>

          <View style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.colors.text.secondary}
              style={styles.menuIcon}
            />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Notifications
            </Typography>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#DDDDDD", true: theme.colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons name="moon-outline" size={24} color={theme.colors.text.secondary} style={styles.menuIcon} />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Dark Mode
            </Typography>
            <Switch
              value={darkModeEnabled}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#DDDDDD", true: theme.colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons name="language-outline" size={24} color={theme.colors.text.secondary} style={styles.menuIcon} />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Language
            </Typography>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Typography variant="overline" color={theme.colors.text.tertiary} style={styles.sectionTitle}>
            SUPPORT
          </Typography>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons
              name="help-circle-outline"
              size={24}
              color={theme.colors.text.secondary}
              style={styles.menuIcon}
            />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Help Center
            </Typography>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons name="chatbubble-outline" size={24} color={theme.colors.text.secondary} style={styles.menuIcon} />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Contact Us
            </Typography>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={theme.colors.text.secondary}
              style={styles.menuIcon}
            />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Privacy Policy
            </Typography>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={[styles.signOutButton, { backgroundColor: theme.isDark ? theme.colors.surface : "#F5F5F5" }]}
        >
          <Typography variant="button" color={theme.colors.primary}>
            Sign Out
          </Typography>
        </TouchableOpacity>

        {/* App Version */}
        <Typography variant="annotation" color={theme.colors.text.tertiary} style={styles.versionText}>
          Version 1.0.0
        </Typography>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 16,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  signOutButton: {
    margin: 24,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  versionText: {
    textAlign: "center",
    marginBottom: 24,
  },
})

export default ProfileScreen

