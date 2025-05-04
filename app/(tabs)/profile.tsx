import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Star, Settings, LogOut, Briefcase, Heart, Info } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';

const mockUser = {
  name: 'Sipho Nkosi',
  email: 'sipho.nkosi@example.com',
  location: 'Midrand, Gauteng',
  skills: ['Gardening', 'Pet Care', 'Delivery', 'Photography'],
  bio: 'I\'m a university student looking to earn extra income in my spare time. I have reliable transportation and am available most weekends.',
  avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  createdAt: 'March 2023',
  ratings: {
    average: 4.8,
    count: 12,
  },
};

export default function ProfileScreen() {
  const router = useRouter();
  const [removeModalVisible, setRemoveModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedGig, setSelectedGig] = React.useState<string | null>(null);
  
  const handleLogout = () => {
    router.replace('/');
  };
  
  const handleAppliedGigsPress = () => {
    // In a real app, this would navigate to a screen with applied gigs
    // For the demo, we'll just show a modal asking to remove an application
    setSelectedGig('Dog Walking This Weekend');
    setRemoveModalVisible(true);
  };
  
  const handleSettingsPress = () => {
    router.push('/(tabs)/settings');
  };
  
  const handleRemoveApplication = () => {
    // In a real app, this would remove the application
    console.log(`Removed application for: ${selectedGig}`);
    setRemoveModalVisible(false);
    Alert.alert('Application Removed', `Your application for "${selectedGig}" has been removed.`);
  };
  
  const menuItems = [
    {
      id: 'my-gigs',
      icon: <Briefcase size={20} color={theme.colors.text} />,
      title: 'My Gigs',
      subtitle: 'View gigs you\'ve posted or taken',
    },
    {
      id: 'applied-gigs',
      icon: <Heart size={20} color={theme.colors.text} />,
      title: 'Applied Gigs',
      subtitle: 'Gigs you\'ve applied for',
    },
    {
      id: 'settings',
      icon: <Settings size={20} color={theme.colors.text} />,
      title: 'Settings',
      subtitle: 'Manage your account and preferences',
    },
    {
      id: 'about-legal',
      icon: <Info size={20} color={theme.colors.text} />,
      title: 'About & Legal',
      subtitle: 'Information and terms of service',
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileHeaderContainer}>
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: mockUser.avatar }}
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{mockUser.name}</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color={theme.colors.primary} />
                  <Text style={styles.location}>{mockUser.location}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Star size={14} color={theme.colors.warning} fill={theme.colors.warning} />
                  <Text style={styles.rating}>
                    {mockUser.ratings.average} ({mockUser.ratings.count} reviews)
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setEditModalVisible(true)}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.bio}>{mockUser.bio}</Text>
          
          <View style={styles.skillsContainer}>
            <Text style={styles.skillsTitle}>Skills</Text>
            <View style={styles.skillsList}>
              {mockUser.skills.map((skill) => (
                <View key={skill} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={
                item.id === 'applied-gigs' 
                  ? handleAppliedGigsPress 
                  : item.id === 'settings'
                    ? handleSettingsPress
                    : undefined
              }
            >
              <View style={styles.menuIconContainer}>
                {item.icon}
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.section}>
          <Button
            title="Log Out"
            onPress={handleLogout}
            variant="outline"
            icon={<LogOut size={18} color={theme.colors.error} />}
            style={styles.logoutButton}
            textStyle={{ color: theme.colors.error }}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Member since {mockUser.createdAt}
          </Text>
          <Text style={styles.footerText}>
            Tiro • Version 1.0.0
          </Text>
        </View>
      </ScrollView>
      
      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Name</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>{mockUser.name}</Text>
              </View>
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Email</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>{mockUser.email}</Text>
              </View>
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Location</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>{mockUser.location}</Text>
              </View>
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Bio</Text>
              <View style={styles.textAreaContainer}>
                <Text style={styles.inputText}>{mockUser.bio}</Text>
              </View>
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Skills</Text>
              <View style={styles.skillsEditContainer}>
                {mockUser.skills.map((skill) => (
                  <View key={skill} style={styles.skillEditTag}>
                    <Text style={styles.skillEditText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
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
            
            <Text style={styles.modalText}>
              Are you sure you want to remove your application for "{selectedGig}"?
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
    backgroundColor: theme.colors.background,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  profileHeaderContainer: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  bio: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  skillsContainer: {
    marginBottom: 8,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: theme.colors.primaryLightest,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontFamily: 'Inter-Medium',
  },
  section: {
    backgroundColor: theme.colors.background,
    marginTop: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
    paddingHorizontal: 20,
    fontFamily: 'Inter-SemiBold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuIconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  menuSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  logoutButton: {
    marginHorizontal: 20,
    borderColor: theme.colors.error,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginBottom: 4,
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
  // Form field styles
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
    fontFamily: 'Inter-SemiBold',
  },
  inputContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  textAreaContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 100,
  },
  inputText: {
    fontSize: 16,
    color: theme.colors.text,
    fontFamily: 'Inter-Regular',
  },
  skillsEditContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillEditTag: {
    backgroundColor: theme.colors.primaryLightest,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillEditText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontFamily: 'Inter-Medium',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
