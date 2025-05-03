import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

interface ChatBubbleProps {
  message: string;
  isAI?: boolean;
  timestamp?: string;
  style?: ViewStyle;
}

export function ChatBubble({ 
  message, 
  isAI = false, 
  timestamp, 
  style 
}: ChatBubbleProps) {
  return (
    <View 
      style={[
        styles.container, 
        isAI ? styles.aiContainer : styles.userContainer,
        style
      ]}
    >
      <View 
        style={[
          styles.bubble, 
          isAI ? styles.aiBubble : styles.userBubble
        ]}
      >
        <Text 
          style={[
            styles.message, 
            isAI ? styles.aiMessage : styles.userMessage
          ]}
        >
          {message}
        </Text>
      </View>
      {timestamp && (
        <Text style={styles.timestamp}>
          {timestamp}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    maxWidth: '80%',
  },
  aiContainer: {
    alignSelf: 'flex-start',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  aiBubble: {
    backgroundColor: theme.colors.aiChatBubble,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: theme.colors.userChatBubble,
    borderBottomRightRadius: 4,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
  },
  aiMessage: {
    color: theme.colors.text,
  },
  userMessage: {
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 4,
    marginHorizontal: 8,
  },
});