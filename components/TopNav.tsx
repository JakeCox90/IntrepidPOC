'use client';
import { View, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from './Typography';
import { createTopNavStyles } from './styles/TopNav.styles';

interface TopNavProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  rightButtons?: Array<{
    label: string;
    onPress: () => void;
    icon?: string;
  }>;
  variant?: 'default' | 'explore';
  hasStepper?: boolean;
}

const TopNav = ({
  title,
  showBackButton = false,
  onBackPress,
  backgroundColor,
  textColor,
  rightButtons = [],
  variant = 'default',
  hasStepper = false,
}: TopNavProps) => {
  const theme = useTheme();
  const styles = createTopNavStyles(theme);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  // Safely get theme values with fallbacks
  const bgColor = backgroundColor || theme.colors.Surface.Primary;
  const txtColor = textColor || theme.colors.Text.Primary;

  if (variant === 'explore') {
    return (
      <View
        style={[
          styles.exploreContainer,
          {
            backgroundColor: bgColor,
            paddingTop: insets.top || (Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0),
          },
        ]}
      >
        <Typography
          variant="h3"
          style={[
            styles.exploreTitle,
            {
              color: txtColor,
            },
          ]}
        >
          {title}
        </Typography>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          paddingTop: insets.top || (Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0),
        },
        !hasStepper && styles.borderBottom,
      ]}
    >
      <View style={[styles.content, hasStepper && styles.contentWithStepper]}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back" size={24} color={txtColor} />
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <Typography variant="subtitle-01" color={txtColor} style={styles.title} numberOfLines={1}>
            {title}
          </Typography>
        </View>

        {rightButtons.length > 0 && (
          <View style={styles.rightButtonsContainer}>
            {rightButtons.map((button, index) => (
              <TouchableOpacity key={index} style={styles.rightButton} onPress={button.onPress}>
                {button.icon ? (
                  <Ionicons name={button.icon as any} size={24} color={txtColor} />
                ) : (
                  <Typography variant="subtitle-01" color={txtColor}>
                    {button.label}
                  </Typography>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default TopNav;
