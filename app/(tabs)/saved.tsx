import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookmarkX } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GigCard } from '@/components/gigs/GigCard';
import { Gig } from '@/types/gig';

// Mock data for saved gigs
const mockSavedGigs: Gig[] = [
  {
    id: '2',
    title: 'Dog Walking This Weekend',
    description: 'Need someone to walk my golden retriever this Saturday and Sunday. She is friendly and well-behaved. 30 minutes each day.',
    price: 200,
    location: 'Waterfall',
    duration: '1 hour total',
    tags: ['Pets', 'Walking', 'Weekend'],
    postedDate: '1 day ago',
    posterUserId: 'user2',
    posterName: 'Michael Chen',
    status: 'open',
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'Event Photography for NPO',
    description: 'Seeking a volunteer photographer for our community cleanup event this Sunday. Photos will be used on our social media.',
    price: 0,
    location: 'Kyalami',
    duration: '3 hours',
    tags: ['Photography', 'Volunteer', 'NPO'],
    postedDate: '3 days ago',
    posterUserId: 'user4',
    posterName: 'Hope Community Centre',
    status: 'open',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function SavedScreen() {
  const handleGigPress = (gig: Gig) => {
    // Navigate to gig detail screen
    console.log(`Viewing gig: ${gig.id}`);
    // router.push(`/gig/${gig.id}`);
  };
  
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <BookmarkX size={64} color={theme.colors.border} />
        <Text style={styles.emptyTitle}>No saved gigs yet</Text>
        <Text style={styles.emptyText}>
          Gigs you save will appear here for easy access
        </Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Gigs</Text>
      </View>
      
      <FlatList
        data={mockSavedGigs}
        renderItem={({ item }) => (
          <View style={styles.gigCardContainer}>
            <GigCard gig={item} onPress={handleGigPress} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
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
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  gigCardContainer: {
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});