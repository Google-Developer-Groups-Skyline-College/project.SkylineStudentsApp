import { useRef } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Dimensions, View, Text } from 'react-native'

import ThemedText from '@/components/ThemedText'
import Image from '@/components/Image'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Entypo from '@expo/vector-icons/Entypo'

import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

import { PointOfInterest } from '../PointsOfInterest'
import ThemedLink from '@/components/ThemedLink'
import HorizontalRule from '@/components/HorizontalRule'

import dayjs from 'dayjs'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/decoratives/boba_social.webp'),
    require('$/images/decoratives/centerpiece.webp'),
    require('$/images/decoratives/club_rush.webp'),
]

{/* <View className='rounded-full p-2 border-red-900 border border-1' style={{ backgroundColor: '#FF4B4B28' }}>
    <Entypo className='mx-auto my-auto' name='heart' color='#FF4B4BFF' />
</View> */}

export default function PointOfInterestCard({ indoor_info, name, description, category, website, contact, hours, gallery }: PointOfInterest) {
    const carouselRef = useRef<ICarouselInstance>(null)
    const carouselProgress = useSharedValue<number>(0)

    const currentDay = dayjs().day()
    const currentHour = dayjs().hour()

    let isOpen = false
    if (hours)
        isOpen = (hours[currentDay][0] <= currentHour && (hours[currentDay][1] > currentHour))

    return (
        <View className='flex flex-col w-full px-4 gap-1'>

            <ThemedText className='font-bold text-2xl'>{name}</ThemedText>

            <HorizontalRule />

            <View>
                <View className='flex flex-row'>
                    <ThemedText className='italic'>{category}</ThemedText>
                    <ThemedText> • </ThemedText>
                    {
                        indoor_info ? <>
                            <Image source={require('$/images/icons/building.svg')} contentFit='contain' tintColor='#0ea5e9' width={26} height={'100%'} />
                            <Text className='text-sky-500'>{`Building ${indoor_info.building}${indoor_info.room ? ` - Room ${indoor_info.room}` : ''} (Floor ${indoor_info.floor})`}</Text>
                        </> : <>
                            <Image source={require('$/images/icons/tree.svg')} contentFit='contain' tintColor='#22c55e' width={26} height={'100%'} />
                            <Text className='text-green-500'>Outdoors</Text>
                        </>
                        
                    }
                </View>

                <ThemedText>{description}</ThemedText>
            </View>



            <View className='flex flex-col py-2 gap-2'>

                <View className='flex flex-row flex-wrap justify-end gap-2'>

                    {
                        hours &&
                        <View className='flex border-neutral-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                            <Entypo name='clock' size={72} color='gray' className='absolute opacity-15'/>
                            <View className='w-full px-2'>
                                <Text className='text-neutral-500 text-sm font-bold'>HOURS</Text>
                                <Text className={`font-bold text-2xl ${isOpen ? 'text-green-400' : 'text-red-300'}` }>
                                    {isOpen ? 'Open' : 'Closed'}
                                </Text>
                            </View>
                        </View>
                    }

                    <View className='flex border-green-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                        <MaterialCommunityIcons name='share' size={72} color='rgb(34,197,94)' className='absolute opacity-15'/>
                        <View className='w-full px-2'>
                            <Text className='text-neutral-500 text-sm font-bold'>SHARE</Text>
                            <ThemedText className='font-bold text-2xl'>Location</ThemedText>
                        </View>
                    </View>

                    {
                        website &&
                        <ThemedLink href={website} className='flex border-blue-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                            <MaterialCommunityIcons name='web' size={72} color='rgb(59,130,246)' className='absolute opacity-15'/>
                            <View className='w-full px-2'>
                                <Text className='text-neutral-500 text-sm font-bold'>VIEW</Text>
                                <ThemedText className='font-bold text-2xl'>Website</ThemedText>
                            </View>
                        </ThemedLink>
                    }

                    <View className='flex border-red-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                        <Entypo name='heart' size={72} color='rgb(239,68,68)' className='absolute opacity-15'/>
                        <View className='w-full px-2'>
                            <Text className='text-neutral-500 text-sm font-bold'>ADD TO</Text>
                            <ThemedText className='font-bold text-2xl'>Favorites</ThemedText>
                        </View>
                    </View>

                </View>

                {/* <ThemedText>Test</ThemedText> */}

            </View>

            <HorizontalRule />

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
                    <View className='flex w-full h-full justify-center'>
                        <Image source={PHOTOS[index]} className='w-full h-full rounded-lg' />
                    </View>
                )}
            />

            {/* <View className='flex flex-row'>
                    <View className='flex flex-row items-center justify-center rounded-2xl px-6 py-4 gap-2 border-red-900 border border-1' style={{ backgroundColor: '#FF4B4B28' }}>
                        <Entypo className='mx-auto my-auto' name='heart' color='#FF4B4BFF' />
                        <ThemedText>Favorite</ThemedText>
                    </View>
            </View> */}
        </View>
    )
}