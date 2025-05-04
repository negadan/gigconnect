import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { MapPin, Clock, Tag } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Gig } from '@/types/gig';

interface SwipeableGigCardProps {
  gig: Gig;
  onSwipeLeft: (gig: Gig) => void;
  onSwipeRight: (gig: Gig) => void;
  onPress: (gig: Gig) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export function SwipeableGigCard({ 
  gig, 
  onSwipeLeft, 
  onSwipeRight,
  onPress 
}: SwipeableGigCardProps) {
  const translateX = useSharedValue(0);
  const rotation = useSharedValue(0);
  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      rotation.value = (translateX.value / SCREEN_WIDTH) * 30; // 30 degrees max rotation
    },
    onEnd: (event) => {
      if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH * 1.5);
        runOnJS(onSwipeLeft)(gig);
      } else if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH * 1.5);
        runOnJS(onSwipeRight)(gig);
      } else {
        translateX.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    },
  });
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotation.value}deg` }
      ],
    };
  });
  
  const leftIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value > 20 
        ? Math.min(1, translateX.value / 100) 
        : 0,
    };
  });
  
  const rightIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value < -20 
        ? Math.min(1, -translateX.value / 100) 
        : 0,
    };
  });
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.indicatorLeft, leftIndicatorStyle]}>
        <Text style={styles.indicatorText}>SAVE</Text>
      </Animated.View>
      
      <Animated.View style={[styles.indicatorRight, rightIndicatorStyle]}>
        <Text style={styles.indicatorText}>SKIP</Text>
      </Animated.View>
      
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, animatedStyle]}>
          {gig.image ? (
            <Image 
              source={{ uri: gig.image }} 
              style={styles.image} 
              resizeMode="cover" 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>No image</Text>
            </View>
          )}
          
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>{gig.title}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>R{gig.price}</Text>
              </View>
            </View>
            
            <Text style={styles.description} numberOfLines={3}>
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
            
            <View style={styles.footer}>
              <View style={styles.tags}>
                {gig.tags.slice(0, 3).map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Tag size={12} color={theme.colors.primary} />
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
                {gig.tags.length > 3 && (
                  <Text style={styles.moreTag}>+{gig.tags.length - 3}</Text>
                )}
              </View>
              
              <Text style={styles.postedDate}>
                Posted {gig.postedDate}
              </Text>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    width: SCREEN_WIDTH * 0.95,
    height: '95%',
    borderRadius: 12,
    backgroundColor: theme.colors.cardBackground,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '45%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '45%',
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: theme.colors.textMuted,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
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
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginBottom: 16,
    lineHeight: 22,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 12,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLightest,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
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
  indicatorLeft: {
    position: 'absolute',
    top: '40%',
    left: 20,
    backgroundColor: theme.colors.success,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    zIndex: 10,
    transform: [{ rotate: '-15deg' }],
  },
  indicatorRight: {
    position: 'absolute',
    top: '40%',
    right: 20,
    backgroundColor: theme.colors.warning,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    zIndex: 10,
    transform: [{ rotate: '15deg' }],
  },
  indicatorText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
