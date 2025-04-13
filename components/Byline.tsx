import React, { useMemo, memo } from 'react';
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
  const styles = useMemo(() => getThemedStyles(theme), [theme]);

  // Memoize the container style
  const containerStyle = useMemo(() => [
    baseStyles.container, 
    styles.container
  ], [styles.container]);

  // Memoize the author name component
  const AuthorName = useMemo(() => (
    <Typography variant="subtitle-02" style={styles.authorName}>
      {authorName}
    </Typography>
  ), [authorName, styles.authorName]);

  // Memoize the publish date component
  const PublishDate = useMemo(() => (
    <Typography variant="body-02" style={styles.publishDate}>
      Published {publishDate}
    </Typography>
  ), [publishDate, styles.publishDate]);

  return (
    <View style={containerStyle}>
      {AuthorName}
      {PublishDate}
    </View>
  );
};

export default memo(Byline); 