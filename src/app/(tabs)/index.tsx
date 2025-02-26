import { View, Text, ScrollView, ImageSourcePropType } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { BlurView } from 'expo-blur'
import { Link } from 'expo-router'

import { HelloWave } from '@/components/HelloWave'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { UserConfig } from '@/constants/UserConfig'
import Image from '@/components/Image'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'

const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=37.6275&longitude=-122.4711&current=temperature_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch&timezone=America%2FLos_Angeles&forecast_days=1'

function EventCard({ title, time, location, img }: { title: string, time: string, location: string, img: ImageSourcePropType }) {
  return (
    <View className='h-32 overflow-hidden rounded-xl'>
      <Image source={img} className='w-full h-full object-cover'/>

      <BlurView className='absolute w-full bottom-0 py-1' intensity={50} experimentalBlurMethod='dimezisBlurView' tint='dark'>
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
      const response = await fetch(FORECAST_API_URL);
      const json = await response.json();
      setTemperature(json.current.temperature_2m);
    } catch (error) {
      console.error(error);
    } finally {

    }
  };

  useEffect(() => {
    getForecast();
  }, []);

  return (

      <ThemedView>
        <ScrollView showsVerticalScrollIndicator stickyHeaderIndices={[0]}>

        <View className='flex w-full h-32 justify-end'>
          <Image source={require('$/images/backdrop.png')} className='absolute w-full h-full object-cover' />

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

            <Text className='text-white font-semibold text-xl' style={{ textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 32 }}>It is {currentDate.toLocaleDateString('en', { weekday: 'long' })}, {currentDate.toLocaleDateString('en', { month: 'short', 'day': 'numeric' })}. {temperature}°F</Text>
          </View>
        </View>

        <View className='p-4 gap-4'>

          <ThemedText type='subtitle' className='border-b-[1px] border-yellow-500 pb-2'>🎉 Today's Campus Events</ThemedText>
          <View className='gap-2'>
            <EventCard
              title='GDG on Campus Skyline College Meeting'
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
          </View>

          <ThemedText type='subtitle' className='border-b-[1px] border-neutral-200 pb-2'>🚀 Your Campus Insights </ThemedText>

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

          {/* This padding and section is for development purposes */}

          <View className='h-56' />

          <ThemedText type='subtitle' className='border-b-[1px] border-orange-400 pb-2'>⚠️ Below are Experimental Pages</ThemedText>

          <Link href='../map' asChild>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Map Page</Text>
          </Link>

          <Link href='../map' asChild>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Map Page</Text>
          </Link>

          <Footer />

        </View>

        </ScrollView>
      </ThemedView>
  );
}
