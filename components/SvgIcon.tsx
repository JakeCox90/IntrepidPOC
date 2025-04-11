import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface SvgIconProps extends Omit<SvgProps, 'width' | 'height'> {
  source: React.ComponentType<SvgProps>;
  width?: number | string;
  height?: number | string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ source: SvgComponent, width = 24, height = 24, ...props }) => {
  const containerStyle: ViewStyle = {
    width: typeof width === 'number' ? width : 24,
    height: typeof height === 'number' ? height : 24,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <View style={containerStyle}>
      <SvgComponent 
        {...props} 
        width={width !== undefined ? String(width) : '24'} 
        height={height !== undefined ? String(height) : '24'} 
      />
    </View>
  );
};

export default SvgIcon; 