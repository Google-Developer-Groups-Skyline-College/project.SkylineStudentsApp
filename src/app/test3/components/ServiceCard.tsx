import { useRef } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Dimensions, View, Text, PixelRatio } from 'react-native'

import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import Image from '@/components/Image'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Entypo from '@expo/vector-icons/Entypo'

import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/clubs/photos/computer_science_club/sfhacks.jpg'),
    require('$/images/clubs/photos/computer_science_club/backdrop.png'),
    require('$/images/clubs/photos/engineering_robotics_club/backdrop.jpg'),
    require('$/images/clubs/photos/photography_club/backdrop.jpg')
]

interface PointCardProps {
    name: ''
    description: ''
    location: ''
}

{/* <View className='rounded-full p-2 border-red-900 border border-1' style={{ backgroundColor: '#FF4B4B28' }}>
    <Entypo className='mx-auto my-auto' name='heart' color='#FF4B4BFF' />
</View> */}

export default function PointCard() {
    const carouselRef = useRef<ICarouselInstance>(null)
    const carouselProgress = useSharedValue<number>(0)

    return (
        <ThemedView className='flex flex-col w-full h-full px-4 gap-1'>

            <ThemedText className='font-bold text-2xl'>The STEM Center</ThemedText>

            <View className='w-full bg-neutral-500' style={{ height: 1 / PixelRatio.get() }} />

            <View>
                <View className='flex flex-row'>
                    <ThemedText className='italic'>Student Services</ThemedText>
                    <ThemedText> • </ThemedText>
                    <Image source={require('$/images/icons/building.svg')} contentFit='contain' tintColor='#0ea5e9' width={26} height={'100%'} />
                    <Text className='text-sky-500'>Building 7 - Room 326</Text>
                </View>

                <ThemedText>The Skyline College STEM Center brings together academic and student support services for students taking science, technology, engineering and math courses.</ThemedText>
            </View>


            <View className='flex flex-col py-2 gap-2'>

                <View className='flex flex-row flex-wrap justify-between'>

                    {/* <View className='flex border-neutral-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                        <Entypo name='clock' size={72} color='gray' className='absolute opacity-15'/>
                        <View className='w-full px-2'>
                            <Text className='text-neutral-500 text-sm font-bold'>HOURS</Text>
                            <ThemedText className='font-bold text-2xl'>Closed</ThemedText>
                        </View>
                    </View> */}

                    <View className='flex border-green-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                        <MaterialCommunityIcons name='share' size={72} color='rgb(34,197,94)' className='absolute opacity-15'/>
                        <View className='w-full px-2'>
                            <Text className='text-neutral-500 text-sm font-bold'>SHARE</Text>
                            <ThemedText className='font-bold text-2xl'>Location</ThemedText>
                        </View>
                    </View>

                    <View className='flex border-blue-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                        <MaterialCommunityIcons name='web' size={72} color='rgb(59,130,246)' className='absolute opacity-15'/>
                        <View className='w-full px-2'>
                            <Text className='text-neutral-500 text-sm font-bold'>VIEW</Text>
                            <ThemedText className='font-bold text-2xl'>Website</ThemedText>
                        </View>
                    </View>

                    <View className='flex border-red-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                        <Entypo name='heart' size={72} color='rgb(239,68,68)' className='absolute opacity-15'/>
                        <View className='w-full px-2'>
                            <Text className='text-neutral-500 text-sm font-bold'>ADD TO</Text>
                            <ThemedText className='font-bold text-2xl'>Favorites</ThemedText>
                        </View>
                    </View>
                </View>

                <ThemedText>Test</ThemedText>

            </View>

            <View className='w-full bg-neutral-500' style={{ height: 1 / PixelRatio.get() }} />

            <Carousel
                width={width - 32}
                height={width/2}
                data={PHOTOS}

                loop
                autoPlay
                autoPlayInterval={4000}
                onProgressChange={carouselProgress}
                ref={carouselRef}

                mode='parallax'

                renderItem={({ index }) => (
                    <ThemedView className='flex w-full h-full justify-center'>
                        <Image source={PHOTOS[index]} className='w-full h-full rounded-lg' />
                    </ThemedView>
                )}
            />

            {/* <View className='flex flex-row'>
                     <View className='flex flex-row items-center justify-center rounded-2xl px-6 py-4 gap-2 border-red-900 border border-1' style={{ backgroundColor: '#FF4B4B28' }}>
                        <Entypo className='mx-auto my-auto' name='heart' color='#FF4B4BFF' />
                        <ThemedText>Favorite</ThemedText>
                    </View>
            </View> */}
        </ThemedView>
    )
}