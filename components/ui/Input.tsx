import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  icon?: React.ReactNode;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  style,
  inputStyle,
  keyboardType,
  autoCapitalize,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  icon
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        error ? styles.inputError : null,
        multiline ? styles.multiline : null
      ]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        
        <TextInput
          style={[
            styles.input,
            icon ? styles.inputWithIcon : null,
            multiline ? styles.multilineInput : null,
            inputStyle
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          placeholderTextColor={theme.colors.textMuted}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            style={styles.passwordToggle} 
            onPress={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff size={20} color={theme.colors.textMuted} />
            ) : (
              <Eye size={20} color={theme.colors.textMuted} />
            )}
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  iconContainer: {
    paddingLeft: 12,
  },
  passwordToggle: {
    padding: 12,
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.error,
    marginTop: 4,
  },
  multiline: {
    height: 'auto',
  },
  multilineInput: {
    height: 'auto',
    textAlignVertical: 'top',
  },
});