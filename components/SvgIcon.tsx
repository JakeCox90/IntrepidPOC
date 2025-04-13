import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { SvgIconProps } from '../types/components';

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