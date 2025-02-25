import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'

import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import '../../global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ loaded ] = useFonts({
    SpaceMono: require('$/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // , headerBackground: () => <View className='bg-neutral-900/20 w-full h-full' />

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style='light'/>
          <Stack screenOptions={{ headerTransparent: true }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="clubsListing/index" options={{ title: 'Clubs Listing' }} />
            {/* <Stack.Screen name="clubsListing/details/[clubName].tsx" options={{ title: 'Clubs Listing' }} /> */}
            <Stack.Screen name="map/index" options={{ title: 'Map' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
      </ThemeProvider>
  );
}
