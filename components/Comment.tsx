'use client';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { Comment as CommentType } from '../types/shared';

interface CommentProps {
  comment: CommentType;
  isLiked: boolean;
  onLike: (commentId: string | number) => void;
  onReply: (commentId: string | number) => void;
  onViewReplies?: (commentId: string | number) => void;
}

// ... existing code ... 