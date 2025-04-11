'use client';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { Feather } from '@expo/vector-icons';
import { baseStyles, getThemedStyles } from './styles/BundleCardStyles';

interface BundleCardProps {
  title: string;
  subtitle: string;
  storyCount: number;
  imageUrl: string;
  onPress: () => void;
  onNotify?: () => void;
}

const BundleCard = ({
  title,
  subtitle,
  storyCount,
  imageUrl,
  onPress,
  onNotify,
}: BundleCardProps) => {
  const theme = useTheme();
  
  // Get themed styles
  const themedStyles = getThemedStyles(theme);

  const handleNotifyPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (onNotify) {
      onNotify();
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={baseStyles.container}
        imageStyle={baseStyles.imageStyle}
      >
        {/* Dark gradient overlay */}
        <View style={[baseStyles.overlay, themedStyles.overlay]}>
          <View style={baseStyles.content}>
            <Typography variant="h5" color={theme.colors.Text.Inverse} style={baseStyles.title}>
              {title}
            </Typography>
            <Typography variant="subtitle-01" color={theme.colors.Text.Inverse} style={baseStyles.subtitle}>
              {subtitle}
            </Typography>
            <Typography variant="body-02" color={theme.colors.Text.Inverse} style={baseStyles.storyCount}>
              {storyCount} stories
            </Typography>
          </View>
          {onNotify && (
            <TouchableOpacity
              style={baseStyles.notifyButton}
              onPress={handleNotifyPress}
              activeOpacity={0.7}
            >
              <View style={[baseStyles.notifyIconContainer, themedStyles.notifyIconContainer]}>
                <Feather name="bell" size={18} color={theme.colors.Text.Inverse} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default BundleCard;
