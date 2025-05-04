import React from 'react';
import { StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const { width } = useWindowDimensions();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Tiro</Text>
        </View>
        
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} 
          style={[styles.heroImage, { width: width * 0.9 }]} 
          resizeMode="cover"
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Find local gigs, powered by AI</Text>
          <Text style={styles.subtitle}>
            Connect with people in your community for small tasks and jobs under R1000
          </Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <Link href="/login" asChild>
            <Button 
              title="Login" 
              onPress={() => {}}
              style={styles.button}
            />
          </Link>
          
          <Link href="/register" asChild>
            <Button 
              title="Create an Account" 
              onPress={() => {}}
              variant="outline"
              style={styles.button}
            />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.text,
    fontFamily: 'Inter-Bold',
  },
  logoAI: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.primary,
    marginLeft: 4,
    fontFamily: 'Inter-Bold',
  },
  heroImage: {
    height: 250,
    borderRadius: 16,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
});
