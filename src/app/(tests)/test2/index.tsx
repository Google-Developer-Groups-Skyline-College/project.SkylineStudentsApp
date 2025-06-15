// todo
//  add useQuery to RSS read

import React, { useEffect, useState } from 'react'
import { View, Dimensions, TouchableHighlight, SectionList, SectionListData } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import Carousel from 'react-native-reanimated-carousel'

import { LoadingScreen } from '@/components/LoadingScreen'
import { ThemedText } from '@/components/ThemedText'
import { Image } from '@/components/Image'

import { useThemeColor } from '@/hooks/useThemeColor'
import { useRssFetch, sanitizeXml } from '@/hooks/useRssFetch'

import { EventCard } from './components/EventCard'
import { ThemedView } from '@/components/ThemedView'
import { ScreenBase } from '@/components/ScreenBase'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const CAROUSEL_IMAGE_SET = [
    require('$/images/decoratives/centerpiece.webp'),
    require('$/images/decoratives/club_rush.webp'),
    require('$/images/decoratives/stem-clubs-boba-social-fall-2024.webp')
]

const EVENTS_PER_PAGE = 40

const RSS_EVENTS_ENDPOINT = 'https://events.skylinecollege.edu/live/rss/events/group/District%20Academic%20Calendar/group/Districtwide%20Events/group/Skyline%20Athletics/group/Skyline%20College/group/Skyline%20Transfer%20Center/group/Skyline%20College/header/Skyline%20College%20Events'

interface EventRss {
    title: string
    description: {
        p: string
    }
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

export default function EventsListing() {

    const calendarIconColor = useThemeColor(null, 'icon')

    const fetchedRss = useRssFetch<EventRss>(RSS_EVENTS_ENDPOINT)

    const [ datedEvents, setDatedEvents ] = useState<SectionListData<EventRss, EventSection>[]>()
    const [ pageRefreshing, setPageRefreshing ] = useState(false)
    const [ page, setPage ] = useState(1)

    useEffect(() => {
        if (!fetchedRss) return
        setPageRefreshing(true)

        const collectedEvents: EventSection[] = []
        let currentDate

        for (let event of fetchedRss.channel.item.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE)) {
            const eventDate = new Date(event.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'long' })
            if (eventDate === currentDate) {
                collectedEvents[collectedEvents.length - 1].data.push(event)
            } else {
                currentDate = eventDate
                collectedEvents.push({
                    date: eventDate,
                    data: [event]
                })
            }
        }

        setDatedEvents(collectedEvents)
        setTimeout(() => {
            setPageRefreshing(false)
        }, 200)
    }, [page, fetchedRss])

    if (pageRefreshing || !datedEvents) return <LoadingScreen />

    return (
        <>
            <ScreenBase
                title='Upcoming Events'
                subtitle='Campus festivities and social mixers.'
                backdrop={
                    <View className='w-full h-full'>
                        <Carousel
                            data={CAROUSEL_IMAGE_SET}
                            width={screenWidth + 1}
                            height={324}

                            loop
                            autoPlay
                            autoPlayInterval={4000}
                            scrollAnimationDuration={4000}

                            defaultIndex={Math.floor(Math.random() * CAROUSEL_IMAGE_SET.length)}
                            renderItem={({ index }) => (
                                <Image source={CAROUSEL_IMAGE_SET[index]} contentPosition={'top center'} className='w-full h-full object-cover' />
                            )}
                        />
                    </View>
                }
                disableScrolling
            >

                {/* <View> */}


                    <SectionList
                        sections={datedEvents}
                        stickySectionHeadersEnabled
                        keyExtractor={(item, index) => item.title + index}
                        style={{height: screenHeight - 220 - 64}}
                        // className='h-[70%]'

                        renderSectionHeader={({section: {date}}) => (
                            <ThemedView className='flex flex-row items-center gap-2 py-2 opacity-95'>
                                <Ionicons
                                    name={'calendar'}
                                    size={18}
                                    color={calendarIconColor}
                                />
                                <ThemedText type='subtitle'>{date}</ThemedText>
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
                                description={item.description.p}
                                location={item['georss:featurename']}
                                img={item['livewhale:image']}
                            />
                        )}
                        refreshing={pageRefreshing}
                    />

                {/* </View> */}

            </ScreenBase>

            <ThemedView className='absolute flex items-center justify-center gap-1 w-full h-16 bottom-0'>
                <View className='flex flex-row items-center justify-center gap-3'>
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
        </>
    )
}