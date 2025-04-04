import React from 'react'
import { Tabs } from 'expo-router'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'

import { useColorScheme } from '@/hooks/useColorScheme'

import { Colors } from '@/constants/Colors'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveBackgroundColor: '#50505020',
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
    </Tabs>
  )
}
