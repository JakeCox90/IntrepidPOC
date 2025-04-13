import React, { useMemo, memo } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { createReadTimeStyles } from './styles/ReadTime.styles';

interface ReadTimeProps {
  readTime: string;
}

const ReadTime: React.FC<ReadTimeProps> = ({ readTime }) => {
  const theme = useTheme();
  const styles = useMemo(() => createReadTimeStyles(theme), [theme]);

  // Memoize the icon component
  const Icon = useMemo(() => (
    <Feather name="book-open" size={16} color={theme.colors.Text.Secondary} />
  ), [theme.colors.Text.Secondary]);

  // Memoize the text component
  const Text = useMemo(() => (
    <Typography
      variant="body-02"
      color={theme.colors.Text.Secondary}
      style={styles.text}
    >
      {readTime}
    </Typography>
  ), [readTime, theme.colors.Text.Secondary, styles.text]);

  return (
    <View style={styles.container}>
      {Icon}
      {Text}
    </View>
  );
};

export default memo(ReadTime); 