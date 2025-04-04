
import { useEffect } from 'react'
import { Dimensions, ImageRequireSource } from 'react-native'
import { configureReanimatedLogger, ReanimatedLogLevel, Easing } from 'react-native-reanimated'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { ModalProvider, createModalStack } from 'react-native-modalfy'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { Asset } from 'expo-asset'
import { Image } from 'expo-image'

import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { NotoSans_400Regular, NotoSans_600SemiBold, NotoSans_700Bold } from '@expo-google-fonts/noto-sans'
import { RobotoSlab_700Bold, RobotoSlab_800ExtraBold } from '@expo-google-fonts/roboto-slab'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useColorScheme } from '@/hooks/useColorScheme'

import { MediaModal } from '@/components/modals/MediaModal'

import '../../global.css'

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const stack = createModalStack({ MediaModal }, {
  backdropOpacity: 0.6,
})

const queryClient = new QueryClient()

function preloadImages(images: (string | ImageRequireSource)[]) {
  return images.map((image: string | ImageRequireSource) => {
    if (typeof image === 'string') {
      return Image.prefetch(image, 'memory-disk')
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  
  const [ loaded ] = useFonts({
    // SpaceMono: require('$/fonts/SpaceMono-Regular.ttf'),
    Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold,
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold,
    NotoSans_400Regular, NotoSans_600SemiBold, NotoSans_700Bold,
    RobotoSlab_700Bold, RobotoSlab_800ExtraBold
  })



  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      const imageAssets = preloadImages([
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        require('$/images/loading-ripple.webp'),
        require('$/images/mono-icon.png')
      ])

      try {
        await Promise.all([...imageAssets])
      } catch {

      }
    }

    if (loaded) {
      SplashScreen.hideAsync()
    }

    loadResourcesAndDataAsync()
  }, [loaded])

  if (!loaded) return

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ModalProvider stack={stack}>
            <SafeAreaProvider>

              <Stack screenOptions={{ headerTransparent: true, headerTitle: '', headerTintColor: 'white' }}>
                <Stack.Screen name='+not-found' />
              </Stack>

              {/* StatusBar must be after Stack components in order to work properly */}
              <StatusBar style='light' />

            </SafeAreaProvider>
          </ModalProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
