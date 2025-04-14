import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '../design-system/Foundations/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'minimal';
export type ButtonState = 'resting' | 'pressed' | 'disabled';
export type IconPosition = 'left' | 'right';

interface ButtonProps {
  variant?: ButtonVariant;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  label,
  onPress,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  testID,
}) => {
  const getBackgroundColor = (variant: ButtonVariant, disabled: boolean, pressed: boolean) => {
    if (disabled) {
      switch (variant) {
        case 'primary':
          return colors.Primary.Disabled;
        case 'secondary':
          return colors.Secondary.Disabled;
        case 'minimal':
          return 'transparent';
      }
    }

    if (pressed) {
      switch (variant) {
        case 'primary':
          return colors.Primary.Pressed;
        case 'secondary':
          return colors.Secondary.Pressed;
        case 'minimal':
          return 'transparent';
      }
    }

    switch (variant) {
      case 'primary':
        return colors.Primary.Resting;
      case 'secondary':
        return colors.Secondary.Resting;
      case 'minimal':
        return 'transparent';
    }
  };

  const getTextColor = (variant: ButtonVariant, disabled: boolean) => {
    if (disabled) {
      return colors.Text.Disabled;
    }

    switch (variant) {
      case 'primary':
        return colors.Text.Inverse;
      case 'secondary':
      case 'minimal':
        return colors.Text.Primary;
    }
  };

  const renderContent = () => {
    const textColor = getTextColor(variant, disabled);

    return (
      <View style={[styles.contentContainer, icon && styles.contentWithIcon] as StyleProp<ViewStyle>}>
        {icon && iconPosition === 'left' && (
          <View style={styles.iconContainer}>
            {React.isValidElement(icon) &&
              React.cloneElement(icon as React.ReactElement, {
                color: textColor,
              })}
          </View>
        )}
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        {icon && iconPosition === 'right' && (
          <View style={styles.iconContainer}>
            {React.isValidElement(icon) &&
              React.cloneElement(icon as React.ReactElement, {
                color: textColor,
              })}
          </View>
        )}
      </View>
    );
  };

  const getButtonStyle = ({ pressed }: { pressed: boolean }): StyleProp<ViewStyle> => [
    styles.button,
    {
      backgroundColor: getBackgroundColor(variant, disabled, pressed),
    },
    fullWidth && styles.fullWidth,
    variant === 'secondary' && styles.secondaryBorder,
  ];

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={getButtonStyle as TouchableOpacityProps['style']}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  secondaryBorder: {
    borderWidth: 1,
    borderColor: colors.Border.Primary,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWithIcon: {
    marginHorizontal: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 