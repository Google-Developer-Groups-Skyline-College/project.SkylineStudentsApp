import { View, Text, TouchableOpacity } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import * as Calendar from 'expo-calendar'

import { useState, memo } from 'react'

import ThemedText from '@/components/ThemedText'
import LinkWrap from '@/components/LinkWrap'
import Image from '@/components/Image'
import Card from '@/components/Card'

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
                <Image source={source} className=' w-4 h-full ' />
                {/* <Image source={source} cachePolicy={'none'} className='w-[20%] h-full' /> */}

                <View className='w-[80%] px-3 py-2'>
                    <ThemedText className='font-black' numberOfLines={1}>{title}</ThemedText>
                    {location && <ThemedText className='text-[13px] font-bold' lightColor='text-sky-700' darkColor='text-sky-200' numberOfLines={1}>📍 {location}</ThemedText>}
                    <ThemedText className='text-[12px] font-bold' lightColor='text-yellow-600' darkColor='text-yellow-100'>
                        { time.start.toLocaleTimeString('en-US', DATE_FORMAT) + (time.end ? (' - ' + (time.end.toLocaleTimeString('en-US', DATE_FORMAT))) : '')}
                    </ThemedText>
                </View>
            </TouchableOpacity>

            {/* extended description and buttons section */}
            

        </Card>
    )
}

export default memo(EventCard)