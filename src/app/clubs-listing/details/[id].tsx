import React, { useState, useRef, useEffect } from 'react'
import { Dimensions, View, Pressable, TouchableHighlight } from 'react-native'

import { useSharedValue } from 'react-native-reanimated'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel'
import { useLocalSearchParams } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useQuery } from '@tanstack/react-query'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import LoadingScreen from '@/components/LoadingScreen'
import LinkWrap from '@/components/LinkWrap'
import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import Footer from '@/components/Footer'
import Image from '@/components/Image'

import useSupabase from '@/hooks/useSupabase'

import Environment from '@/constants/Environment'
import VideoCard from '@/components/VideoCard'
import MediaModal, { MediaModelContent } from '@/components/MediaModal'
import { QueryData } from '@supabase/supabase-js'

import { TagDetails } from '@/constants/Tags'

const SUPABASE_CLUB_ASSETS_ENDPOINT = Environment.SUPABASE_URL + '/storage/v1/object/public/clubs-assets'

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
    // SearchParams:
    //  id: this is brought over by the clubListing page when you click a club
    //       button. used to know which club id details to query from db.
    const { id }: { id: string } = useLocalSearchParams()

    const supabase = useSupabase()





    // clubQuery: fetches all club details
    const clubQueryFunction = supabase
        .from('clubs')
        .select('*')
        .eq('id', id)
        
    const clubQuery = useQuery({ queryKey: [`clubs/${id}/details`], queryFn: async () => {
        const { data } = await clubQueryFunction
        return data
    } })

    const [ queriedClubs, setQueriedClubs ] = useState<QueryData<typeof clubQueryFunction>>()

    useEffect(() => {
        if (clubQuery.isFetched && clubQuery.data) {
            // club query will return an array with the single club in it
            setQueriedClubs(clubQuery.data)
        }
    }, [clubQuery])



    // galleryQuery: fetches club-specific images and videos
    const galleryQueryFunction = supabase
        .storage
        .from('clubs-assets')
        .list(`galleries/${id}`, {
            sortBy: { column: 'name', order: 'asc' },
        })
    
    const galleryQuery = useQuery({ queryKey: [`clubs/${id}/gallery`], queryFn: async () => {
        const { data } = await galleryQueryFunction
        return data
    } })

    const [ queriedGalleryItems, setQueriedGalleryItems ] = useState<QueryData<typeof galleryQueryFunction>>()

    useEffect(() => {
        if (galleryQuery.isFetched && galleryQuery.data) {
            setQueriedGalleryItems(galleryQuery.data)
        }
    }, [galleryQuery])





    const [ animateJoinButton, setAnimateJoinButton ] = useState(false)
    const [ modalContent, setModalContent ] = useState<MediaModelContent>()

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

    useEffect(() => {
        setTimeout(() => {
            setAnimateJoinButton(true)
        }, 1000)
    })

    if (
        (!clubQuery.isFetched || !clubQuery.data || !queriedClubs) ||
        (!galleryQuery.isFetched || !galleryQuery.data || !queriedGalleryItems)
    ) {
        return <LoadingScreen />
    }

    const clubInfo = queriedClubs[0]
    const galleryItems = queriedGalleryItems

    return (
        <>
            <MediaModal animatePin maxZoom={3} content={modalContent} />
            <ParallaxScrollView
                headerImage={
                    <Image
                        source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${clubInfo.id}/z_backdrop.webp`}
                        className='w-full h-[105%] object-cover'
                    />
                }
            >

                <View className='flex flex-col w-full gap-2'>
                    <View className='flex flex-col items-center'>
                        <Image source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/logos/${clubInfo.id}.webp`} className='absolute w-[76px] h-[76px] rounded-2xl -translate-y-full' />
                        <ThemedText type='title' className='text-center' numberOfLines={2} ellipsizeMode='middle'>{clubInfo.name}</ThemedText>
                    </View>

                    {/* top-section summary description, meeting, main contact */}
                    <View className='flex w-full gap-2'>
                        <ThemedView lightColor='bg-[#EEEEEEFF]' darkColor='bg-[#262626]' className='w-full p-2 rounded-xl'>
                            <ThemedText className='text-[18px] font-bold'>Description</ThemedText>
                            <ThemedText className='leading-5'>{clubInfo.description}</ThemedText>
                        </ThemedView>

                        <View className='flex-row gap-2'>
                            <View className='bg-green-600 w-[49%] p-2 rounded-xl shadow shadow-green-500'>
                                <ThemedText className='text-white text-[18px] font-bold'>Meetings</ThemedText>
                                <ThemedText className='text-white text-sm'>📍 {clubInfo.meeting_location}</ThemedText>
                                <ThemedText className='text-white text-sm'>🕒 {clubInfo.meeting_time}</ThemedText>
                            </View>

                            { clubInfo.contact_email &&
                            <LinkWrap href={(clubInfo.contact_email.includes('@') ? 'mailto:' + clubInfo.contact_email : clubInfo.contact_email)} className='bg-blue-500 w-[49%] p-2 rounded-xl'>
                                <ThemedText className='text-white text-[18px] font-bold'>Contact</ThemedText>
                                <ThemedText textBreakStrategy='balanced' className='text-blue-100 text-sm break-all font-bold'>
                                    {clubInfo.contact_email}
                                </ThemedText>
                            </LinkWrap>
                            }
                            
                        </View>
                    </View>



                    {/* social buttons bar */}
                    <ThemedText type='subtitle'>Socials</ThemedText>
                    <View className='flex flex-row justify-center w-full gap-x-[6px]'>
                        { clubInfo.website_url &&
                        <LinkWrap href={clubInfo.website_url} className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-yellow-600 rounded-lg overflow-hidden'>
                            <MaterialCommunityIcons name='web' size={72} color='white' className='absolute opacity-20'/>
                            <ThemedText className='text-white font-bold'>Club Website</ThemedText>
                        </LinkWrap>
                        }
                        { clubInfo.instagram_url &&
                        <LinkWrap href={clubInfo.instagram_url} className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-purple-500 rounded-lg overflow-hidden'>
                            <MaterialCommunityIcons name='instagram' size={64} color='white' className='absolute opacity-20'/>
                            <ThemedText className='text-white font-bold'>Instagram</ThemedText>
                        </LinkWrap>
                        }
                        { clubInfo.discord_url &&
                        <LinkWrap href={clubInfo.discord_url} className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-sky-600 rounded-lg overflow-hidden'>
                            <MaterialCommunityIcons name='discord' size={72} color='white' className='absolute opacity-20'/>
                            <ThemedText className='text-white font-bold'>Discord</ThemedText>
                        </LinkWrap>
                        }
                    </View>



                    {/* gallery section */}
                    <ThemedText type='subtitle'>Gallery</ThemedText>

                    {/* picture carousel and page selection bar */}
                    <Carousel
                        width={width - 32}
                        height={width/2}
                        data={galleryItems}

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

                        renderItem={({ index }) => {
                            const item = galleryItems[index]
                            if (item.metadata.mimetype === 'image/webp') {
                                return <TouchableHighlight onPress={() => {
                                    setModalContent({
                                        source: `${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${item.name}`,
                                        mediaType: 'image'
                                    })
                                }}>
                                    <Image
                                        source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${item.name}`}
                                        className='w-full h-full rounded-lg'
                                    />
                                </TouchableHighlight>
                            }
                            if (item.metadata.mimetype === 'video/mp4') {
                                return <TouchableHighlight onPress={() => {
                                    setModalContent({ 
                                        source: `${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${item.name}`,
                                        mediaType: 'video'
                                    })
                                }}>
                                    <VideoCard
                                        source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${item.name}`}
                                        className='w-full h-full rounded-lg'
                                    />
                                </TouchableHighlight>
                            }
                            return <></>
                        }}
                    />

                    <Pagination.Basic
                        progress={carouselProgress}
                        data={galleryItems}
                        dotStyle={{
                            width: 22,
                            height: 6,
                            borderRadius: 12,
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

                        {galleryItems.map((item, index) => {
                            if (item.metadata.mimetype === 'image/webp') {
                                // console.log(item)
                                console.log(`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${item.name}`)
                                return <TouchableHighlight onPress={() => {
                                        setModalContent({
                                            source: `${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${item.name}`,
                                            mediaType: 'image'
                                        })
                                    }}
                                    className='w-[49%] h-32 rounded-lg'
                                    key={item.name + index}
                                >
                                    <Image
                                        source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${item.name}`}
                                        className='w-full h-full rounded-lg'
                                    />
                                </TouchableHighlight>
                            }
                            if (item.metadata.mimetype === 'video/mp4') {
                                return <Pressable onPress={() => {
                                        setModalContent({
                                            source: `${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${item.name}`,
                                            mediaType: 'video'
                                        })
                                    }}
                                    className='w-[49%] h-32 rounded-lg'
                                    key={item.name + index}
                                >
                                <VideoCard
                                    source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/${item.name}`}
                                    className='w-full h-full rounded-lg'
                                />
                            </Pressable>
                            }
                        })}

                    </View>
                </View>

                <Footer />
            </ParallaxScrollView>

            {/* Bottom overlay Join button */}
            <ThemedView className={`absolute bottom-0 w-full transition-all duration-1000 ${(animateJoinButton ? 'px-2 opacity-100' : 'px-32 opacity-0 translate-y-full')}`}>
                <LinkWrap
                    href={clubInfo.website_url || `mailto:${clubInfo.contact_email}`} className='bg-green-500 py-1 rounded-xl'
                    style={{
                        shadowColor: '#22c55e',
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <ThemedText className='text-white text-2xl text-center font-bold animate-pulse'>Press Here to Join</ThemedText>
                </LinkWrap>
            </ThemedView>
        </>
    )
}