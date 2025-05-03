import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator 
} from 'react-native';
import { theme } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left'
}: ButtonProps) {
  
  const getButtonStyles = () => {
    let buttonStyles: ViewStyle[] = [styles.button, styles[size]];
    
    switch(variant) {
      case 'primary':
        buttonStyles.push(styles.primary);
        break;
      case 'secondary':
        buttonStyles.push(styles.secondary);
        break;
      case 'outline':
        buttonStyles.push(styles.outline);
        break;
      case 'ghost':
        buttonStyles.push(styles.ghost);
        break;
    }
    
    if (disabled) {
      buttonStyles.push(styles.disabled);
    }
    
    return buttonStyles;
  };
  
  const getTextStyles = () => {
    let textStyles: TextStyle[] = [styles.text, styles[`${size}Text`]];
    
    switch(variant) {
      case 'primary':
        textStyles.push(styles.primaryText);
        break;
      case 'secondary':
        textStyles.push(styles.secondaryText);
        break;
      case 'outline':
        textStyles.push(styles.outlineText);
        break;
      case 'ghost':
        textStyles.push(styles.ghostText);
        break;
    }
    
    if (disabled) {
      textStyles.push(styles.disabledText);
    }
    
    return textStyles;
  };
  
  return (
    <TouchableOpacity
      style={[...getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : theme.colors.primary} 
          size="small" 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={[...getTextStyles(), textStyle]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 8,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: theme.colors.primary,
  },
  ghostText: {
    color: theme.colors.primary,
  },
  disabledText: {
    color: theme.colors.textMuted,
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
});