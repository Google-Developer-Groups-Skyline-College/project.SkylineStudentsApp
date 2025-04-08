import type { PropsWithChildren, ReactElement } from 'react'
import { useColorScheme } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { ThemedView } from '@/components/ThemedView'

type Props = PropsWithChildren<{
  headerImage: ReactElement
  headerBackgroundColor?: { dark: string, light: string }
  headerHeight?: number
}>

export function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  headerHeight = 180,
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
            [-headerHeight, 0, headerHeight],
            [(-headerHeight / 2), 0, headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], [1, 1, 1]),
        },
      ],
    }
  })

  return (
    <ThemedView className='flex-1'>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            { height: headerHeight },
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