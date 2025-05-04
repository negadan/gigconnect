import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Text,
  Alert
} from 'react-native';
import { Send } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';

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

  const handleAttachMedia = async () => {
    // 1. Request Permissions (Media Library)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow access to your photos to attach media.");
      return;
    }

    // 2. Launch Image Picker (Library)
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images for now
          allowsEditing: true, // Optional: allow basic editing
          aspect: [4, 3], // Optional: set aspect ratio for editing
          quality: 0.8, // Optional: reduce image quality (0 to 1)
      });

      // 3. Handle result
      if (pickerResult.canceled === true) {
        console.log('Image selection cancelled');
        return;
      }

      if (pickerResult.assets && pickerResult.assets.length > 0) {
          const imageUri = pickerResult.assets[0].uri;
          console.log('Selected Image URI:', imageUri);
          // TODO: Handle the image URI
          // - Add to message data structure?
          // - Display preview?
          // - Start upload process?
      }
    } catch (error) {
        console.error("Error picking image: ", error);
        Alert.alert("Error", "Could not pick image.");
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.attachButton}
        onPress={handleAttachMedia}
        disabled={disabled || loading}
      >
        <Text style={styles.attachButtonText}>+</Text>
      </TouchableOpacity>
      
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
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  attachButtonText: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: 'bold'
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