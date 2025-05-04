import { type FC, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client with safe environment variable handling
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Message interface
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

// Profile data interface
interface ProfileData {
  name: string;
  skills: string[];
  interests: string[];
  availability: string;
  locationArea: string;
  bio: string;
}

const ProfileCreationChatScreen: FC = () => {
  // State for messages with initial welcome message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      text: 'Welcome to Tiro! I see you\'re setting up your profile as Sipho Nkosi. I\'ve already filled in some information based on your registration. Would you like to review or update any of your profile details?',
      sender: 'ai'
    }
  ]);
  
  // State for current input
  const [currentInput, setCurrentInput] = useState<string>('');

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // State for extracted profile data
  const [extractedProfileData, setExtractedProfileData] = useState<ProfileData>({
    name: 'Sipho Nkosi',
    skills: ['Gardening', 'Pet Care', 'Delivery', 'Photography'],
    interests: ['Outdoor activities', 'Technology', 'Sports'],
    availability: 'Weekends and evenings',
    locationArea: 'Midrand, Gauteng',
    bio: 'I\'m a university student looking to earn extra income in my spare time. I have reliable transportation and am available most weekends.'
  });

  // State to track conversation completion
  const [isConversationComplete, setIsConversationComplete] = useState(false);

  // Function to add a new message
  const addMessage = (text: string, sender: 'user' | 'ai') => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      sender
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Check if AI signals conversation completion
    if (sender === 'ai' && text.toLowerCase().includes('profile is complete')) {
      setIsConversationComplete(true);
    }
  };

  // Function to handle sending a user message
  const handleSendMessage = async () => {
    if (currentInput.trim() && !isConversationComplete) {
      setIsLoading(true);
      
      try {
        // Add user message
        addMessage(currentInput, 'user');
        
        // Call AI proxy function
        const { data, error } = await supabase.functions.invoke('ai_proxy', {
          body: {
            task: 'profile_creation_chat',
            context: {
              conversation_history: messages,
              user_input: currentInput
            }
          }
        });

        if (error) throw error;

        // Add AI response if successful
        if (data?.result?.ai_response) {
          addMessage(data.result.ai_response, 'ai');
        }

        // Extract and accumulate profile data
        if (data?.result?.extracted_data) {
          const updatedProfileData = {
            ...extractedProfileData,
            ...data.result.extracted_data
          };
          setExtractedProfileData(updatedProfileData);

          // Check if all profile fields are populated
          if (
            updatedProfileData.name &&
            updatedProfileData.skills.length > 0 &&
            updatedProfileData.interests.length > 0 &&
            updatedProfileData.availability &&
            updatedProfileData.locationArea &&
            updatedProfileData.bio
          ) {
            setIsConversationComplete(true);
          }
        }

        // Clear input after sending
        setCurrentInput('');
      } catch (error) {
        console.error('Error in AI conversation:', error);
        addMessage('Sorry, there was an error processing your message.', 'ai');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Render message item
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={{
      alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
      backgroundColor: item.sender === 'user' ? '#DCF8C6' : '#FFFFFF',
      padding: 10,
      margin: 5,
      borderRadius: 10,
      maxWidth: '80%'
    }}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Profile Data Preview */}
      <View style={{ 
        padding: 10, 
        backgroundColor: '#F0F0F0',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC'
      }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Profile Progress:</Text>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontWeight: '600', marginBottom: 2 }}>Name: {extractedProfileData.name}</Text>
          <Text style={{ marginBottom: 2 }}>Location: {extractedProfileData.locationArea || 'Not set'}</Text>
          <Text style={{ marginBottom: 2 }}>Skills: {extractedProfileData.skills.join(', ') || 'Not set'}</Text>
          <Text style={{ marginBottom: 2 }}>Interests: {extractedProfileData.interests.join(', ') || 'Not set'}</Text>
          <Text style={{ marginBottom: 2 }}>Availability: {extractedProfileData.availability || 'Not set'}</Text>
          <Text style={{ marginBottom: 2 }}>Bio: {extractedProfileData.bio || 'Not set'}</Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <View style={{ 
          position: 'absolute', 
          bottom: 70, 
          left: 0, 
          right: 0, 
          alignItems: 'center' 
        }}>
          <ActivityIndicator size="small" color="#007BFF" />
        </View>
      )}

      {/* Input Area */}
      <View style={{ 
        flexDirection: 'row', 
        padding: 10, 
        backgroundColor: '#F0F0F0' 
      }}>
        <TextInput
          value={currentInput}
          onChangeText={setCurrentInput}
          placeholder="Type your message"
          editable={!isLoading}
          style={{ 
            flex: 1, 
            borderWidth: 1, 
            borderColor: '#CCCCCC', 
            borderRadius: 20, 
            paddingHorizontal: 15,
            marginRight: 10,
            opacity: isLoading ? 0.5 : 1
          }}
        />
        <TouchableOpacity 
          onPress={handleSendMessage}
          disabled={isLoading}
          style={{ 
            backgroundColor: isLoading ? '#CCCCCC' : '#007BFF', 
            borderRadius: 20, 
            padding: 10 
          }}
        >
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileCreationChatScreen;
