import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated'

import { ThemedText } from '@/components/ThemedText'
import { Emoji } from '@/components/Emoji'

export function HelloWave() {
  const rotationAnimation = useSharedValue(0)

  rotationAnimation.value = withRepeat(
    withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
    6 // Run the animation # of times
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }))

  return (
    <Animated.View style={[animatedStyle, { justifyContent: 'center' }]}>
      <Emoji value='👋' />
    </Animated.View>
  )
}