import React from 'react';
import { StyleSheet, View, Text, Image, ViewStyle, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

interface CardProps {
  style?: ViewStyle;
  children: React.ReactNode;
  onPress?: () => void;
}

export function Card({ style, children, onPress }: CardProps) {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      style={[styles.card, style]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.9 : 1}
    >
      {children}
    </CardComponent>
  );
}

interface CardContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

export function CardContent({ style, children }: CardContentProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

interface CardImageProps {
  source: { uri: string };
  height?: number;
}

export function CardImage({ source, height = 200 }: CardImageProps) {
  return (
    <Image 
      source={source} 
      style={[styles.image, { height }]} 
      resizeMode="cover" 
    />
  );
}

interface CardTitleProps {
  children: React.ReactNode;
}

export function CardTitle({ children }: CardTitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

interface CardDescriptionProps {
  children: React.ReactNode;
}

export function CardDescription({ children }: CardDescriptionProps) {
  return <Text style={styles.description}>{children}</Text>;
}

interface CardFooterProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

export function CardFooter({ style, children }: CardFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});