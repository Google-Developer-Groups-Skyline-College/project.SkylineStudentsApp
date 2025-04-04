import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, TouchableHighlight } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { useModal } from 'react-native-modalfy'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Entypo from '@expo/vector-icons/Entypo'

import { useQuery } from '@tanstack/react-query'
import { QueryData } from '@supabase/supabase-js'

import { LinkWrap } from '@/components/LinkWrap'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ThemedText } from '@/components/ThemedText'
import { Image } from '@/components/Image'
import VideoCard from '@/components/VideoCard'

import { PointOfInterest } from '..'

import useSupabase from '@/hooks/useSupabase'

import Environment from '@/constants/Environment'

import dayjs, { extend as extendDayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

extendDayjs(customParseFormat)

const SUPABASE_MAP_POIS_ENDPOINT = Environment.SUPABASE_URL + '/storage/v1/object/public/map-pois'

const width = Dimensions.get('window').width

export default function PointOfInterestCard({ indoor_info, id, name, description, category, website_url, contact, hours }: PointOfInterest) {
    const { openModal } = useModal()
    const carouselProgress = useSharedValue<number>(0)

    const currentDay = dayjs().day()
    const currentTime = dayjs()

    let isOpen = false
    let todayHours

    if (hours) {
        todayHours = hours[currentDay]
        if (todayHours){
            isOpen = dayjs(todayHours[0], 'hh:mm').isBefore(currentTime) && dayjs(todayHours[1], 'hh:mm').isAfter(currentTime)
        }
    }

    const supabase = useSupabase()

    const galleryQueryFunction = supabase
        .storage
        .from('map-pois')
        .list(`${id}`, {
            sortBy: { column: 'name', order: 'asc' },
        })
    
    const galleryQuery = useQuery({ queryKey: [`map-pois/${id}/gallery`], queryFn: async () => {
        const { data } = await galleryQueryFunction
        return data
    } })

    const [ queriedGalleryItems, setQueriedGalleryItems ] = useState<QueryData<typeof galleryQueryFunction>>()

    useEffect(() => {
        if (galleryQuery.isFetched && galleryQuery.data) {
            setQueriedGalleryItems(galleryQuery.data)
        }
    }, [galleryQuery])

    let galleryItems = queriedGalleryItems

    return (
        <View className='flex flex-col w-full px-2'>

            { galleryItems && galleryItems?.length > 0 &&
            <Carousel
                width={width - 12}
                height={(width/2)}
                data={galleryItems}

                loop
                autoPlay
                autoPlayInterval={4000}
                onProgressChange={carouselProgress}

                mode='parallax'
                modeConfig={{ parallaxScrollingScale: 0.875, parallaxAdjacentItemScale: 0.6 }}

                renderItem={({index}) => {
                    const item = galleryItems[index]
                    if (item.metadata.mimetype === 'image/webp') {
                        return (
                            <TouchableHighlight onPress={() => {
                                openModal('MediaModal', {
                                    source: `${SUPABASE_MAP_POIS_ENDPOINT}/${id}/${item.name}`,
                                    mediaType: 'image'
                                })
                            }}>
                                <Image
                                    source={`${SUPABASE_MAP_POIS_ENDPOINT}/${id}/${item.name}`}
                                    className='w-full h-full rounded-lg'
                                />
                            </TouchableHighlight>
                            
                        )
                    }
                    if (item.metadata.mimetype === 'video/mp4') {
                        return (
                            <TouchableHighlight onPress={() => {
                                openModal('MediaModal', {
                                    source: `${SUPABASE_MAP_POIS_ENDPOINT}/${id}/${item.name}`,
                                    mediaType: 'image'
                                })
                            }}>
                                <VideoCard
                                    source={`${SUPABASE_MAP_POIS_ENDPOINT}/${id}/${item.name}`}
                                    className='w-full h-full rounded-lg'
                                />
                            </TouchableHighlight>
                            
                        )
                    }
                    return <></>
                }}
            />
            }

            <View className='px-2 gap-1'>
                <ThemedText type='subtitle' className='text-2xl'>{name}</ThemedText>

                <HorizontalRule />

                <View>
                    <View className='flex flex-row'>
                        <ThemedText className='italic'>{category} •</ThemedText>
                        { indoor_info ?
                        <>
                            <Image source={require('$/images/icons/building.svg')} contentFit='contain' tintColor='#0ea5e9' className='w-[26px] h-full' />
                            <Text className='text-sky-500'>{`Building ${indoor_info.building}${indoor_info.room ? ` - Room ${indoor_info.room}` : ''} (Floor ${indoor_info.floor})`}</Text>
                        </>
                        :
                        <>
                            <Image source={require('$/images/icons/tree.svg')} contentFit='contain' tintColor='#22c55e' className='w-[26px] h-full' />
                            <Text className='text-green-500'>Outdoors</Text>
                        </>
                        }
                    </View>

                    <ThemedText>{description || 'This point of interest has no description—at least not yet!'}</ThemedText>
                </View>



                <View className='flex flex-col py-2 gap-2'>

                    { hours &&
                    <View className='flex border-neutral-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-full rounded-lg overflow-hidden'>
                        <Entypo name='clock' size={72} color='gray' className='absolute opacity-15'/>
                        <View className='flex flex-row justify-center items-center w-full py-1'>
                            <Text className='absolute left-1 text-neutral-500 text-sm font-bold'>HOURS</Text>
                            <ThemedText className='text-sm font-bold'>
                                {todayHours ? (dayjs(todayHours[0], 'H:mm').format('h:mm A') + ' - ' + dayjs(todayHours[1], 'H:mm').format('h:mm A')) : 'Closed All-Day Today'}
                            </ThemedText>
                            <Text className={`absolute right-1 font-bold text-2xl ${isOpen ? 'text-green-400' : 'text-red-400'}` }>
                                {isOpen ? 'Open' : 'Closed'}
                            </Text>
                        </View>
                    </View>
                    }

                    <View className='flex flex-row flex-wrap justify-end gap-2'>

                        {/* { hours &&
                        <View className='flex border-neutral-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                            <Entypo name='clock' size={72} color='gray' className='absolute opacity-15'/>
                            <View className='w-full px-2'>
                                <Text className='text-neutral-500 text-sm font-bold'>HOURS</Text>
                                <Text className={`font-bold text-2xl ${isOpen ? 'text-green-400' : 'text-red-400'}` }>
                                    {isOpen ? 'Open' : 'Closed'}
                                </Text>
                            </View>
                        </View>
                        } */}

                        { website_url &&
                        <LinkWrap href={website_url} className='flex border-blue-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                            <MaterialCommunityIcons name='web' size={72} color='rgb(59,130,246)' className='absolute opacity-15'/>
                            <View className='w-full px-2'>
                                <Text className='text-neutral-500 text-sm font-bold'>VIEW</Text>
                                <ThemedText className='font-bold text-2xl'>Website</ThemedText>
                            </View>
                        </LinkWrap>
                        }

                        <View className='flex border-green-500/60 border border-1 justify-center items-center gap-x-1 p-1 w-[32%] rounded-lg overflow-hidden'>
                            <MaterialCommunityIcons name='share' size={72} color='rgb(34,197,94)' className='absolute opacity-15'/>
                            <View className='w-full px-2'>
                                <Text className='text-neutral-500 text-sm font-bold'>SHARE</Text>
                                <ThemedText className='font-bold text-2xl'>Location</ThemedText>
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

                    {/* <ThemedText>Test</ThemedText> */}

                </View>

                {/* <View className='flex flex-row'>
                        <View className='flex flex-row items-center justify-center rounded-2xl px-6 py-4 gap-2 border-red-900 border border-1' style={{ backgroundColor: '#FF4B4B28' }}>
                            <Entypo className='mx-auto my-auto' name='heart' color='#FF4B4BFF' />
                            <ThemedText>Favorite</ThemedText>
                        </View>
                </View> */}
            </View>
        </View>
    )
}