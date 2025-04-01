// todo
//  add useQuery to RSS read

import React, { useEffect, useState } from 'react'
import { View, Dimensions, Text, TouchableHighlight } from 'react-native'
import { Link } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'

import DateTimePicker, { DateType, useDefaultClassNames } from 'react-native-ui-datepicker'
import Carousel from 'react-native-reanimated-carousel'

import { useColorScheme } from '@/hooks/useColorScheme'
import { useThemeColor } from '@/hooks/useThemeColor'
import useRssFetch, { sanitizeXml } from '@/hooks/useRssFetch'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import LoadingScreen from '@/components/LoadingScreen'
import ThemedText from '@/components/ThemedText'
import Image from '@/components/Image'

import EventCard, { EventCardProps } from './components/EventCard'
import DatedList, { DateItem } from './components/DatedList'
import { AntDesign } from '@expo/vector-icons'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/decoratives/centerpiece.webp'),
    require('$/images/decoratives/club_rush.webp'),
    require('$/images/decoratives/boba_social.webp')
]

const RSS_EVENTS_ENDPOINT = 'https://events.skylinecollege.edu/live/rss/events/group/District%20Academic%20Calendar/group/Districtwide%20Events/group/Skyline%20Athletics/group/Skyline%20College/group/Skyline%20Transfer%20Center/group/Skyline%20College/header/Skyline%20College%20Events'

interface EventRss {
    title: string
    description: string
    pubDate: string
    link: string
    'livewhale:image_full': string
    'livewhale:ends': string
    'georss:featurename': string
    'georss:point': string | null
}

const EVENTS_PER_PAGE = 40

export default function Resources() {

    const defaultClassNames = useDefaultClassNames()
    const [selected, setSelected] = useState<DateType>()

    const calendarIconColor = useThemeColor(null, 'icon')
    
    const theme = useColorScheme() ?? 'light'

    let themeClassNames
    if (theme === 'dark') {
        themeClassNames = {
            ...defaultClassNames,
            today: 'border-amber-500 border-2 rounded-2xl',
            today_label: 'text-white font-bold',
            selected: 'bg-amber-500 rounded-2xl',
            selected_label: 'text-white',
            day_label: 'text-white',
            weekday_label: 'text-white font-bold ',
            year_selector_label: 'text-white',
            month_selector_label: 'text-white font-bold',
            day: `${defaultClassNames.day} hover:bg-amber-100`,
            day_cell: 'p-1',
            disabled: 'opacity-50'
        }
    } else {
        themeClassNames = {
            ...defaultClassNames,
            today: 'border-amber-500 border-2 rounded-2xl',
            today_label: 'text-black font-bold',
            selected: 'bg-amber-500 rounded-2xl',
            selected_label: 'text-black',
            day_label: 'text-black',
            weekday_label: 'text-black font-bold ',
            year_selector_label: 'text-black',
            month_selector_label: 'text-black font-bold',
            day: `${defaultClassNames.day} hover:bg-amber-100`,
            day_cell: 'p-1',
            disabled: 'opacity-50'
        }
    }

    const fetchedRss = useRssFetch<EventRss>(RSS_EVENTS_ENDPOINT)

    const [ datedEvents, setDatedEvents ] = useState<DateItem<EventRss>[]>([])
    const [ page, setPage ] = useState(1)

    useEffect(() => {
        if (!fetchedRss) return

        const collectedEvents: DateItem<EventRss>[] = []

        for (let item of fetchedRss.channel.item.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE)) {
            const date = new Date(item.pubDate)
            collectedEvents.push({
                date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'long' }),
                item: item
            })
        }

        setDatedEvents(collectedEvents)

    }, [page, fetchedRss])

    return (
        <>
            { !fetchedRss
            ?
            <LoadingScreen />
            :
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#000', dark: '#000' }}
                headerImage={
                    <Carousel
                        width={width + 1}
                        height={width / 2}
                        data={PHOTOS}

                        loop
                        autoPlay
                        autoPlayInterval={4000}
                        scrollAnimationDuration={2000}

                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxAdjacentItemScale: 0.7
                        }}

                        renderItem={({ index }) => (
                            <Image source={PHOTOS[index]} contentPosition='center' className='w-full h-full' />
                        )}
                    />
                }
            >
                <ThemedText type='subtitle' className='border-b-[1px] border-yellow-500 pb-2'>🎉 Upcoming Campus Events</ThemedText>

                <DateTimePicker
                    mode='single'
                    date={selected}
                    onChange={({ date }) => setSelected(date)}
                    classNames={themeClassNames}
                />
                { fetchedRss &&
                <DatedList<EventRss>
                    className='gap-2'
                    datedItems={datedEvents}
                    headerComponent={(key) => {
                        return (
                            <View className='flex flex-row gap-2 items-center'>
                                <Ionicons
                                    name={'calendar'}
                                    size={18}
                                    color={calendarIconColor}
                                />
                                <ThemedText className='font-bold text-2xl py-4'>{key}</ThemedText>
                            </View>
                        )
                    }}
                    itemComponent={
                        (event, index) => {
                            if (!event.description) return
                            const descriptionWithoutTags = sanitizeXml(event.description)

                            const startTime = new Date(event.pubDate)
                            const endTime = event['livewhale:ends'] ? new Date(event['livewhale:ends']) : undefined

                            let lat
                            let long

                            if (event['georss:point']) {
                                const point = event['georss:point'].split(' ')
                            
                                lat = point[0]
                                long = point[1]
                            }

                            return (
                                // break this out in event card instead:
                                <EventCard
                                    // capitalizes first letter in each word
                                    title={event.title.replace(/\b\w/g, function(match) {
                                        return match.toUpperCase()
                                    })}
                                    time={{
                                        start: startTime,
                                        end: endTime
                                    }}
                                    link={event.link}
                                    description={descriptionWithoutTags}
                                    location={event['georss:featurename']}
                                    pointLat={lat}
                                    pointLong={long}
                                    img={event['livewhale:image_full'] || 'nothing'}
                                    key={event.title + index}
                                />
                            )
                        }
                    }
                />
                }

                <View className='w-full flex flex-row items-center justify-center gap-3'>
                    <TouchableHighlight onPress={() => { setPage(Math.max(1, page - 1)) }}><AntDesign name='leftsquare' color={'gray'} size={32} /></TouchableHighlight>
                    <ThemedText className='font-black'>{page}</ThemedText>
                    <TouchableHighlight onPress={() => { setPage(Math.min(4, page + 1)) }}><AntDesign name='rightsquare' color={'gray'} size={32} /></TouchableHighlight>
                </View>

                <ThemedText>The events list is limited to {EVENTS_PER_PAGE} entries.</ThemedText>
                <Link href='https://events.skylinecollege.edu'><Text className='text-blue-400 font-semibold'>Press to see all events.</Text></Link>
            </ParallaxScrollView>
            }
        </>
    )
}