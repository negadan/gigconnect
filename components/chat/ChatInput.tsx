import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { Send } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function ChatInput({ 
  onSend, 
  placeholder = 'Type a message...', 
  disabled = false,
  loading = false
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim() && !disabled && !loading) {
      onSend(message.trim());
      setMessage('');
      Keyboard.dismiss();
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={message}
        onChangeText={setMessage}
        multiline
        maxLength={500}
        editable={!disabled}
        placeholderTextColor={theme.colors.textMuted}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          (!message.trim() || disabled || loading) && styles.sendButtonDisabled
        ]}
        onPress={handleSend}
        disabled={!message.trim() || disabled || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Send size={20} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingRight: 50,
    marginRight: 8,
    fontSize: 16,
    color: theme.colors.text,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
});