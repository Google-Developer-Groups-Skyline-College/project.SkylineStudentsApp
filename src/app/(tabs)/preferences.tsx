import { View, Text, Image } from 'react-native'

import { ParallaxScrollView } from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { LinkWrap } from '@/components/LinkWrap'
import { Emoji } from '@/components/Emoji'

import { UserConfig } from '@/constants/UserConfig'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Footer } from '@/components/Footer'
import { ScreenBase } from '@/components/ScreenBase'

export default function HomeScreen() {
  return (
    
    <ScreenBase
      title='Preferences'
      subtitle='subtitle.'
      backdrop={require('$/images/decoratives/centerpiece.webp')}
    >
      <View>
        <ThemedText className='text-center mt-2' type='title'>Hello, <Text className='text-red-400'>{UserConfig.displayName}!</Text></ThemedText>
        <ThemedText className='text-center'>Welcome to Your <ThemedText className='font-bold'>Profile</ThemedText>.</ThemedText>
      </View>

      <View className='flex gap-2'>
        <View className='flex flex-row gap-x-2'>
          <Emoji value='⚙️' />
          <ThemedText type='subtitle'>Settings</ThemedText>
        </View>



        <View className='flex flex-row flex-wrap justify-between items-center gap-2'>

          <LinkWrap href='/settings' lightColor='bg-[#C44949] border-[#C44949]/50' darkColor='bg-[#C44949]/50 border-[#C44949]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialIcons name='notifications' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialIcons name='notifications' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Notifications</Text>
          </LinkWrap>

          <LinkWrap href='/settings' lightColor='bg-[#80B93B] border-[#80B93B]/50' darkColor='bg-[#72B421]/50 border-[#72B421]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialCommunityIcons name='account-check' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialCommunityIcons name='account-check' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>App Preferences</Text>
          </LinkWrap>

          <LinkWrap href='/settings' lightColor='bg-[#399BC2] border-[#399BC2]/50' darkColor='bg-[#1A7CA3]/50 border-[#1A7CA3]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialCommunityIcons name='information' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialCommunityIcons name='information' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>My Interests</Text>
          </LinkWrap>

          <LinkWrap href='/settings' lightColor='bg-[#B077BB] border-[#B077BB]/50' darkColor='bg-[#AB5DBB]/50 border-[#AB5DBB]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialIcons name='punch-clock' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialIcons name='punch-clock' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>My Schedule</Text>
          </LinkWrap>

          <LinkWrap href='/settings' lightColor='bg-[#F89340] border-[#F89340]/50' darkColor='bg-[#F88526]/50 border-[#F88526]' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialCommunityIcons name='alien' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialCommunityIcons name='alien' size={32} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Experiments</Text>
          </LinkWrap>

        </View>

      </View>

      <Footer />

    </ScreenBase>
  )
}