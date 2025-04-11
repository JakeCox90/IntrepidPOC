import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface SvgIconProps extends Omit<SvgProps, 'width' | 'height'> {
  source: React.FC<SvgProps>;  // More explicit type definition
  width?: number;
  height?: number;
  color?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ 
  source: SvgComponent, 
  width = 24, 
  height = 24, 
  color,
  ...props 
}) => {
  const containerStyle: ViewStyle = {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <View style={containerStyle}>
      <SvgComponent 
        width={width} 
        height={height}
        color={color}
        {...props}
      />
    </View>
  );
};

export default SvgIcon; 