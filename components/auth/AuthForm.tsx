import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Mail, Lock, User } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

interface AuthFormProps {
  isLogin?: boolean;
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  loading?: boolean;
}

export function AuthForm({ 
  isLogin = true, 
  onSubmit,
  loading = false
}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !name) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ 
        email, 
        password,
        ...(isLogin ? {} : { name })
      });
    }
  };
  
  return (
    <View style={styles.container}>
      {!isLogin && (
        <Input
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          error={errors.name}
          icon={<User size={20} color={theme.colors.textMuted} />}
          autoCapitalize="words"
        />
      )}
      
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        icon={<Mail size={20} color={theme.colors.textMuted} />}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={errors.password}
        icon={<Lock size={20} color={theme.colors.textMuted} />}
      />
      
      <Button
        title={isLogin ? 'Login' : 'Sign Up'}
        onPress={handleSubmit}
        style={styles.button}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    marginTop: 16,
  },
});