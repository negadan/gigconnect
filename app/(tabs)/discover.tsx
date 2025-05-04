import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Heart } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { SwipeableGigCard } from '@/components/gigs/SwipeableGigCard';
import { Gig } from '@/types/gig';

// Mock data for gigs to discover
const mockGigsToDiscover: Gig[] = [
  {
    id: '1',
    title: 'Help with Small Garden Project',
    description: 'Looking for someone to help plant flowers and set up a small vegetable garden in my backyard. Around 3-4 hours of work. Some gardening experience preferred but not required. Tools and supplies provided.',
    price: 400,
    location: 'Midrand',
    duration: '3-4 hours',
    tags: ['Gardening', 'Physical', 'Outdoors'],
    postedDate: '2 days ago',
    posterUserId: 'user1',
    posterName: 'Sarah Johnson',
    status: 'open',
    image: 'https://images.pexels.com/photos/6231703/pexels-photo-6231703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Dog Walking This Weekend',
    description: 'Need someone to walk my golden retriever this Saturday and Sunday. She is friendly and well-behaved. 30 minutes each day in the morning around 9am. Nice walking routes in the neighborhood.',
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
    id: '3',
    title: 'Computer Setup Assistance',
    description: 'Need help setting up a new desktop computer, installing basic software, and transferring files from my old laptop. Should take around 2 hours. Tech-savvy person needed but no professional experience required.',
    price: 350,
    location: 'Sunninghill',
    duration: '2 hours',
    tags: ['Tech Support', 'Computer', 'Setup'],
    postedDate: '5 hours ago',
    posterUserId: 'user3',
    posterName: 'David Ndlovu',
    status: 'open',
  },
  {
    id: '4',
    title: 'Event Photography for NPO',
    description: 'Seeking a volunteer photographer for our community cleanup event this Sunday from 10am to 1pm. Photos will be used on our social media channels. Bring your own camera equipment. Lunch provided.',
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
  {
    id: '5',
    title: 'Grocery Delivery Needed',
    description: 'Looking for someone to pick up my groceries from Woolworths and deliver to my home. I have mobility issues and cannot go myself. The shopping list will be provided in advance. Store is about 3km from my house.',
    price: 150,
    location: 'Carlswald',
    duration: '1 hour',
    tags: ['Delivery', 'Shopping', 'Assistance'],
    postedDate: '3 hours ago',
    posterUserId: 'user5',
    posterName: 'Eleanor Sithole',
    status: 'open',
  },
];

export default function DiscoverScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [savedGigs, setSavedGigs] = useState<string[]>([]);
  
  const handleSwipeLeft = (gig: Gig) => {
    console.log(`Skipped gig: ${gig.id}`);
    goToNextGig();
  };
  
  const handleSwipeRight = (gig: Gig) => {
    console.log(`Saved gig: ${gig.id}`);
    setSavedGigs([...savedGigs, gig.id]);
    goToNextGig();
  };
  
  const handleGigPress = (gig: Gig) => {
    // Navigate to gig detail screen
    console.log(`Viewing gig: ${gig.id}`);
    // router.push(`/gig/${gig.id}`);
  };
  
  const goToNextGig = () => {
    if (currentIndex < mockGigsToDiscover.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of gigs, could reload or show a message
      setLoading(true);
      
      // Simulate fetching more gigs
      setTimeout(() => {
        setCurrentIndex(0);
        setLoading(false);
      }, 1500);
    }
  };
  
  const renderActionButtons = () => {
    return (
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.skipButton]}
          onPress={() => handleSwipeLeft(mockGigsToDiscover[currentIndex])}
        >
          <X size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.saveButton]}
          onPress={() => handleSwipeRight(mockGigsToDiscover[currentIndex])}
        >
          <Heart size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Gigs</Text>
      </View>
      
      <View style={styles.cardContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Finding more gigs...</Text>
          </View>
        ) : (
          <>
            {currentIndex < mockGigsToDiscover.length ? (
              <SwipeableGigCard 
                gig={mockGigsToDiscover[currentIndex]} 
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onPress={handleGigPress}
              />
            ) : (
              <View style={styles.noMoreGigsContainer}>
                <Text style={styles.noMoreGigsText}>
                  No more gigs to discover
                </Text>
                <Text style={styles.noMoreGigsSubtext}>
                  Check back later for more opportunities
                </Text>
              </View>
            )}
          </>
        )}
      </View>
      
      {!loading && currentIndex < mockGigsToDiscover.length && renderActionButtons()}
      
      <View style={styles.progressContainer}>
        {mockGigsToDiscover.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.progressDot,
              index === currentIndex && styles.progressDotActive
            ]} 
          />
        ))}
      </View>
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  noMoreGigsContainer: {
    alignItems: 'center',
    padding: 24,
  },
  noMoreGigsText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  noMoreGigsSubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 24,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  skipButton: {
    backgroundColor: theme.colors.warning,
  },
  saveButton: {
    backgroundColor: theme.colors.success,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: theme.colors.primary,
    width: 16,
  },
});
