import type { PropsWithChildren, ReactElement } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import ThemedView from '@/components/ThemedView'

const HEADER_HEIGHT = 180

type Props = PropsWithChildren<{
  headerImage: ReactElement,
  headerBackgroundColor?: { dark: string, light: string }
}>

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light'
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [(-HEADER_HEIGHT / 2), 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [1, 1, 1]),
        },
      ],
    }
  })

  return (
    <ThemedView className='flex-1'>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor ? headerBackgroundColor[colorScheme] : '#000' },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>

        <ThemedView className='flex-1 rounded-t-[36px] p-4 gap-3'>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
  },
})