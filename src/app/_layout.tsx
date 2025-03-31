
import { useEffect } from 'react'
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'

import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { NotoSans_400Regular, NotoSans_600SemiBold, NotoSans_700Bold } from '@expo-google-fonts/noto-sans'
import { RobotoSlab_700Bold, RobotoSlab_800ExtraBold } from '@expo-google-fonts/roboto-slab'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useColorScheme } from '@/hooks/useColorScheme'

import '../../global.css'

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

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
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerTransparent: true, headerTitle: '', headerTintColor: 'white' }}>
          <Stack.Screen name='+not-found' />
        </Stack>

        {/* StatusBar must be after Stack components in order to work properly */}
        <StatusBar style='light' />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
