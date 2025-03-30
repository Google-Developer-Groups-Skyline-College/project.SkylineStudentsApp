import { View, Text, TouchableOpacity, Image } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import * as Calendar from 'expo-calendar'
import { Link } from 'expo-router'

import { useState, memo } from 'react'

import Card from '@/components/Card'
import ThemedText from '@/components/ThemedText'
import LinkWrap from '@/components/LinkWrap'

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
    hour12: true,
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit'
}

export interface EventCardProps {
    title: string
    time: {
        start: Date,
        end: Date | undefined
    }
    link: string
    img: string
    description: string
    pointLat: string | undefined
    pointLong: string | undefined
    location: string
}

function EventCard({ title, time, pointLat, pointLong, location, link, img, description }: EventCardProps) {

    const [expanded, setExpanded] = useState(false)
    
    const source = img !== 'nothing' ? { uri: img } : require('$/images/image.placeholder.webp')

    async function createReminder() {
        const { status } = await Calendar.requestCalendarPermissionsAsync()
        if (status !== 'granted') return

        Calendar.createEventInCalendarAsync({
            title: title,
            startDate: time.start,
            endDate: time.end ?? undefined,
            location: location
        })
    }

    return (
        <Card className={`flex flex-col rounded-xl overflow-hidden transition-all duration-500 ${(!expanded ? '' : 'mb-2')}`}>

            {/* header section */}
            <TouchableOpacity className='flex flex-row' activeOpacity={0.9} onPress={() => setExpanded(!expanded)}>
                
                {/* first image is subtle backdrop overlay, second image is main left image */}
                <Image source={source} progressiveRenderingEnabled className='absolute w-full h-full opacity-5' />
                <Image source={source} progressiveRenderingEnabled className='w-[20%] h-full' />

                <View className='w-[80%] px-3 py-2'>
                    <ThemedText className='font-black' numberOfLines={1}>{title}</ThemedText>
                    {location && <ThemedText className='text-[13px] font-bold' lightColor='text-sky-700' darkColor='text-sky-200' numberOfLines={1}>📍 {location}</ThemedText>}
                    <ThemedText className='text-[12px] font-bold' lightColor='text-yellow-600' darkColor='text-yellow-100'>
                        { time.start.toLocaleTimeString('en-US', DATE_FORMAT) + (time.end ? (' - ' + (time.end.toLocaleTimeString('en-US', DATE_FORMAT))) : '')}
                    </ThemedText>
                    {/* {pointLat && <Link href={`https://www.google.com/maps/@${pointLat},${pointLong},19.5z`}><ThemedText className='text-sky-400 font-bold'>View on Maps</ThemedText></Link>} */}
                </View>
            </TouchableOpacity>

            {/* extended description and buttons section */}
            <View className={`flex flex-col ${(!expanded ? 'hidden' : '')}`}>
                {description && <ThemedText className='p-2'>{description}</ThemedText>}
                <View className='flex flex-row justify-between h-10'>
                    <TouchableOpacity activeOpacity={0.9} onPress={createReminder} className='flex flex-row gap-1 w-[49%] bg-green-400 border-green-600 border-2 items-center justify-center rounded-b-xl'>
                        <FontAwesome name='bell' />
                        <Text className='font-bold'>Get Reminded</Text>
                    </TouchableOpacity>
                    <LinkWrap href={link} className='flex flex-row gap-1 w-[49%] bg-yellow-500 border-yellow-600 border-2 items-center justify-center rounded-b-xl'>
                        <Text className='font-bold'>See Full Details</Text>
                        <FontAwesome name='external-link' />
                    </LinkWrap>
                </View>
            </View>

        </Card>
    )
}

export default memo(EventCard)