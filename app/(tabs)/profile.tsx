import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Star, Settings, LogOut, Briefcase, Heart, Info } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';

const mockUser = {
  name: 'Alex Ndlovu',
  email: 'alex.ndlovu@example.com',
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
  
  const handleLogout = () => {
    router.replace('/');
  };
  
  const menuItems = [
    {
      id: 'my-gigs',
      icon: <Briefcase size={20} color={theme.colors.text} />,
      title: 'My Gigs',
      subtitle: 'View gigs you\'ve posted or taken',
    },
    {
      id: 'saved-gigs',
      icon: <Heart size={20} color={theme.colors.text} />,
      title: 'Saved Gigs',
      subtitle: 'Gigs you\'ve saved for later',
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
            <TouchableOpacity key={item.id} style={styles.menuItem}>
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
            GigConnect AI • Version 1.0.0
          </Text>
        </View>
      </ScrollView>
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
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
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
});
