'use client';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';

interface BottomTabsProps {
  activeTab: 'allNews' | 'search' | 'saved';
  onTabPress: (tab: 'allNews' | 'search' | 'saved') => void;
}

const BottomTabs = ({ activeTab, onTabPress }: BottomTabsProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.Surface.Primary,
          borderTopWidth: theme.borderWidth['10'],
          borderTopColor: theme.colors.Border.Primary,
        },
      ]}
    >
      <TouchableOpacity style={styles.tab} onPress={() => onTabPress('allNews')}>
        <Feather
          name="grid"
          size={24}
          color={
            activeTab === 'allNews' ? theme.colors.Primary.Resting : theme.colors.Text.Secondary
          }
        />
        <Typography
          variant="annotation"
          color={
            activeTab === 'allNews' ? theme.colors.Primary.Resting : theme.colors.Text.Secondary
          }
        >
          All News
        </Typography>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => onTabPress('search')}>
        <Feather
          name="search"
          size={24}
          color={
            activeTab === 'search' ? theme.colors.Primary.Resting : theme.colors.Text.Secondary
          }
        />
        <Typography
          variant="annotation"
          color={
            activeTab === 'search' ? theme.colors.Primary.Resting : theme.colors.Text.Secondary
          }
        >
          Search
        </Typography>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => onTabPress('saved')}>
        <Feather
          name="bookmark"
          size={24}
          color={activeTab === 'saved' ? theme.colors.Primary.Resting : theme.colors.Text.Secondary}
        />
        <Typography
          variant="annotation"
          color={activeTab === 'saved' ? theme.colors.Primary.Resting : theme.colors.Text.Secondary}
        >
          Saved
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    paddingBottom: 8,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default BottomTabs;
