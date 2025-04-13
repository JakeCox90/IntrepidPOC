import React from 'react';
import { View } from 'react-native';
import Typography from './Typography';
import { useTheme } from '../theme/ThemeProvider';
import { baseStyles, getThemedStyles } from './styles/Byline.styles';

interface BylineProps {
  authorName: string;
  publishDate: string;
}

export const Byline: React.FC<BylineProps> = ({ authorName, publishDate }) => {
  const theme = useTheme();
  const styles = getThemedStyles(theme);

  return (
    <View style={[baseStyles.container, styles.container]}>
      <Typography variant="subtitle-02" style={styles.authorName}>
        {authorName}
      </Typography>
      <Typography variant="body-02" style={styles.publishDate}>
        Published {publishDate}
      </Typography>
    </View>
  );
}; 