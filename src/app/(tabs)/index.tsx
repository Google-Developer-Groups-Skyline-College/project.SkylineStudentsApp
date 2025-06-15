import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { HelloWave } from '@/components/HelloWave'
import { LinkWrap } from '@/components/LinkWrap'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Footer } from '@/components/Footer'
import { Image } from '@/components/Image'
import { Emoji } from '@/components/Emoji'

import { UserConfig } from '@/constants/UserConfig'

const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=37.6275&longitude=-122.4711&current=temperature_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch&timezone=America%2FLos_Angeles&forecast_days=1'

export default function HomeScreen() {
  const [ temperature, setTemperature ] = useState(0)
  const [ showExperiments, setShowExperiments ] = useState<string | null>()

  const currentDate = new Date()

  const backdropHeight = useSharedValue(120)
  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: backdropHeight.value
    }
  })

  useEffect(() => {
    async function updateForecast() {
      try {
        const response = await fetch(FORECAST_API_URL)
        const json = await response.json()
        setTemperature(json.current.temperature_2m)
      } catch (error) {
        console.error(error)
      }
    }

    async function getShowExperiments() {
      setShowExperiments(await AsyncStorage.getItem('show_experiments') || 'disabled')
    }

    updateForecast()
    getShowExperiments()

    setTimeout(() => {
      backdropHeight.value = withSpring(220)
    }, 900)
  })

  return (
    <ScrollView className='bg-black' showsVerticalScrollIndicator>

      <Animated.View style={backdropAnimatedStyle} className='flex w-full justify-end'>
        {/* <Image source={require('$/images/decoratives/centerpiece.webp')} contentPosition={'top'} priority={'high'} cachePolicy={'memory-disk'} className='absolute w-full h-full object-cover' /> */}
        <Image source={require('$/images/decoratives/centerpiece.webp')} className='absolute w-full h-full object-cover' />

        {/* overlays on image */}
        <LinearGradient
          className='absolute w-full h-full'
          colors={['#000000', '#FFFFFF00']} start={{ x: -0.05, y: 0.5 }} end={{ x: 1, y: 0.5 }}
        />

        {/* <Image source={require('$/images/skyline-college-logo.png')} width={100} height={40} contentFit='contain' className='absolute w-32 h-12 object-cover right-0 top-0 mt-8 mr-4'></Image> */}

        <View className='p-4'>
          <View className='flex flex-row py-1 gap-x-1'>
            <Text className='text-neutral-200 text-xs font-bold'>{temperature}°F</Text>
            <Image source={require('$/images/icons/clear-day.gif')} className='w-5 h-full' />
            {/* <Image source={require('$/images/icons/clear-day.gif')} width={20} height={'100%'} /> */}
          </View>

          <View className='flex flex-row gap-x-2'>
            <ThemedText
              className='text-white leading-tight'
              type='title'
              style={{ textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32 }}>
              Hello, <Text className='font-bold text-red-400'>{UserConfig.displayName}!</Text>
            </ThemedText>
            <HelloWave />
          </View>

          <View className='flex flex-row gap-x-2'>
            <Text
              className='text-white text-xl leading-tight'
              style={{ textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32 }}>
              It is{' '}
              <Text className='font-semibold'>
                {currentDate.toLocaleDateString('en', { weekday: 'long' })}, {currentDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}.
              </Text>
            </Text>
          </View>
        </View>

      </Animated.View>


















      <ThemedView className='rounded-t-3xl p-4 gap-2'>

        <View className='flex flex-row gap-x-2'>
          <Emoji value='🔔' />
          <ThemedText type='subtitle'>Notifications</ThemedText>
        </View>

        <View className='flex flex-col gap-2'>
          <LinkWrap href='/map' className='w-full h-24 rounded-xl overflow-hidden border-2' lightColor='border-[#EEE]/50' darkColor='border-[#EEE]'>
            <Image source={require('$/images/map-banner.webp')} className='w-full h-full' />

            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
              colors={['#002F42FF', '#2850D356']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
              <FontAwesome6 name='map' color='#FFFFFF38' size={128} className='absolute' />
            </LinearGradient>
            
            <View className='absolute bottom-1 px-2'>
              <View className='flex flex-row items-center gap-x-2'>
                <MaterialCommunityIcons name='clock-alert' color='white' size={16} />
                <Text
                  className='text-white text-xl leading-tight'
                  style={{fontFamily: 'Inter_700Bold', textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32}}
                >Physics Class - starts in 5 minutes</Text>
              </View>
              <Text
                className='text-neutral-300 text-sm leading-tight'
                style={{fontFamily: 'Inter_400Regular'}}
              >1:00 PM to 2:00 PM</Text>
            </View>
          </LinkWrap>
        </View>







        {/* <ThemedText type='subtitle' className='border-b-[1px] border-yellow-500 pb-2'>🎉 Today's Campus Events</ThemedText> */}
        <View className='flex flex-row gap-x-2'>
          <Emoji value='🎉' />
          <ThemedText type='subtitle'>Campus Insights</ThemedText>
        </View>

        <View className='flex flex-col gap-y-2'>

          <View className='flex flex-row justify-between'>

            {/* href='/explore/skyline-shines' */}
            <LinkWrap href='https://skylineshines.skylinecollege.edu' className='w-[49%] h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#CC4040]/50' darkColor='border-[#CC4040]'>
              <Image source={require('$/images/decoratives/ucb-trip-group.webp')} className='w-full h-full'></Image>

              <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
                colors={['#420000FF', '#DB3131FF']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
                <Image source={require('$/images/icons/shines.webp')} tintColor='#FFFFFF17' className='absolute w-32 h-32' />
              </LinearGradient>

              <View className='absolute bottom-1 px-2'>
                <View className='flex flex-row items-center gap-x-2'>
                  <Image source={require('$/images/icons/shines.webp')} tintColor='#FFF' className='w-4 h-4' />
                  <Text
                    className='text-white text-xl leading-tight'
                    style={{fontFamily: 'Inter_700Bold', textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32}}
                  >Skyline Shines</Text>
                </View>
                <Text
                  className='text-neutral-300 text-sm leading-tight'
                  style={{fontFamily: 'Inter_400Regular'}}
                >Your Weekly Newsletter</Text>
              </View>
            </LinkWrap>

            <LinkWrap href='/explore/transit-center' className='w-[49%] h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#DBAE31]/50' darkColor='border-[#DBAE31]'>
              <Image source={require('$/images/decoratives/transit-center/transit-center.webp')} className='w-full h-full'></Image>

              <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
                colors={['#423600FF', '#DBAE31AD']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
                <FontAwesome6 name='bus' color='#FFFFFF38' size={128} className='absolute' />
              </LinearGradient>

              <View className='absolute bottom-1 px-2'>
                <View className='flex flex-row items-center gap-x-2'>
                  <FontAwesome6 name='bus' color='white' size={16} />
                  <Text
                    className='text-white text-xl leading-tight'
                    style={{fontFamily: 'Inter_700Bold', textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32}}
                  >Transit Center</Text>
                </View>
                <Text
                  className='text-neutral-300 text-sm leading-tight'
                  style={{fontFamily: 'Inter_400Regular'}}
                >Public Transportation</Text>
              </View>
            </LinkWrap>

          </View>


          <LinkWrap href='https://www.theskylineview.com' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#CC4040]/50' darkColor='border-[#CC4040]'>
            <Image source={require('$/images/decoratives/smccd-services/the-skyline-view-banner.webp')} className='w-full h-full'></Image>

            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
              colors={['#420000FF', '#FF383833', '#FF383800']} start={{ x: 0.5, y: 0.7 }} end={{ x: 0.5, y: 0 }}>
            </LinearGradient>
            <View className='absolute bottom-1 px-2 w-full'>
              <Image source={require('$/images/decoratives/smccd-services/the-skyline-view-logo.webp')} contentFit='contain' className='w-full h-16' />
            </View>
          </LinkWrap>

          <LinkWrap href='/map' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#31C7DB]/50' darkColor='border-[#31C7DB]'>
            <Image source={require('$/images/map-banner.webp')} className='w-full h-full' />

            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
              colors={['#002F42FF', '#2850D356']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
              <FontAwesome6 name='map' color='#FFFFFF38' size={128} className='absolute' />
            </LinearGradient>
            
            <View className='absolute bottom-1 px-2'>
              <View className='flex flex-row items-center gap-x-2'>
                <FontAwesome6 name='map' color='white' size={16} />
                <Text
                  className='text-white text-xl leading-tight'
                  style={{fontFamily: 'Inter_700Bold', textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32}}
                >Interactive Map</Text>
              </View>
              <Text
                className='text-neutral-300 text-sm leading-tight'
                style={{fontFamily: 'Inter_400Regular'}}
              >View The Skyline College Campus</Text>
            </View>
          </LinkWrap>

          <LinkWrap
            href='https://phx-ban-apps.smccd.edu/StudentSelfService/ssb/studentCommonDashboard'
            className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#2F89FFFF]/50' darkColor='border-[#2F89FFFF]'>
            <Image source={require('$/images/decoratives/smccd-services/websmart-banner.webp')} className='absolute w-full h-full' />

            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
              colors={['#003881FF', '#6A8DFF6B', 'transparent']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
            </LinearGradient>

            <View className='absolute bottom-0 px-2 w-full'>
              <Image source={require('$/images/decoratives/smccd-services/websmart-logo.webp')} contentFit='contain' className='w-full h-24' />
            </View>
          </LinkWrap>

          <LinkWrap href='https://phx-ban-apps.smccd.edu/StudentRegistrationSsb/ssb/term/termSelection?mode=search' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#4BFCB5AD]/50' darkColor='border-[#4BFCB5AD]'>
            <Image source={require('$/images/decoratives/smccd-services/webschedule-banner.webp')} className='absolute w-full h-full' />

            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
              colors={['#024B2EFF', '#4BFCB5AD', 'transparent']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
            </LinearGradient>

            <View className='absolute bottom-0 px-2 w-full'>
              <Image source={require('$/images/decoratives/smccd-services/webschedule-logo.webp')} contentFit='contain' className='w-full h-24' />
            </View>
          </LinkWrap>

          <LinkWrap href='https://phx-degreeworks.smccd.edu/ResponsiveDashboard/plans' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#31C7DB]/50' darkColor='border-[#31C7DB]'>
            <Image source={require('$/images/decoratives/smccd-services/degreeworks-banner.webp')} className='absolute w-full h-full' />

            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
              colors={['#006885FF', '#67FAFFA1', 'transparent']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
            </LinearGradient>

            <View className='absolute bottom-0 px-2 w-full'>
              <Image source={require('$/images/decoratives/smccd-services/degreeworks-logo.webp')} contentFit='contain' className='w-full h-24' />
            </View>
          </LinkWrap>

          <LinkWrap href='https://smccd.my.site.com/SMCCDStudentAdvising/s/' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#1c90ce]/50' darkColor='border-[#1c90ce]'>
            <Image source={require('$/images/decoratives/smccd-services/student-success-link-banner.webp')} className='absolute w-full h-full' />

            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
              colors={['#012A41FF', '#1C90CEFF', 'transparent']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
            </LinearGradient>

            <View className='absolute bottom-2 px-2 w-full'>
              <Image source={require('$/images/decoratives/smccd-services/student-success-link-logo.webp')} contentFit='contain' className='w-full h-16' />
            </View>
          </LinkWrap>

          <LinkWrap href='https://smccd.my.site.com/SMCCDStudentAdvising/s/' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#1c90ce]/50' darkColor='border-[#1c90ce]'>
            <Image source={require('$/images/decoratives/smccd-services/accudemia-banner.webp')} className='absolute w-full h-full' />

            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
              colors={['#57C4FFFF', '#FFF', 'transparent']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0.4 }}>
            </LinearGradient>

            <View className='absolute bottom-2 px-2 w-full'>
              <Image source={require('$/images/decoratives/smccd-services/accudemia-logo.webp')} contentFit='contain' className='w-full h-24' />
            </View>
          </LinkWrap>
          
          <LinkWrap href='https://smccd.edu/alertme/' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#FF2929]/50' darkColor='border-[#FF2929]'>

            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
              colors={['#FF4141', '#FF0000']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }}>
              <MaterialCommunityIcons name='message-alert' color='#FFFFFF38' size={128} className='absolute' />
            </LinearGradient>

            <View className='flex flex-row justify-between items-center w-full h-full px-6'>
                <View>
                  <ThemedText type='title' className='text-white leading-none'>ALERTME</ThemedText>
                  <Text className='text-white leading-none'>District Public Safety Alert Service</Text>
                </View>
                <MaterialIcons name='smartphone' color='white' size={64} />
            </View>

          </LinkWrap>

          {/* <View className='w-full h-32 rounded-xl overflow-hidden'>
            <Image source={require('$/images/decoratives/boba_social.webp')} className='w-full h-full object-cover'/>

            <BlurView className='absolute w-full bottom-0 py-1' intensity={50} experimentalBlurMethod='none' tint='dark'>
              <Text className='px-2 text-lg text-white font-bold'>{'STEM Clubs Boba Social'}</Text>
              <View className='flex flex-row justify-between px-2'>
                <Text className='text-[12.5px] text-white font-bold'>📍 {'STEM Center'}</Text>
                <Text className='text-[12.5px] text-green-100 font-bold'>{'3:00 PM - 4:00 PM'} ⏰</Text>
              </View>
            </BlurView>
          </View> */}

        </View>











        <View className='flex flex-row gap-x-2'>
          <Emoji value='🧩' />
          <ThemedText type='subtitle'>Your Insight Tiles</ThemedText>
        </View>

        <View className='flex flex-row flex-wrap justify-between items-center gap-2'>

          <LinkWrap href='/clubs/list' lightColor='bg-[#80B93B] border-[#80B93B]/50' darkColor='bg-[#72B421]/50 border-[#72B421]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <FontAwesome6 name='people-group' size={128} color='#FFFFFF10' className='absolute' />
            <FontAwesome6 name='people-group' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Student Clubs</Text>
          </LinkWrap>
          <LinkWrap href='/clubs/list' lightColor='bg-[#399BC2] border-[#399BC2]/50' darkColor='bg-[#1A7CA3]/50 border-[#1A7CA3]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialIcons name='emoji-events' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialIcons name='emoji-events' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Opportunities</Text>
          </LinkWrap>
          <LinkWrap href='/clubs/list' lightColor='bg-[#F89340] border-[#F89340]/50' darkColor='bg-[#F88526]/50 border-[#F88526]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <FontAwesome6 name='boxes-stacked' size={128} color='#FFFFFF10' className='absolute' />
            <FontAwesome6 name='boxes-stacked' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Resources</Text>
          </LinkWrap>
          <LinkWrap href='/notifications' lightColor='bg-[#C44949] border-[#C44949]/50' darkColor='bg-[#C44949]/50 border-[#C44949]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <Ionicons name='notifications' size={128} color='#FFFFFF10' className='absolute' />
            <Ionicons name='notifications' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Notifications</Text>
          </LinkWrap>
          <LinkWrap href='/schedule/view' lightColor='bg-[#B077BB] border-[#B077BB]/50' darkColor='bg-[#AB5DBB]/50 border-[#AB5DBB]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialIcons name='punch-clock' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialIcons name='punch-clock' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>My Schedule</Text>
          </LinkWrap>
          <ThemedView lightColor='bg-[#707070] border-[#959595]/50' darkColor='bg-[#707070] border-[#959595]/50' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <Ionicons name='add-circle' size={128} color='#FFFFFF10' className='absolute' />
            <Ionicons name='add-circle' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Add Insight Tile</Text>
          </ThemedView>
        </View>

        {/* This padding and section is for development purposes */}

        {(showExperiments === 'enabled') &&

        <>
          <View className='h-56' />

          <View className='flex flex-row gap-x-2'>
            <Emoji value='⚠️' />
            <ThemedText type='subtitle'>The Experimental Pages</ThemedText>
          </View>

          <LinkWrap href='../(tests)/test1'>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment 1 (Tinder Swipe News)</Text>
          </LinkWrap>

          <LinkWrap href='../(tests)/test2'>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment 2 (Events Page)</Text>
          </LinkWrap>

          <LinkWrap href='../(tests)/test3'>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment 3 (Mapbox)</Text>
          </LinkWrap>

          <LinkWrap href='../(tests)/test4'>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment 4</Text>
          </LinkWrap>

          <LinkWrap href='../(tests)/loading'>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Loading Screen Test</Text>
          </LinkWrap>

          <LinkWrap href='*'>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Missing Page Test</Text>
          </LinkWrap>

          {/* <LinkWrap href='../map'>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>Experiment Map Page</Text>
          </LinkWrap> */}
        </>
        }

        <Footer />

      </ThemedView>
    </ScrollView>
  )
}
