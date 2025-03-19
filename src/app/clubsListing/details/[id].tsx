import React, { useState, useRef } from 'react'

import { Stack, useLocalSearchParams } from 'expo-router'
import { Dimensions, View, Text } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import ThemedLink from '@/components/ThemedLink'
import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import Image from '@/components/Image'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { useSharedValue } from 'react-native-reanimated'

import Carousel, {
    ICarouselInstance,
    Pagination,
} from 'react-native-reanimated-carousel'

import { TagDetails } from '@/constants/Tags'
import { Clubs } from '@/constants/Clubs'
import Footer from '@/components/Footer'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/clubs/photos/computer_science_club/sfhacks.jpg'),
    require('$/images/clubs/photos/computer_science_club/backdrop.png'),
    require('$/images/clubs/photos/engineering_robotics_club/backdrop.jpg'),
    require('$/images/clubs/photos/photography_club/backdrop.jpg')
]

export default function ClubDetails() {
    const { id }: { id: string } = useLocalSearchParams()
    const [ showJoinButton, setShowJoinButton ] = useState(false)

    const clubDetails = Clubs[id]

    setTimeout(() => {
        setShowJoinButton(true)
    }, 1000)

    const carouselRef = useRef<ICarouselInstance>(null)
    const carouselProgress = useSharedValue<number>(0)

    const onPressPagination = (index: number) => {
        carouselRef.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - carouselProgress.value,
            animated: true
        })
    }

    return (
        <>

            <ParallaxScrollView
                headerImage={
                    <Image
                        source={clubDetails.backdropImg}
                        className='w-full h-full object-cover'
                    />
                }
            >

                <View className='flex flex-col w-full gap-2'>
                    <View className='flex flex-col items-center'>
                        <Image source={clubDetails.logoImg} className='absolute w-[76px] h-[76px] rounded-2xl -translate-y-full' />
                        <ThemedText type='title' className='text-center'>{id}</ThemedText>
                    </View>

                    {/* top-section summary description, meeting, main contact */}
                    <View className='flex w-full gap-2'>
                        <ThemedView lightColor='bg-[#EEEEEEFF]' darkColor='bg-[#262626]' className='w-full p-2 rounded-xl'>
                            <ThemedText type='subtitle'>Description</ThemedText>
                            <ThemedText className='leading-snug'>{clubDetails.description}</ThemedText>
                        </ThemedView>

                        <View className='flex-row gap-2'>
                            <View className='bg-green-600 w-[49%] p-2 rounded-xl shadow shadow-green-500'>
                                <ThemedText type='subtitle' className='text-white' disableColorScheme>Meetings</ThemedText>
                                <Text className='text-white'>📍 {clubDetails.meetingLocation}</Text>
                                <Text className='text-white'>🕒 {clubDetails.meetingTime}</Text>
                            </View>

                            <ThemedLink href={(clubDetails.contact.includes('@') ? 'mailto:' + clubDetails.contact : clubDetails.contact)} className='bg-blue-500 w-[49%] p-2 rounded-xl '>
                                <ThemedText type='subtitle' className='text-white' disableColorScheme>Contact</ThemedText>
                                <Text className='text-blue-100 font-bold'>
                                    {clubDetails.contact}
                                </Text>
                            </ThemedLink>
                        </View>
                    </View>



                    {/* social buttons bar */}
                    <ThemedText type='subtitle'>Socials</ThemedText>
                    <View className='flex flex-row justify-center w-full gap-x-[6px]'>
                        { clubDetails.website &&
                            <ThemedLink href={clubDetails.website} className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-yellow-600 rounded-lg overflow-hidden'>
                                <MaterialCommunityIcons name='web' size={72} color='white' className='absolute opacity-20'/>
                                <Text className='text-white font-bold'>Official Website</Text>
                            </ThemedLink>
                        }
                        { clubDetails.instagram &&
                            <ThemedLink href={clubDetails.instagram} className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-purple-500 rounded-lg overflow-hidden'>
                                <MaterialCommunityIcons name='instagram' size={64} color='white' className='absolute opacity-20'/>
                                <Text className='text-white font-bold'>Instagram</Text>
                            </ThemedLink>
                        }
                        { clubDetails.discord &&
                            <ThemedLink href={clubDetails.discord} className='flex flex-row justify-center items-center w-[32%] h-8 bg-sky-500 rounded-lg overflow-hidden'>
                                <MaterialCommunityIcons name='discord' size={72} color='white' className='absolute opacity-20'/>
                                <Text className='text-white font-bold'>Discord</Text>
                            </ThemedLink>
                        }
                    </View>



                    {/* gallery section */}
                    <ThemedText type='subtitle'>Gallery</ThemedText>

                    {/* picture carousel and page selection bar */}
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
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxAdjacentItemScale: 0.7
                        }}

                        renderItem={({ index }) => (
                            <ThemedView className='flex w-full h-full justify-center'>
                                <Image source={PHOTOS[index]} className='w-full h-full rounded-lg' />
                            </ThemedView>
                        )}
                    />

                    <Pagination.Basic<{ color: string }>
                        progress={carouselProgress}
                        data={PHOTOS}
                        dotStyle={{
                            width: 25,
                            height: 6,
                            borderRadius: 4,
                            backgroundColor: "#404040",
                        }}
                        activeDotStyle={{
                            overflow: "hidden",
                            backgroundColor: "#AAAAAA",
                        }}
                        containerStyle={{
                            gap: 10,
                            marginBottom: 6,
                        }}
                        horizontal
                        onPress={onPressPagination}
                    />

                    {/* grid gallery */}
                    <View className='flex-1 flex-row flex-wrap w-full gap-1'>
                        {PHOTOS.map((image) =>
                            <Image source={image} className='w-[49%] h-32 rounded-lg' key={image.toString()} />
                        )}
                    </View>
                </View>

                <Footer />
            </ParallaxScrollView>

            {/* Bottom overlay Join button */}
            <ThemedView className={'absolute bottom-0 py-2 w-full transition-all duration-1000 ' + (showJoinButton ? 'px-2 opacity-100' : 'px-32 opacity-0 translate-y-full')}>
                <ThemedLink href={clubDetails.joinLink}>
                    <Text className='bg-green-500 text-white text-center font-bold text-2xl rounded-xl shadow shadow-green-500'>Press to Join</Text>
                </ThemedLink>
            </ThemedView>
        </>
    )
}