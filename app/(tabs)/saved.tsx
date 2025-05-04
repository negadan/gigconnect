import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookmarkX } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GigCard } from '@/components/gigs/GigCard';
import { Gig } from '@/types/gig';

// Mock data for applied gigs
const mockAppliedGigs: Gig[] = [
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
  const [removeModalVisible, setRemoveModalVisible] = React.useState(false);
  const [selectedGig, setSelectedGig] = React.useState<Gig | null>(null);
  
  const handleGigPress = (gig: Gig) => {
    setSelectedGig(gig);
    setRemoveModalVisible(true);
  };
  
  const handleRemoveApplication = () => {
    if (selectedGig) {
      console.log(`Removed application for gig: ${selectedGig.id}`);
      setRemoveModalVisible(false);
      Alert.alert('Application Removed', `Your application for "${selectedGig.title}" has been removed.`);
    }
  };
  
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <BookmarkX size={64} color={theme.colors.border} />
        <Text style={styles.emptyTitle}>No applied gigs yet</Text>
        <Text style={styles.emptyText}>
          Gigs you've applied for will appear here
        </Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Applied Gigs</Text>
      </View>
      
      <FlatList
        data={mockAppliedGigs}
        renderItem={({ item }) => (
          <View style={styles.gigCardContainer}>
            <GigCard gig={item} onPress={handleGigPress} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
      
      {/* Remove Application Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={removeModalVisible}
        onRequestClose={() => setRemoveModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Remove Application</Text>
              <TouchableOpacity onPress={() => setRemoveModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
            
            {selectedGig && (
              <View>
                <Text style={styles.modalText}>
                  Are you sure you want to remove your application for "{selectedGig.title}"?
                </Text>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => setRemoveModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={handleRemoveApplication}
                  >
                    <Text style={styles.removeButtonText}>Remove Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  modalText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 20,
    lineHeight: 24,
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
  removeButton: {
    flex: 1,
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
