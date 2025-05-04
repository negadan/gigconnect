import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, RefreshControl, Alert, TouchableOpacity, Modal } from 'react-native';
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
    title: 'House Cleaning Needed',
    description: 'Looking for someone to help clean a 2-bedroom apartment. Basic cleaning supplies provided. No special skills required.',
    price: 300,
    location: 'Sandton',
    duration: '3 hours',
    tags: ['Cleaning', 'Housework', 'Weekend'],
    postedDate: '1 day ago',
    posterUserId: 'user3',
    posterName: 'Thabo Molefe',
    status: 'open',
    image: 'https://images.pexels.com/photos/4107112/pexels-photo-4107112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'Grocery Shopping Assistant',
    description: 'Need help with weekly grocery shopping. Must be able to carry heavy items up one flight of stairs.',
    price: 150,
    location: 'Bryanston',
    duration: '2 hours',
    tags: ['Shopping', 'Assistance', 'Weekly'],
    postedDate: '3 days ago',
    posterUserId: 'user4',
    posterName: 'Maria Naidoo',
    status: 'open',
    image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Mock data for recent gigs
const mockRecentGigs: Gig[] = [
  {
    id: '5',
    title: 'Car Wash at Home',
    description: 'Looking for someone to wash two cars at my home. All cleaning supplies and equipment will be provided.',
    price: 180,
    location: 'Fourways',
    duration: '2 hours',
    tags: ['Car Wash', 'Cleaning', 'Weekend'],
    postedDate: '5 hours ago',
    posterUserId: 'user5',
    posterName: 'Eleanor Sithole',
    status: 'open',
    image: 'https://images.pexels.com/photos/6873076/pexels-photo-6873076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    title: 'Moving Help - Small Apartment',
    description: 'Need assistance moving boxes and furniture from a small one-bedroom apartment to a new place nearby.',
    price: 350,
    location: 'Rosebank',
    duration: '4 hours',
    tags: ['Moving', 'Heavy Lifting', 'Weekend'],
    postedDate: '6 hours ago',
    posterUserId: 'user6',
    posterName: 'James Wilson',
    status: 'open',
    image: 'https://images.pexels.com/photos/4246091/pexels-photo-4246091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '7',
    title: 'Lawn Mowing Service',
    description: 'Need someone to mow my lawn. Equipment will be provided. Approximately 300 square meters of grass.',
    price: 200,
    location: 'Kyalami',
    duration: '2 hours',
    tags: ['Gardening', 'Lawn Care', 'Outdoors'],
    postedDate: '1 day ago',
    posterUserId: 'user7',
    posterName: 'Nomsa Dlamini',
    status: 'open',
    image: 'https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  const [notificationsVisible, setNotificationsVisible] = React.useState(false);
  const [selectedGig, setSelectedGig] = React.useState<Gig | null>(null);
  const [applyModalVisible, setApplyModalVisible] = React.useState(false);
  const [applicationSuccess, setApplicationSuccess] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);
  
  const handleGigPress = (gig: Gig) => {
    setSelectedGig(gig);
    setApplyModalVisible(true);
  };
  
  const handleApply = () => {
    if (selectedGig) {
      console.log(`Applied for gig: ${selectedGig.id}`);
      setApplyModalVisible(false);
      // Show success message
      setApplicationSuccess(true);
      setTimeout(() => {
        setApplicationSuccess(false);
      }, 3000);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Sipho</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={theme.colors.primary} />
            <Text style={styles.location}>Midrand, Gauteng</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.notificationContainer}
          onPress={() => setNotificationsVisible(true)}
        >
          <BellDot size={24} color={theme.colors.text} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>

        {/* Notifications Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={notificationsVisible}
          onRequestClose={() => setNotificationsVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Notifications</Text>
                <TouchableOpacity onPress={() => setNotificationsVisible(false)}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>Application Accepted!</Text>
                <Text style={styles.notificationText}>Your application for "Dog Walking This Weekend" has been accepted.</Text>
                <Text style={styles.notificationTime}>10 minutes ago</Text>
              </View>
              
              <View style={styles.notificationDivider} />
              
              <View style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>New Message</Text>
                <Text style={styles.notificationText}>Sarah Johnson sent you a message about the garden project.</Text>
                <Text style={styles.notificationTime}>1 hour ago</Text>
              </View>
              
              <View style={styles.notificationDivider} />
              
              <View style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>Payment Received</Text>
                <Text style={styles.notificationText}>You received R200 for completing "Grocery Delivery".</Text>
                <Text style={styles.notificationTime}>Yesterday</Text>
              </View>
            </View>
          </View>
        </Modal>
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
          
          // Default return to satisfy TypeScript
          return null;
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
      
      {/* Apply for Gig Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={applyModalVisible}
        onRequestClose={() => setApplyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Apply for Gig</Text>
              <TouchableOpacity onPress={() => setApplyModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
            
            {selectedGig && (
              <View>
                <Text style={styles.gigTitle}>{selectedGig.title}</Text>
                
                <View style={styles.gigInfoContainer}>
                  <View style={styles.gigInfoItem}>
                    <MapPin size={16} color={theme.colors.primary} />
                    <Text style={styles.gigInfoText}>{selectedGig.location}</Text>
                  </View>
                  <View style={styles.gigPriceContainer}>
                    <Text style={styles.gigPrice}>R{selectedGig.price}</Text>
                  </View>
                </View>
                
                <Text style={styles.gigDescription}>{selectedGig.description}</Text>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => setApplyModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.applyButton}
                    onPress={handleApply}
                  >
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Success Message */}
      {applicationSuccess && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Application Submitted Successfully!</Text>
        </View>
      )}
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    width: '100%',
    maxHeight: '80%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    fontSize: 16,
    color: theme.colors.primary,
    fontFamily: 'Inter-Medium',
  },
  // Notification styles
  notificationItem: {
    marginBottom: 15,
    paddingVertical: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  notificationText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  notificationTime: {
    fontSize: 12,
    color: theme.colors.textMuted,
    fontFamily: 'Inter-Regular',
  },
  notificationDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 10,
  },
  // Gig details styles
  gigTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 12,
    fontFamily: 'Inter-Bold',
  },
  gigInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  gigInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gigInfoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 6,
    fontFamily: 'Inter-Regular',
  },
  gigPriceContainer: {
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  gigPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    fontFamily: 'Inter-Bold',
  },
  gigDescription: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  // Success message styles
  successMessage: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: theme.colors.success,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
