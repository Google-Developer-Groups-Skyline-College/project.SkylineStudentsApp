import { Suspense, useEffect, useState } from 'react'
import { View, Dimensions, Text } from 'react-native'
import { Link } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'

import DateTimePicker, { DateType, useDefaultClassNames } from 'react-native-ui-datepicker'
import Carousel from 'react-native-reanimated-carousel'

import Image from '@/components/Image'

import { useColorScheme } from '@/hooks/useColorScheme'
import { useThemeColor } from '@/hooks/useThemeColor'
import useRssFetch, { stripXML } from '@/hooks/useRssFetch'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import ThemedText from '@/components/ThemedText'

import EventCard, { EventCardProps } from './components/EventCard'
import DatedList, { DateItem } from './components/DatedList'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/decoratives/centerpiece.webp'),
    require('$/images/decoratives/club_rush.webp'),
    require('$/images/decoratives/boba_social.webp'),
]

const RSS_EVENTS_ENDPOINT = 'https://events.skylinecollege.edu/live/rss/events/group/District%20Academic%20Calendar/group/Districtwide%20Events/group/Skyline%20Athletics/group/Skyline%20College/group/Skyline%20Transfer%20Center/group/Skyline%20College/header/Skyline%20College%20Events'

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
    hour12: true,
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit'
}

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

    const [datedEvents, setDatedEvents] = useState<DateItem<EventRss>[]>([])

    useEffect(() => {
        if (!fetchedRss) return

        const collectedEvents: DateItem<EventRss>[] = []

        for (let item of fetchedRss.channel.item.slice(0, 40)) {
            const date = new Date(item.pubDate)
            collectedEvents.push({
                date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'long' }),
                item: item
            })
        }

        setDatedEvents(collectedEvents)

    }, [fetchedRss])

    return (
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
                        <View className='flex w-full h-full justify-center'>
                            <Image source={PHOTOS[index]} className='w-full h-full rounded-lg' />
                        </View>
                    )}
                />
            }
        >
            <ThemedText type='subtitle' className='border-b-[1px] border-yellow-500 pb-2'>🎉 Today's Campus Events</ThemedText>

            <DateTimePicker
                mode='single'
                date={selected}
                onChange={({ date }) => setSelected(date)}
                classNames={themeClassNames}
            />
            <Suspense fallback={<ThemedText>Loading...</ThemedText>}>
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
                                const descriptionWithoutTags = stripXML(event.description)
    
                                const startTime = new Date(event.pubDate).toLocaleTimeString('en-US', DATE_FORMAT)
                                const endTime = event['livewhale:ends'] 
                                    ? ' - ' + new Date(event['livewhale:ends']).toLocaleTimeString('en-US', DATE_FORMAT) 
                                    : ''

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
                                        title={event.title.replace(/\b\w/g, function(match) {
                                            return match.toUpperCase();
                                        })}
                                        time={`${startTime} ${endTime}`}
                                        link={event.link}
                                        description={descriptionWithoutTags}
                                        location={event['georss:featurename']}
                                        pointLat={lat}
                                        pointLong={long}
                                        img={event['livewhale:image_full'] || 'nothing'}
                                        key={index}
                                    />
                                )
                            }
                        }
                    />
                }
            </Suspense>

            <ThemedText>All Events list is limited to 40 entries.</ThemedText>
            <Link href='https://events.skylinecollege.edu'><Text className='text-blue-400 font-semibold'>Press to see rest of events.</Text></Link>
        </ParallaxScrollView>
    )
}