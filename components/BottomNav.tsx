'use client';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from './Typography';
import { SvgProps } from 'react-native-svg';
import SvgIcon from './SvgIcon';
import TodayResting from '../assets/TodayResting.svg';
import TodaySelected from '../assets/TodaySelected.svg';
import ForYouResting from '../assets/ForYouResting.svg';
import ForYouSelected from '../assets/ForYouSelected.svg';
import SearchResting from '../assets/SearchResting.svg';
import SearchSelected from '../assets/SearchSelected.svg';
import AllNewsResting from '../assets/AllNewsResting.svg';
import AllNewsSelected from '../assets/AllNewsSelected.svg';
import SavedResting from '../assets/SavedResting.svg';
import SavedSelected from '../assets/SavedSelected.svg';

// Define valid tab names as a type to ensure type safety
type ValidTabName = 'Today' | 'ForYou' | 'AllNews' | 'Search' | 'Saved';

// Define tab configuration type
interface TabConfig {
  name: ValidTabName;
  label?: string;
  disabled?: boolean;
}

// Component props with improved type safety
interface BottomNavProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
  isLoading?: boolean;
}

const BottomNav = ({ activeTab, onTabPress, isLoading = false }: BottomNavProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  // Ensure we have fallback values if theme properties are undefined
  const primaryColor = theme?.colors?.Primary?.Resting || '#E03A3A';
  const secondaryColor = theme?.colors?.Text?.Secondary || '#717171';
  const borderColor = theme?.colors?.Border?.Primary || '#E5E5E5';
  const borderWidth = theme?.borderWidth?.['10'] || 1;
  const surfaceColor = theme?.colors?.Surface?.Primary || '#FFFFFF';

  // Define tabs with proper typing
  const tabs: TabConfig[] = [
    { name: 'Today' },
    { name: 'ForYou', label: 'For You' },
    { name: 'AllNews', label: 'All News' },
    { name: 'Search' },
    { name: 'Saved' },
  ];

  // Function to render the appropriate icon based on tab name
  const renderIcon = (tabName: ValidTabName, isActive: boolean) => {
    const color = isActive ? primaryColor : secondaryColor;
    
    switch (tabName) {
      case 'Today':
        return isActive ? (
          <SvgIcon source={TodaySelected} width={24} height={24} color={color} />
        ) : (
          <SvgIcon source={TodayResting} width={24} height={24} color={color} />
        );
      case 'ForYou':
        return isActive ? (
          <SvgIcon source={ForYouSelected} width={24} height={24} />
        ) : (
          <SvgIcon source={ForYouResting} width={24} height={24} />
        );
      case 'AllNews':
        return isActive ? (
          <SvgIcon source={AllNewsSelected} width={24} height={24} />
        ) : (
          <SvgIcon source={AllNewsResting} width={24} height={24} />
        );
      case 'Search':
        return isActive ? (
          <SvgIcon source={SearchSelected} width={24} height={24} />
        ) : (
          <SvgIcon source={SearchResting} width={24} height={24} />
        );
      case 'Saved':
        return isActive ? (
          <SvgIcon source={SavedSelected} width={24} height={24} />
        ) : (
          <SvgIcon source={SavedResting} width={24} height={24} />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderTopWidth: borderWidth,
          borderTopColor: borderColor,
          paddingBottom: insets.bottom || 0,
          backgroundColor: surfaceColor,
        },
      ]}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tab, tab.disabled && styles.disabledTab]}
            onPress={() => onTabPress(tab.name)}
            disabled={tab.disabled}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {renderIcon(tab.name, isActive)}
            </View>
            <Typography
              variant="caption"
              color={isActive ? primaryColor : secondaryColor}
              style={[styles.tabLabel]}
            >
              {tab.label || tab.name}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  disabledTab: {
    opacity: 0.5,
  },
  tabLabel: {
    marginTop: 4,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNav;
