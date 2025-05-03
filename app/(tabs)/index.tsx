import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, BellDot } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GigCard } from '@/components/gigs/GigCard';
import { Gig } from '@/types/gig';
import { useRouter } from 'expo-router';

// Mock data for recommended gigs
const mockRecommendedGigs: Gig[] = [
  {
    id: '1',
    title: 'Help with Small Garden Project',
    description: 'Looking for someone to help plant flowers and set up a small vegetable garden in my backyard. Around 3-4 hours of work.',
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
    id: '3',
    title: 'Computer Setup Assistance',
    description: 'Need help setting up a new desktop computer, installing basic software, and transferring files from my old laptop.',
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

// Mock data for recent gigs
const mockRecentGigs = [
  {
    id: '5',
    title: 'Grocery Delivery Needed',
    description: 'Looking for someone to pick up my groceries from Woolworths and deliver to my home. I have mobility issues and cannot go myself.',
    price: 150,
    location: 'Carlswald',
    duration: '1 hour',
    tags: ['Delivery', 'Shopping', 'Assistance'],
    postedDate: '3 hours ago',
    posterUserId: 'user5',
    posterName: 'Eleanor Sithole',
    status: 'open',
  },
  {
    id: '6',
    title: 'Website Form Debugging',
    description: 'Need someone with basic JavaScript knowledge to help debug a contact form on my small business website.',
    price: 500,
    location: 'Remote',
    duration: 'Flexible',
    tags: ['Web Development', 'JavaScript', 'Remote Work'],
    postedDate: '6 hours ago',
    posterUserId: 'user6',
    posterName: 'James Wilson',
    status: 'open',
    image: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);
  
  const handleGigPress = (gig: Gig) => {
    // Navigate to gig detail screen
    console.log(`Viewing gig: ${gig.id}`);
    // router.push(`/gig/${gig.id}`);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Alex</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={theme.colors.primary} />
            <Text style={styles.location}>Midrand, Gauteng</Text>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <BellDot size={24} color={theme.colors.text} />
          <View style={styles.notificationBadge} />
        </View>
      </View>
      
      <FlatList
        data={[{ key: 'header' }, { key: 'recommended' }, { key: 'recent' }]}
        renderItem={({ item }) => {
          if (item.key === 'header') {
            return (
              <View style={styles.heroContainer}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/7605913/pexels-photo-7605913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
                <View style={styles.heroContent}>
                  <Text style={styles.heroTitle}>Find local gigs</Text>
                  <Text style={styles.heroSubtitle}>
                    Connect with people in your community
                  </Text>
                </View>
              </View>
            );
          }
          
          if (item.key === 'recommended') {
            return (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recommended for you</Text>
                <FlatList
                  data={mockRecommendedGigs}
                  renderItem={({ item }) => (
                    <GigCard gig={item} onPress={handleGigPress} />
                  )}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalListContent}
                  ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                />
              </View>
            );
          }
          
          if (item.key === 'recent') {
            return (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recently posted</Text>
                {mockRecentGigs.map((gig) => (
                  <GigCard 
                    key={gig.id} 
                    gig={gig} 
                    onPress={handleGigPress} 
                  />
                ))}
              </View>
            );
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: theme.colors.background,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  notificationContainer: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  heroContainer: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  horizontalListContent: {
    paddingRight: 16,
  },
});