import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { Button } from '@/components/ui/Button';

interface ChatMessage {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: string;
}

// Initial AI messages to guide the conversation
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    text: 'Hi there! I\'m your GigConnect AI assistant. I\'ll help you set up your profile. First, could you tell me which area in Gauteng you\'re located?',
    isAI: true,
    timestamp: formatTimestamp(new Date()),
  },
];

// Helper function to format timestamps
function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Mock AI responses for profile creation
const aiResponses = [
  "Thanks! What skills or services would you like to offer on GigConnect? For example: gardening, pet care, tutoring, etc.",
  "Great! Could you tell me a bit about yourself? This will help others get to know you better when they're looking for someone to help with a gig.",
  "What's your availability like? Are you available on weekdays, weekends, or both?",
  "Do you have any specific qualifications or experience you'd like to highlight?",
  "Perfect! I've created your profile. You can review and edit any information before saving.",
];

export default function ProfileCreationScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Function to simulate AI response
  const simulateAIResponse = (userMessage: string) => {
    setLoading(true);
    
    // Determine which response to use based on conversation progress
    let responseIndex = Math.min(messages.length - 1, aiResponses.length - 1);
    
    // Determine if we've completed the profile creation
    if (responseIndex === aiResponses.length - 1) {
      setProfileCompleted(true);
    }
    
    // Simulate typing delay
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: aiResponses[responseIndex],
        isAI: true,
        timestamp: formatTimestamp(new Date()),
      };
      
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setLoading(false);
    }, 1500);
  };
  
  // Handle user message submission
  const handleSendMessage = (message: string) => {
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isAI: false,
      timestamp: formatTimestamp(new Date()),
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    simulateAIResponse(message);
  };
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);
  
  const handleSaveProfile = () => {
    // Here you would submit the profile to your backend
    console.log('Saving profile');
    router.replace('/(tabs)');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Your Profile</Text>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
        >
          {messages.map(message => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isAI={message.isAI}
              timestamp={message.timestamp}
            />
          ))}
          
          {profileCompleted && (
            <View style={styles.profileSummary}>
              <Text style={styles.profileSummaryTitle}>
                Profile Summary
              </Text>
              <View style={styles.profileSummaryItem}>
                <Text style={styles.profileSummaryLabel}>Location:</Text>
                <Text style={styles.profileSummaryValue}>Midrand, Gauteng</Text>
              </View>
              <View style={styles.profileSummaryItem}>
                <Text style={styles.profileSummaryLabel}>Skills:</Text>
                <Text style={styles.profileSummaryValue}>Gardening, Pet Care, Delivery, Photography</Text>
              </View>
              <View style={styles.profileSummaryItem}>
                <Text style={styles.profileSummaryLabel}>Bio:</Text>
                <Text style={styles.profileSummaryValue}>
                  I'm a university student looking to earn extra income in my spare time. I have reliable transportation and am available most weekends.
                </Text>
              </View>
              <View style={styles.profileSummaryItem}>
                <Text style={styles.profileSummaryLabel}>Availability:</Text>
                <Text style={styles.profileSummaryValue}>Weekends and evenings</Text>
              </View>
              
              <Button 
                title="Save Profile" 
                onPress={handleSaveProfile}
                style={styles.saveButton}
              />
            </View>
          )}
        </ScrollView>
        
        <ChatInput 
          onSend={handleSendMessage} 
          disabled={loading || profileCompleted}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 24,
  },
  profileSummary: {
    marginTop: 24,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  profileSummaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  profileSummaryItem: {
    marginBottom: 12,
  },
  profileSummaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  profileSummaryValue: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  saveButton: {
    marginTop: 16,
  },
});