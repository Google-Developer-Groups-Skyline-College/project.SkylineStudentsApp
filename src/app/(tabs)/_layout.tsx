import React from 'react'
import { Tabs } from 'expo-router'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import ThemedView from '@/components/ThemedView'

import { useColorScheme } from '@/hooks/useColorScheme'

import { Colors } from '@/constants/Colors'

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#00000000',
          borderTopWidth: 0
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarBackground: () => <ThemedView className='w-full h-full rounded-t-3xl shadow-lg shadow-black' />,
        headerShown: false
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'My Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'planet' : 'planet-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='preferences'
        options={{
          title: 'Preferences',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name='map'
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
