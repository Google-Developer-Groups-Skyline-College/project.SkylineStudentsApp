// todo
//  add useQuery to RSS read

import React, { useEffect, useState } from 'react'
import { View, Dimensions, TouchableHighlight, SectionList, SectionListData } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { AntDesign, Ionicons } from '@expo/vector-icons'

import LoadingScreen from '@/components/LoadingScreen'
import ThemedText from '@/components/ThemedText'
import Image from '@/components/Image'

import { useThemeColor } from '@/hooks/useThemeColor'
import useRssFetch, { sanitizeXml } from '@/hooks/useRssFetch'

import EventCard from './components/EventCard'
import ThemedView from '@/components/ThemedView'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/decoratives/centerpiece.webp'),
    require('$/images/decoratives/club_rush.webp'),
    require('$/images/decoratives/stem-clubs-boba-social-fall-2024.webp')
]

const RSS_EVENTS_ENDPOINT = 'https://events.skylinecollege.edu/live/rss/events/group/District%20Academic%20Calendar/group/Districtwide%20Events/group/Skyline%20Athletics/group/Skyline%20College/group/Skyline%20Transfer%20Center/group/Skyline%20College/header/Skyline%20College%20Events'

interface EventRss {
    title: string
    description: string
    pubDate: string
    link: string
    'livewhale:image': string
    'livewhale:ends': string
    'georss:featurename': string
    'georss:point': string | null
}

interface EventSection {
    date: string
    data: EventRss[]
}

const EVENTS_PER_PAGE = 40

export default function Resources() {

    const calendarIconColor = useThemeColor(null, 'icon')

    const fetchedRss = useRssFetch<EventRss>(RSS_EVENTS_ENDPOINT)

    const [ datedEvents, setDatedEvents ] = useState<SectionListData<EventRss, EventSection>[]>()
    const [ pageRefreshing, setPageRefreshing ] = useState(false)
    const [ page, setPage ] = useState(1)

    useEffect(() => {
        if (!fetchedRss) return
        setPageRefreshing(true)

        const collectedEvents = []
        let currentDate

        for (let item of fetchedRss.channel.item.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE)) {
            const itemDate = new Date(item.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'long' })
            if (itemDate === currentDate) {
                collectedEvents[collectedEvents.length - 1].data.push(item)
            } else {
                currentDate = itemDate
                collectedEvents.push({
                    date: itemDate,
                    data: [item]
                })
            }
        }

        setDatedEvents(collectedEvents)
        setTimeout(() => {
            setPageRefreshing(false)
        }, 500)
    }, [page, fetchedRss])

    return (
        <>
            { pageRefreshing && datedEvents
            ?
            <LoadingScreen />
            :

            <ThemedView className='w-full h-full rounded-t-3xl'>

                <ThemedView className='flex w-full h-[15%] justify-end'>
                    {/* <Image source={require('$/images/decoratives/centerpiece.webp')} contentPosition={'top'} priority={'high'} cachePolicy={'memory-disk'} className='absolute w-full h-full object-cover' /> */}
                    <Image source={require('$/images/decoratives/centerpiece.webp')} className='absolute w-full h-full object-cover' />


                    {/* overlays on image */}
                    <LinearGradient
                        className='absolute w-full h-full'
                        colors={['#000000', '#FFFFFF00']} start={{ x: -0.05, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                    />

                    <View className='p-4'>
                        <View className='flex flex-row gap-x-2'>
                            <ThemedText
                            className='text-white leading-tight'
                            type='title'
                            style={{ textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32 }}>
                                Hello,
                            </ThemedText>
                        </View>
                    </View>

                </ThemedView>


                <View className='h-[80%] p-4 gap-2'>
                    <ThemedText type='subtitle' className='border-b-[1px] border-yellow-500 pb-2'>🎉 Upcoming Campus Events</ThemedText>

                    { (fetchedRss && datedEvents) &&
                    <SectionList
                        sections={datedEvents}
                        removeClippedSubviews
                        stickySectionHeadersEnabled
                        keyExtractor={(item, index) => item.title + index}

                        renderSectionHeader={({section: {date}}) => (
                            <ThemedView className='flex flex-row items-center gap-2 opacity-95'>
                                <Ionicons
                                    name={'calendar'}
                                    size={18}
                                    color={calendarIconColor}
                                />
                                <ThemedText type='subtitle' className='py-2'>{date}</ThemedText>
                            </ThemedView>
                        )}
                        renderItem={({item}) => (
                            <EventCard
                                // capitalizes first letter in each word
                                title={item.title.replace(/\b\w/g, function(match: string) {
                                    return match.toUpperCase()
                                })}
                                time={{
                                    start: new Date(item.pubDate),
                                    end: item['livewhale:ends'] ? new Date(item['livewhale:ends']) : undefined
                                }}
                                link={item.link}
                                description={sanitizeXml(item.description)}
                                location={item['georss:featurename']}
                                img={item['livewhale:image']}
                            />
                        )}
                        refreshing={pageRefreshing}
                    />
                    }
                </View>

                <ThemedView className='flex h-[5%] items-center gap-1'>
                    <View className='w-full flex flex-row items-center justify-center gap-3'>
                        <TouchableHighlight onPress={() => { setPage(Math.max(1, page - 1)) }}>
                            <AntDesign name='leftsquare' color={'gray'} size={32} />
                        </TouchableHighlight>
                        <ThemedText className='font-black'>{`${page} (${page * EVENTS_PER_PAGE}/${4 * EVENTS_PER_PAGE})`}</ThemedText>
                        <TouchableHighlight onPress={() => { setPage(Math.min(4, page + 1)) }}>
                            <AntDesign name='rightsquare' color={'gray'} size={32} />
                        </TouchableHighlight>
                    </View>

                    <Link href='https://events.skylinecollege.edu' asChild>
                        <Ionicons name='earth' color={'gray'} size={32} className='absolute right-4' />
                    </Link>
                </ThemedView>

            </ThemedView>

            }
        </>
    )
}