import React, { useState, useRef, useEffect } from 'react'
import { Dimensions, View, Text } from 'react-native'

import { useSharedValue } from 'react-native-reanimated'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel'
import { useLocalSearchParams } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useQuery } from '@tanstack/react-query'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import ThemedLink from '@/components/ThemedLink'
import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import Footer from '@/components/Footer'
import Image from '@/components/Image'

import useSupabase from '@/hooks/useSupabase'

import { TagDetails } from '@/constants/Tags'
import LoadingScreen from '@/components/LoadingScreen'

const SUPABASE_CLUB_ASSETS_ENDPOINT = process.env.EXPO_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/clubs-assets'

const width = Dimensions.get('window').width

// interface ClubInfo {
//     id: string
//     name: string
//     description: string
//     contact_email: string
//     website_url: string
//     instagram_url: string
//     discord_url: string
//     meeting_location: string
//     meeting_time: string
//     aliases: string[]
//     tags: string[]
// }

export default function ClubDetails() {
    const { id }: { id: string } = useLocalSearchParams()

    const [ showJoinButton, setShowJoinButton ] = useState(false)
    const [ galleryPhotos, setGalleryPhotos ] = useState([require('$/images/placeholder.webp')])
    const [ clubInfo, setClubInfo ] = useState<any>()

    useEffect(() => {
        setTimeout(() => {
            setShowJoinButton(true)
        }, 1000)
    })

    const supabase = useSupabase()

    const clubQuery = useQuery({ queryKey: [`clubs/${id}/details`], queryFn: async () => {
        const { data } = await supabase
            .from('clubs')
            .select('*')
            .eq('id', id)
        return data
    } })

    useEffect(() => {
        if (clubQuery.isFetched && clubQuery.data) {
            // club query will return an array with the single club in it
            setClubInfo(clubQuery.data[0])
        }
    }, [clubQuery])

    const galleryQuery = useQuery({ queryKey: [`clubs/${id}/gallery`], queryFn: async () => {
        const { data } = await supabase
            .storage
            .from('clubs-assets')
            .list(`galleries/${id}`, {
                sortBy: { column: 'name', order: 'asc' },
            })
        return data
    } })

    useEffect(() => {
        if (galleryQuery.isFetched && galleryQuery.data) {
            setGalleryPhotos(galleryQuery.data)
        }
    }, [galleryQuery])

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

    if (!clubQuery.isFetched || !clubQuery.data || !clubInfo) {
        return <LoadingScreen />
    }

    return (
        <>
            <ParallaxScrollView
                headerImage={
                    <Image
                        source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${clubInfo.id}/backdrop.webp`}
                        className='w-full h-full object-cover'
                    />
                }
            >

                <View className='flex flex-col w-full gap-2'>
                    <View className='flex flex-col items-center'>
                        <Image source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/logos/${clubInfo.id}.webp`} className='absolute w-[76px] h-[76px] rounded-2xl -translate-y-full' />
                        <ThemedText type='title' className='text-center'>{clubInfo.name}</ThemedText>
                    </View>

                    {/* top-section summary description, meeting, main contact */}
                    <View className='flex w-full gap-2'>
                        <ThemedView lightColor='bg-[#EEEEEEFF]' darkColor='bg-[#262626]' className='w-full p-2 rounded-xl'>
                            <ThemedText type='subtitle'>Description</ThemedText>
                            <ThemedText className='leading-snug'>{clubInfo.description}</ThemedText>
                        </ThemedView>

                        <View className='flex-row gap-2'>
                            <View className='bg-green-600 w-[49%] p-2 rounded-xl shadow shadow-green-500'>
                                <ThemedText type='subtitle' className='text-white' disableColorScheme>Meetings</ThemedText>
                                <Text className='text-white'>📍 {clubInfo.meeting_location}</Text>
                                <Text className='text-white'>🕒 {clubInfo.meeting_time}</Text>
                            </View>

                            <ThemedLink href={(clubInfo.contact_email.includes('@') ? 'mailto:' + clubInfo.contact_email : clubInfo.contact_email)} className='bg-blue-500 w-[49%] p-2 rounded-xl '>
                                <ThemedText type='subtitle' className='text-white' disableColorScheme>Contact</ThemedText>
                                <Text className='text-blue-100 font-bold'>
                                    {clubInfo.contact_email}
                                </Text>
                            </ThemedLink>
                        </View>
                    </View>



                    {/* social buttons bar */}
                    <ThemedText type='subtitle'>Socials</ThemedText>
                    <View className='flex flex-row justify-center w-full gap-x-[6px]'>
                        { clubInfo.website_url &&
                            <ThemedLink href={clubInfo.website_url} className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-yellow-600 rounded-lg overflow-hidden'>
                                <MaterialCommunityIcons name='web' size={72} color='white' className='absolute opacity-20'/>
                                <Text className='text-white font-bold'>Club Website</Text>
                            </ThemedLink>
                        }
                        { clubInfo.instagram_url &&
                            <ThemedLink href={clubInfo.instagram_url} className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-purple-500 rounded-lg overflow-hidden'>
                                <MaterialCommunityIcons name='instagram' size={64} color='white' className='absolute opacity-20'/>
                                <Text className='text-white font-bold'>Instagram</Text>
                            </ThemedLink>
                        }
                        { clubInfo.discord_url &&
                            <ThemedLink href={clubInfo.discord_url} className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-sky-600 rounded-lg overflow-hidden'>
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
                        data={galleryPhotos}

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
                                <Image
                                    source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${galleryPhotos[index].name}`}
                                    className='w-full h-full rounded-lg'
                                />
                            </ThemedView>
                        )}
                    />

                    <Pagination.Basic<{ color: string }>
                        progress={carouselProgress}
                        data={galleryPhotos}
                        dotStyle={{
                            width: 25,
                            height: 6,
                            borderRadius: 4,
                            backgroundColor: '#404040',
                        }}
                        activeDotStyle={{
                            overflow: 'hidden',
                            backgroundColor: '#AAAAAA',
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
                        {galleryPhotos.map((photo, index) =>
                            <Image
                                source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${photo.name}`}
                                className='w-[49%] h-32 rounded-lg'
                                key={photo.name + index}
                            />
                        )}
                    </View>
                </View>

                <Footer />
            </ParallaxScrollView>

            {/* Bottom overlay Join button */}
            <ThemedView className={`absolute bottom-0 py-2 w-full transition-all duration-1000 ${(showJoinButton ? 'px-2 opacity-100' : 'px-32 opacity-0 translate-y-full')}`}>
                <ThemedLink href={clubInfo.website_url}>
                    <Text className='bg-green-500 text-white text-center font-bold text-2xl rounded-xl shadow shadow-green-500'>Press to Join</Text>
                </ThemedLink>
            </ThemedView>
        </>
    )
}