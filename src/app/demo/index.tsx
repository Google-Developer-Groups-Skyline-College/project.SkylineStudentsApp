/*
Demo Page
*/

import { View, Text, ImageSourcePropType } from 'react-native'

import { BlurView } from 'expo-blur'
import { Link } from 'expo-router'

import { HelloWave } from '@/components/HelloWave'
import { ParallaxScrollView } from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image } from '@/components/Image'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'


function EventCard({ title, subtitle, img }: { title: string, subtitle: string, img: ImageSourcePropType }) {
  return (
    <View className='h-32 overflow-hidden rounded-xl'>
      <Image source={img} className='w-full h-full object-cover'/>

      <BlurView className='absolute w-full bottom-0 py-1' intensity={50} experimentalBlurMethod='dimezisBlurView' tint='dark'>
        <Text className='px-2 text-lg text-white font-bold'>{title}</Text>
        <View className='flex flex-row justify-between px-2'>
          <Text className='text-[12.5px] text-white font-bold'>{subtitle}</Text>
        </View>
      </BlurView>
    </View>
  )
}

export default function Demo() {

    return (
        <View className='w-full h-full'>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#000', dark: '#000' }}
                headerImage={
                    <Image
                        source={require('$/images/image.missing.webp')}
                        contentFit='cover'
                        contentPosition={{bottom: '10%'}}
                        style={{ width: '100%', height: '110%' }}
                    />
                }
            >
                {/* title bar*/}
                <ThemedText type='subtitle' className='border-b-[1px] text-center border-neutral-200 pb-2'>
                    {'Demo Page'}
                </ThemedText>

                {/* Body Text */}
                <ThemedText type='subtitle' className='border-b-[1px] border-black-400 pb-2'>Some body text</ThemedText>


                {/* Big Button */}
                <View className='flex flex-row flex-wrap justify-between items-center gap-2'>

                    <ThemedView darkColor='#385515' lightColor='#689B2AFF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
                    <Link href='/(tabs)' className='z-10 absolute w-full h-full' /> 
                    <MaterialCommunityIcons name="party-popper" size={32} color="#FFF" />
                    <Text className='font-bold text-lg text-white'>Big Button</Text>
                    </ThemedView>

                </View>
                
                {/* Smaller, Bitesized Button */}

                <Link href='../(tabs)' asChild>
                    <Text className='font-bold text-black-400 border border-black-400 p-2'>Another button but smaller</Text>
                </Link>


                {/* Event card */}
                <View className='gap-2'>

                    <EventCard
                    title='Title'
                    subtitle='Subtitle'
                    img={require('$/images/image.missing.webp')}
                    />

                </View>

                {/* HelloWave */}
                <HelloWave />


            </ParallaxScrollView>

            {/* Footer as described in components/Footer.tsx */}
            {/* <Footer /> */}
        </View>
    )
}