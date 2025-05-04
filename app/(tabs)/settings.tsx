import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  HelpCircle, 
  FileText, 
  LogOut,
  ChevronRight
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  
  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: () => router.replace('/(auth)'),
          style: 'destructive',
        },
      ]
    );
  };
  
  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          icon: <Bell size={20} color={theme.colors.text} />,
          title: 'Notifications',
          type: 'toggle',
          value: notifications,
          onToggle: () => setNotifications(!notifications),
        },
        {
          id: 'darkMode',
          icon: <Moon size={20} color={theme.colors.text} />,
          title: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onToggle: () => setDarkMode(!darkMode),
        },
        {
          id: 'language',
          icon: <Globe size={20} color={theme.colors.text} />,
          title: 'Language',
          type: 'navigate',
          value: 'English',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          id: 'privacy',
          icon: <Shield size={20} color={theme.colors.text} />,
          title: 'Privacy Settings',
          type: 'navigate',
        },
        {
          id: 'dataUsage',
          icon: <FileText size={20} color={theme.colors.text} />,
          title: 'Data Usage',
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          icon: <HelpCircle size={20} color={theme.colors.text} />,
          title: 'Help Center',
          type: 'navigate',
        },
        {
          id: 'about',
          icon: <FileText size={20} color={theme.colors.text} />,
          title: 'About Tiro',
          type: 'navigate',
        },
      ],
    },
  ];
  
  const renderSettingItem = (item: any) => {
    return (
      <TouchableOpacity 
        key={item.id} 
        style={styles.settingItem}
        onPress={item.type === 'navigate' ? () => {} : undefined}
      >
        <View style={styles.settingItemLeft}>
          <View style={styles.iconContainer}>
            {item.icon}
          </View>
          <Text style={styles.settingTitle}>{item.title}</Text>
        </View>
        
        <View style={styles.settingItemRight}>
          {item.type === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor="white"
            />
          ) : (
            <>
              {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
              <ChevronRight size={18} color={theme.colors.textMuted} />
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronRight size={24} color={theme.colors.text} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView style={styles.content}>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}
        
        <View style={styles.signOutContainer}>
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <LogOut size={20} color={theme.colors.error} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
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
    padding: 16,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 16,
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.colors.backgroundSecondary,
    fontFamily: 'Inter-SemiBold',
  },
  sectionContent: {
    backgroundColor: theme.colors.background,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: theme.colors.text,
    fontFamily: 'Inter-Regular',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginRight: 8,
    fontFamily: 'Inter-Regular',
  },
  signOutContainer: {
    marginTop: 24,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.error,
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
  },
});
