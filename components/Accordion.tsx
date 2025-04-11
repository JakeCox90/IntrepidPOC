'use client';

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { createAccordionStyles } from './styles/Accordion.styles';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Accordion component that can expand/collapse to show/hide content
 *
 * @param title - The title displayed in the header
 * @param children - The content to show when expanded
 */
export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const styles = createAccordionStyles(theme);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.header,
          isExpanded ? styles.expandedHeader : styles.collapsedHeader,
        ]}
        onPress={toggleAccordion}
      >
        <Typography variant="h6">{title}</Typography>
        <Feather
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.colors.Text.Primary}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.contentContainer,
          isExpanded ? styles.expandedContent : null,
        ]}
      >
        {isExpanded && (
          <View style={styles.content}>
            {children}
          </View>
        )}
      </View>
    </View>
  );
};
