import { Text, View, Dimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import { LinearGradient } from 'expo-linear-gradient'

import dayjs, { extend as extendDayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { ScreenBase } from '@/components/ScreenBase'
import { Footer } from '@/components/Footer'
import { Image } from '@/components/Image'
import { Emoji } from '@/components/Emoji'
import { Card } from '@/components/Card'

import { Schedule } from '@/constants/Schedule'

const screenWidth = Dimensions.get('screen').width

extendDayjs(customParseFormat)

function CourseCard({course, label, startTime, endTime}) {
  return (
    <Card className='flex px-2 py-1 rounded-2xl'>
      <ThemedText className='font-bold'>{course}{label && ` - ${label}`}</ThemedText>
      <View className='flex flex-row justify-between items-center'>
        <ThemedText>{startTime} to {endTime}</ThemedText>
        <ThemedText className='italic'>Room 1-234</ThemedText>
      </View>
    </Card>
  )
}

const DAY_ID_TO_NAME = {
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday'
}

export default function ScheduleView() {
    const currentDate = new Date()

    const currentDay = dayjs().day()

    return (
      <ScreenBase
        title='My Schedule'
        subtitle={`It is ${currentDate.toLocaleDateString('en', { weekday: 'long' })}, ${currentDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}.`}
        backdrop={require('$/images/decoratives/centerpiece.webp')}
      >

          <View className='flex gap-2'>

            <View className='flex flex-row justify-center items-center h-14'>
              {/* account for weekend classes */}
              {Object.keys(Schedule).map((weekday, index) => {
                return (
                  <Card className={`flex justify-center items-center 
                    ${(index === 0) && 'rounded-l-2xl'}
                    ${(index === Object.keys(Schedule).length - 1 && 'rounded-r-2xl')}
                    ${(index === currentDay - 1 ? 'w-[22%] h-12 rounded-lg' : 'w-[18%] h-10')}
                  `} key={index}>
                    <ThemedText className={`text-sm ${(DAY_ID_TO_NAME[currentDay] === weekday && 'font-bold text-yellow-400')}`}>{weekday}</ThemedText>
                  </Card>
                )
              })}
            </View>

            <ThemedView className='w-full rounded-xl overflow-hidden border-2' lightColor='border-[#EEE]/50' darkColor='border-[#EEE]'>
              {/* <Image source={require('$/images/map-banner.webp')} className='w-full h-full' /> */}

              <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75' colors={['#222', '#AAA']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
                {/* <FontAwesome6 name='map' color='#FFFFFF38' size={128} className='absolute' /> */}
              </LinearGradient>

              <View className='p-2'>
                <Text
                  className='text-neutral-300 text-xs leading-tight'
                  style={{fontFamily: 'Inter_400Regular'}}
                >UP NEXT</Text>
                <View className='flex flex-row items-center gap-x-2'>
                  {/* <MaterialCommunityIcons name='clock-alert' color='white' size={16} /> */}
                  <Text
                    className='text-white text-xl leading-tight'
                    style={{fontFamily: 'Inter_700Bold', textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32}}
                  >Intro to Databases</Text>
                </View>
                <Text
                  className='text-neutral-300 text-sm leading-tight'
                  style={{fontFamily: 'Inter_400Regular'}}
                >1:00 PM to 2:00 PM - starts in 5 minutes</Text>
              </View>
            </ThemedView>

            <View>
              {Object.keys(Schedule).map((weekday) => {
                if (Schedule[weekday].length > 0) {
                  return (
                    <View key={weekday}>
                      <ThemedText type='subtitle' className={DAY_ID_TO_NAME[currentDay] === weekday ? 'text-yellow-500' : ''}>{weekday} {DAY_ID_TO_NAME[currentDay] === weekday && '— Today'}</ThemedText>
                      <View className='flex gap-2 py-1 w-full'>
                        {Schedule[weekday].map((course) => {
                          return <CourseCard
                            key={course.toString()}
                            course={course.course}
                            label={course.label}
                            startTime={dayjs(course.startTime, 'hh:mm').format('hh:mm A')}
                            endTime={dayjs(course.endTime, 'hh:mm').format('hh:mm A')}
                          />
                        })}
                      </View>
                    </View>
                  )
                }
              })}
            </View>

            <View className='flex flex-row gap-x-2'>
              <Emoji value='📤' />
              <ThemedText type='subtitle'>Share Schedule</ThemedText>
            </View>

            <View className='flex flex-col justify-center items-center gap-4'>
              <QRCode
                size={screenWidth / 1.5}
                value='5gEAAPILQ0lTIDEzMCwxMjoxNSwxMzo1MC5BQkMgMTIUAGIwLDU6NTUTAEY1MCwxJgABOgAUNiYAEDY5AAETABI4EwACTQAhNSsUAAthAAEUABAyWwATMycABmEAAYgAFTROAAVhAAKbAAE6AAViABAyYQABrgAPYQAEANYAAjsAEjU7AADDAAFiAAdPADU2MCwnAAP9AAViAAAnAA/EAFABnAAPxAAEDyUBLFAsMjo1NQ=='
                backgroundColor='transparent'
                color='#999'
              />
              <ThemedText className='text-center'>Sharing your Schedule only provides course numbers and their start/end times.</ThemedText>
            </View>

            <Footer />

          </View>

        </ScreenBase>
    )
}