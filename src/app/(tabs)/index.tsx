import { View, Text, ScrollView, ImageSourcePropType} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { BlurView } from 'expo-blur'

import { HelloWave } from '@/components/HelloWave'
import ThemedLink from '@/components/ThemedLink'
import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { UserConfig } from '@/constants/UserConfig'
import Footer from '@/components/Footer'
import Image from '@/components/Image'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { useEffect, useState } from 'react'

const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=37.6275&longitude=-122.4711&current=temperature_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch&timezone=America%2FLos_Angeles&forecast_days=1'

function EventCard({ title, time, location, img }: { title: string, time: string, location: string, img: ImageSourcePropType }) {
  return (
    <View className='h-32 rounded-xl overflow-hidden'>
      <Image source={img} className='w-full h-full object-cover'/>

      <BlurView className='absolute w-full bottom-0 py-1' intensity={50} experimentalBlurMethod='none' tint='dark'>
        <Text className='px-2 text-lg text-white font-bold'>{title}</Text>
        <View className='flex flex-row justify-between px-2'>
          <Text className='text-[12.5px] text-white font-bold'>📍 {location}</Text>
          <Text className='text-[12.5px] text-green-100 font-bold'>{time} ⏰</Text>
        </View>
      </BlurView>
    </View>
  )
}

export default function HomeScreen() {

  const [ temperature, setTemperature ] = useState(0)
  const currentDate = new Date()

  const getForecast = async () => {
    try {
      const response = await fetch(FORECAST_API_URL)
      const json = await response.json()
      setTemperature(json.current.temperature_2m)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getForecast()
  }, [])

  return (
        <ScrollView showsVerticalScrollIndicator>
          <StatusBar translucent backgroundColor='transparent' />

          <View className='flex w-full h-32 justify-end'>
            <Image source={require('$/images/decoratives/centerpiece.webp')} className='absolute w-full h-full object-cover' />

            {/* overlays on image */}
            <LinearGradient
              className='absolute w-full h-full'
              colors={['#000000', '#FFFFFF00']} start={{ x: -0.05, y: 0.5 }} end={{ x: 1, y: 0.5 }}
            />

            <View className='p-4'>
              <View className='flex flex-row gap-x-2'>
                <Text className='text-white text-3xl shadow-black' style={{ textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 32 }}>
                  Hello, <Text className='font-bold text-red-400'>{UserConfig.displayName}!</Text>
                </Text>
                <HelloWave />
              </View>

              <Text className='text-white text-xl' style={{ textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 32 }}>It is <Text className='font-semibold'>{currentDate.toLocaleDateString('en', { weekday: 'long' })}, {currentDate.toLocaleDateString('en', { month: 'short', 'day': 'numeric' })}.</Text> {temperature}°F</Text>
            </View>
          </View>

          <ThemedView className='rounded-t-3xl p-4 gap-4'>

            <ThemedText type='subtitle' className='border-b-[1px] border-yellow-500 pb-2'>🎉 Today's Campus Events</ThemedText>
            <View className='gap-2'>
              <EventCard
                title='GDG on Campus Skyline College Meeting'
                time='1:10 PM - 2:00 PM'
                location='Building 7, Room 7-324'
                img={require('$/images/decoratives/clubs/gdgoc_meeting.webp')}
              />
              <EventCard
                title='STEM Clubs Boba Social'
                time='3:00 PM - 4:00 PM'
                location='STEM Center'
                img={require('$/images/decoratives/boba_social.webp')}
              />
            </View>

            <ThemedText type='subtitle' className='border-b-[1px] border-neutral-200 pb-2'>🚀 Your Campus Insights </ThemedText>

            <View className='flex flex-row flex-wrap justify-between items-center gap-2'>
              <ThemedLink href='/clubsListing' lightColor='bg-[#CA4343FF]' darkColor='bg-[#7f1d1d]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
                <MaterialIcons name='event' size={32} color='#FFF' />
                <Text className='font-bold text-lg text-white'>My Calender</Text>
              </ThemedLink>
              <ThemedLink href='/clubsListing' lightColor='bg-[#689B2AFF]' darkColor='bg-[#385515]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
                <MaterialCommunityIcons name='party-popper' size={32} color='#FFF' />
                <Text className='font-bold text-lg text-white'>Student Clubs</Text>
              </ThemedLink>
              <ThemedLink href='/clubsListing' lightColor='bg-[#1A7CA3FF]' darkColor='bg-[#00384E]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
                <MaterialIcons name='emoji-events' size={32} color='#FFF' />
                <Text className='font-bold text-lg text-white'>Opportunities</Text>
              </ThemedLink>
              <ThemedLink href='/clubsListing' lightColor='bg-[#CA8853FF]' darkColor='bg-[#673A15]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
                <FontAwesome6 name='boxes-stacked' size={32} color='#FFF' />
                <Text className='font-bold text-lg text-white'>Resources</Text>
              </ThemedLink>
            </View>

            {/* This padding and section is for development purposes */}

            <View className='h-56' />

            <ThemedText type='subtitle' className='border-b-[1px] border-orange-400 pb-2'>⚠️ Below are Experimental Pages</ThemedText>

            <ThemedLink href='../test1'>
              <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment 1 (Tinder Swipe News)</Text>
            </ThemedLink>

            <ThemedLink href='../test2'>
              <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment 2 (Events Page)</Text>
            </ThemedLink>

            <ThemedLink href='../test3'>
              <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment 3 (Mapbox)</Text>
            </ThemedLink>

            <ThemedLink href='../test4'>
              <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment 4</Text>
            </ThemedLink>

            {/* <ThemedLink href='../map'>
              <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment Map Page</Text>
            </ThemedLink> */}

            <Footer />

          </ThemedView>
        </ScrollView>
  );
} 
