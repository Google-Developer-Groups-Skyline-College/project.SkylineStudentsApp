import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { useEffect } from 'react'
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'

import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { useColorScheme } from '@/hooks/useColorScheme'
import '../../global.css'

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  
  const [ loaded ] = useFonts({
    SpaceMono: require('$/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return

  return ( 
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerTransparent: true, headerTitle: '', headerTintColor: 'white' }}>
          <Stack.Screen name="+not-found" />
        </Stack>

        {/* StatusBar must be after Stack components in order to work properly */}
        <StatusBar style='light' />
      </ThemeProvider>
  )
}
