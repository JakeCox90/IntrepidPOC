import React from 'react';
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
  const styles = createReadTimeStyles(theme);

  return (
    <View style={styles.container}>
      <Feather name="book-open" size={16} color={theme.colors.Text.Secondary} />
      <Typography
        variant="body-02"
        color={theme.colors.Text.Secondary}
        style={styles.text}
      >
        {readTime}
      </Typography>
    </View>
  );
};

export default ReadTime; 