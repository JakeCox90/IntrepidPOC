'use client';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from './Typography';
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
import { baseStyles, getThemedStyles } from './styles/BottomNavStyles';

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

  // Get themed styles
  const themedStyles = getThemedStyles(theme);

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
    switch (tabName) {
      case 'Today':
        return isActive ? (
          <SvgIcon source={TodaySelected} width={24} height={24} color={theme.colors.Primary.Resting} />
        ) : (
          <SvgIcon source={TodayResting} width={24} height={24} />
        );
      case 'ForYou':
        return isActive ? (
          <SvgIcon source={ForYouSelected} width={24} height={24} color={theme.colors.Primary.Resting} />
        ) : (
          <SvgIcon source={ForYouResting} width={24} height={24} />
        );
      case 'AllNews':
        return isActive ? (
          <SvgIcon source={AllNewsSelected} width={24} height={24} color={theme.colors.Primary.Resting} />
        ) : (
          <SvgIcon source={AllNewsResting} width={24} height={24} />
        );
      case 'Search':
        return isActive ? (
          <SvgIcon source={SearchSelected} width={24} height={24} color={theme.colors.Primary.Resting} />
        ) : (
          <SvgIcon source={SearchResting} width={24} height={24} />
        );
      case 'Saved':
        return isActive ? (
          <SvgIcon source={SavedSelected} width={24} height={24} color={theme.colors.Primary.Resting} />
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
        baseStyles.container,
        themedStyles.container,
        {
          paddingBottom: insets.bottom || 0,
        },
      ]}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[baseStyles.tab, tab.disabled && baseStyles.disabledTab]}
            onPress={() => onTabPress(tab.name)}
            disabled={tab.disabled}
            activeOpacity={0.7}
          >
            <View style={baseStyles.iconContainer}>
              {renderIcon(tab.name, isActive)}
            </View>
            <Typography
              variant="caption"
              color={isActive ? theme.colors.Primary.Resting : theme.colors.Text.Secondary}
              style={baseStyles.tabLabel}
            >
              {tab.label || tab.name}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;
