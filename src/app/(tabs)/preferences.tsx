import { View, Text, Image } from 'react-native'

import { ParallaxScrollView } from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

import { UserConfig } from '@/constants/UserConfig'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Footer } from '@/components/Footer'

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#000', dark: '#000' }}
      headerImage={
        <Image
          source={require('$/images/decoratives/centerpiece.webp')}
          className='w-full h-[144%]'
        />
      }>

      <View>
        <ThemedText className='text-center mt-2' type='title'>Hello, <Text className='text-red-400'>{UserConfig.displayName}!</Text></ThemedText>
        <ThemedText className='text-center'>Welcome to Your <ThemedText className='font-bold'>Profile</ThemedText>.</ThemedText>
      </View>

      <ThemedText type='subtitle' className='border-b-[1px] border-neutral-200 pb-2'>⚙️ Your Dashboard</ThemedText>

      <View className='flex flex-row flex-wrap justify-between items-center gap-2'>
        <ThemedView darkColor='bg-[#00384E]' lightColor='bg-[#1A7CA3FF]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <MaterialIcons name="notifications" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>Notifications</Text>
        </ThemedView>
        <ThemedView darkColor='bg-[#385515]' lightColor='bg-[#689B2AFF]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <MaterialCommunityIcons name="account-check" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>Preferences</Text>
        </ThemedView>
        <ThemedView darkColor='bg-[#7f1d1d]' lightColor='bg-[#CA4343FF]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <MaterialCommunityIcons name="information" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>My Details</Text>
        </ThemedView>
        <ThemedView darkColor='bg-[#673A15]' lightColor='bg-[#CA8853FF]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <MaterialCommunityIcons name="alien" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>Experimental</Text>
        </ThemedView>
        <ThemedView darkColor='bg-[#44204BFF]' lightColor='bg-[#9C5EA8FF]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <MaterialIcons name="map" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>My Schedule</Text>
        </ThemedView>
      </View>

      <Footer />
      
    </ParallaxScrollView>
  )
}