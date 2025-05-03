import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthForm } from '@/components/auth/AuthForm';
import { theme } from '@/constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleRegister = async (data: { email: string; password: string; name?: string }) => {
    setLoading(true);
    
    // Here you would normally register the user
    // For now, we'll simulate a delay and redirect to profile creation
    
    setTimeout(() => {
      setLoading(false);
      router.replace('/profile-creation');
    }, 1500);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
          </View>
          
          <View style={styles.formContainer}>
            <AuthForm 
              isLogin={false} 
              onSubmit={handleRegister}
              loading={loading}
            />
            
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
            </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Log In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    fontFamily: 'Inter-Bold',
  },
  formContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 24,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  termsLink: {
    color: theme.colors.primary,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    padding: 16,
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  footerLink: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});