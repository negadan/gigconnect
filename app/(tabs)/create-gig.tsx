import React, { useState, useEffect } from 'react';
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
    text: 'Hi there! I\'m your GigConnect AI assistant. I\'ll help you create a new gig posting. What kind of task or service are you looking for help with?',
    isAI: true,
    timestamp: formatTimestamp(new Date()),
  },
];

// Helper function to format timestamps
function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Mock AI responses based on conversation stage
const aiResponses = [
  "That sounds interesting! Could you provide more details about what the task involves?",
  "Great! Approximately how long do you think this task will take to complete?",
  "Where is this gig located? Is it in a specific area of Midrand or Gauteng?",
  "What skills or qualifications would be helpful for someone completing this task?",
  "Is there any equipment or supplies that you'll provide, or will the person need to bring their own?",
  "Based on the information you've provided, I suggest a price of R350-R450 for this gig. Does that sound reasonable, or would you prefer a different price?",
  "Thanks for all the details! I've created your gig posting. You can review and edit any information before publishing."
];

export default function CreateGigScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [priceRecommended, setPriceRecommended] = useState(false);
  const [gigCompleted, setGigCompleted] = useState(false);
  
  // Function to simulate AI response
  const simulateAIResponse = (userMessage: string) => {
    setLoading(true);
    
    // Determine which response to use based on conversation progress
    let responseIndex = Math.min(messages.length - 1, aiResponses.length - 1);
    
    // Determine if we're at the price recommendation stage
    if (responseIndex === 5) {
      setPriceRecommended(true);
    }
    
    // Determine if we've completed the gig creation
    if (responseIndex === 6) {
      setGigCompleted(true);
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
  
  const handlePublishGig = () => {
    // Here you would submit the gig to your backend
    console.log('Publishing gig');
    router.push('/');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create a Gig</Text>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView 
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
          
          {gigCompleted && (
            <View style={styles.gigSummary}>
              <Text style={styles.gigSummaryTitle}>
                Gig Summary
              </Text>
              <View style={styles.gigSummaryItem}>
                <Text style={styles.gigSummaryLabel}>Title:</Text>
                <Text style={styles.gigSummaryValue}>Garden Help Needed</Text>
              </View>
              <View style={styles.gigSummaryItem}>
                <Text style={styles.gigSummaryLabel}>Description:</Text>
                <Text style={styles.gigSummaryValue}>
                  Looking for someone to help with planting flowers and general garden maintenance. No specialized skills required, just a willingness to help outdoors.
                </Text>
              </View>
              <View style={styles.gigSummaryItem}>
                <Text style={styles.gigSummaryLabel}>Location:</Text>
                <Text style={styles.gigSummaryValue}>Midrand</Text>
              </View>
              <View style={styles.gigSummaryItem}>
                <Text style={styles.gigSummaryLabel}>Duration:</Text>
                <Text style={styles.gigSummaryValue}>3-4 hours</Text>
              </View>
              <View style={styles.gigSummaryItem}>
                <Text style={styles.gigSummaryLabel}>Price:</Text>
                <Text style={styles.gigSummaryValue}>R400</Text>
              </View>
              <View style={styles.gigSummaryItem}>
                <Text style={styles.gigSummaryLabel}>Tags:</Text>
                <Text style={styles.gigSummaryValue}>Gardening, Outdoors, Physical</Text>
              </View>
              
              <Button 
                title="Publish Gig" 
                onPress={handlePublishGig}
                style={styles.publishButton}
              />
            </View>
          )}
        </ScrollView>
        
        <ChatInput 
          onSend={handleSendMessage} 
          disabled={loading || gigCompleted}
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
  gigSummary: {
    marginTop: 24,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  gigSummaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  gigSummaryItem: {
    marginBottom: 12,
  },
  gigSummaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  gigSummaryValue: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  publishButton: {
    marginTop: 16,
  },
});