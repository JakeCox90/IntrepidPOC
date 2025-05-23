'use client';

import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from '../components/Typography';

const ProfileScreen = (): React.ReactElement => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const theme = useTheme();

  const toggleDarkMode = (value: boolean): void => {
    setDarkModeEnabled(value);
    if (theme.toggleTheme) {
      theme.toggleTheme();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.Surface.Primary }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.Border.Primary }]}>
        <Typography variant="h5" color={theme.colors.Text.Primary}>
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
          <Typography
            variant="overline"
            color={theme.colors.text.tertiary}
            style={styles.sectionTitle}
          >
            ACCOUNT
          </Typography>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <Ionicons
              name="person-outline"
              size={24}
              color={theme.colors.text.secondary}
              style={styles.menuIcon}
            />
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
            <Ionicons
              name="card-outline"
              size={24}
              color={theme.colors.text.secondary}
              style={styles.menuIcon}
            />
            <Typography variant="body-01" color={theme.colors.text.primary} style={styles.menuText}>
              Subscription
            </Typography>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Typography
            variant="subtitle-01"
            color={theme.colors.Text.Primary}
            style={styles.sectionTitle}
          >
            Appearance
          </Typography>

          <View style={styles.setting}>
            <Typography variant="body-01" color={theme.colors.Text.Primary}>
              Dark Mode
            </Typography>
            <Switch
              value={darkModeEnabled}
              onValueChange={toggleDarkMode}
              trackColor={{ false: theme.colors.Border.Primary, true: theme.colors.Primary.Resting }}
              thumbColor={theme.colors.Surface.Primary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Typography
            variant="subtitle-01"
            color={theme.colors.Text.Primary}
            style={styles.sectionTitle}
          >
            Notifications
          </Typography>

          <View style={styles.setting}>
            <Typography variant="body-01" color={theme.colors.Text.Primary}>
              Push Notifications
            </Typography>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.colors.Border.Primary, true: theme.colors.Primary.Resting }}
              thumbColor={theme.colors.Surface.Primary}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Typography
            variant="overline"
            color={theme.colors.text.tertiary}
            style={styles.sectionTitle}
          >
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
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={theme.colors.text.secondary}
              style={styles.menuIcon}
            />
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
          style={[
            styles.signOutButton,
            {
              backgroundColor: theme.isDark
                ? theme.colors.Surface.Primary
                : theme.colors.Surface.Secondary,
            },
          ]}
        >
          <Typography variant="button" color={theme.colors.primary}>
            Sign Out
          </Typography>
        </TouchableOpacity>

        {/* App Version */}
        <Typography
          variant="annotation"
          color={theme.colors.text.tertiary}
          style={styles.versionText}
        >
          Version 1.0.0
        </Typography>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    borderBottomWidth: 1,
    padding: 16,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  menuText: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  signOutButton: {
    alignItems: 'center',
    borderRadius: 8,
    margin: 24,
    padding: 16,
  },
  userAvatar: {
    alignItems: 'center',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  userInfo: {
    marginLeft: 16,
  },
  userSection: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 16,
  },
  versionText: {
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default ProfileScreen;
