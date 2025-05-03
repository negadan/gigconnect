import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { MapPin, Clock, Tag } from 'lucide-react-native';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { theme } from '@/constants/theme';
import { Gig } from '@/types/gig';

interface GigCardProps {
  gig: Gig;
  onPress: (gig: Gig) => void;
}

export function GigCard({ gig, onPress }: GigCardProps) {
  return (
    <Card 
      style={styles.card} 
      onPress={() => onPress(gig)}
    >
      {gig.image && (
        <Image 
          source={{ uri: gig.image }} 
          style={styles.image} 
          resizeMode="cover" 
        />
      )}
      
      <CardContent>
        <View style={styles.header}>
          <Text style={styles.title}>{gig.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>R{gig.price}</Text>
          </View>
        </View>
        
        <Text 
          style={styles.description} 
          numberOfLines={2}
        >
          {gig.description}
        </Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MapPin size={16} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>{gig.location}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Clock size={16} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>{gig.duration}</Text>
          </View>
        </View>
      </CardContent>
      
      <CardFooter style={styles.footer}>
        <View style={styles.tags}>
          {gig.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Tag size={12} color={theme.colors.primary} />
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {gig.tags.length > 2 && (
            <Text style={styles.moreTag}>+{gig.tags.length - 2}</Text>
          )}
        </View>
        
        <Text style={styles.postedDate}>
          Posted {gig.postedDate}
        </Text>
      </CardFooter>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
    marginRight: 8,
  },
  priceContainer: {
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  footer: {
    justifyContent: 'space-between',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLightest,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.primary,
    marginLeft: 4,
  },
  moreTag: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  postedDate: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
});