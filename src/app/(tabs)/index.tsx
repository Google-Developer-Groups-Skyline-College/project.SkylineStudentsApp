import { View, Image, Text, Platform, ImageSourcePropType } from 'react-native'
import { Image as ExpoImage } from 'expo-image'
import { Link } from 'expo-router'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { HelloWave } from '@/components/HelloWave'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { UserConfig } from '@/constants/UserConfig'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

function EventCard({ title, time, location, img }: { title: string, time: string, location: string, img: ImageSourcePropType }) {
  return (
    <View className='h-32 overflow-hidden'>
      <ExpoImage source={img} contentFit='cover' style={{ width: '100%', height: '100%', borderRadius: 8 }} />

      {/* <Image
        source={img}
        className='absolute w-full h-full rounded-lg'
      /> */}
      <View className='absolute w-full bottom-0 bg-black/75 backdrop-blur-lg py-1 rounded-lg'>
        <Text className='px-2 text-lg text-white font-bold'>{title}</Text>
        <View className='flex flex-row justify-between px-2'>
          <Text className='text-[12.5px] text-white font-bold'>📍 {location}</Text>
          <Text className='text-[12.5px] text-green-100 font-bold'>{time} ⏰</Text>
        </View>
      </View>
    </View>
  )
}

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#000', dark: '#000' }}
      headerImage={
        <ExpoImage 
          source={require('$/images/backdrop.png')}
          contentFit='cover'
          contentPosition={{top: '10%'}}
          style={{ width: '100%', height: '114%' }}
        />
      }>

      <ThemedView className='flex flex-row justify-center items-center gap-2'>
        <View>
          <ThemedText className='mt-2' type='title'>Hello, <Text className='text-red-400'>{UserConfig.displayName}!</Text></ThemedText>
          <ThemedText className='text-center'>Let's Explore Your <ThemedText className='font-bold'>Campus</ThemedText>.</ThemedText>
        </View>
      </ThemedView>
      
      <ThemedText type='subtitle' className='border-b-[1px] border-yellow-500 pb-2'>🎉 Today's Events</ThemedText>
      <ThemedView className='gap-2'>
        <EventCard
          title='Computer Science Club Meeting'
          time='1:10 PM - 2:00 PM'
          location='Building 7, Room 7-324'
          img={require('$/images/cscMeeting.png')}
        />
        <EventCard
          title='STEM Clubs Boba Social'
          time='3:00 PM - 4:00 PM'
          location='STEM Center'
          img={require('$/images/bobaSocial.jpg')}
        />
      </ThemedView>

      <ThemedText type='subtitle' className='border-b-[1px] border-neutral-200 pb-2'>🔍 Your Campus Insights </ThemedText>

      <View className='flex flex-row flex-wrap justify-between items-center gap-2'>
        <ThemedView darkColor='#7f1d1d' lightColor='#CA4343FF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <MaterialIcons name="event" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>My Calender</Text>
        </ThemedView>
        <ThemedView darkColor='#385515' lightColor='#689B2AFF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <Link href='/clubsListing' className='z-10 absolute w-full h-full' /> 
          <MaterialCommunityIcons name="party-popper" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>Student Clubs</Text>
        </ThemedView>
        <ThemedView darkColor='#00384E' lightColor='#1A7CA3FF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <MaterialIcons name="emoji-events" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>Opportunities</Text>
        </ThemedView>
        <ThemedView darkColor='#673A15' lightColor='#CA8853FF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <FontAwesome6 name="boxes-stacked" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>Resources</Text>
        </ThemedView>
      </View>

      <ThemedText>Experiment</ThemedText>

      <Link href='../map'>
        <ThemedText>Go to Map Page</ThemedText>
      </Link>

      <Text>test</Text>

    </ParallaxScrollView>
  );
}
