import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Link } from 'expo-router'

import { FontAwesome } from '@expo/vector-icons'

import { useState, memo } from 'react'

import Card from '@/components/Card'
import ThemedText from '@/components/ThemedText'
import ThemedLink from '@/components/ThemedLink'

export interface EventCardProps {
    title: string
    time: string
    link: string
    img: string
    description: string
    pointLat: string | undefined
    pointLong: string | undefined
    location: string
}

function EventCard({ title, time, pointLat, pointLong, location, link, img, description }: EventCardProps) {

    const [expanded, setExpanded] = useState(false)

    function createReminder() {
        console.log(title)
        // Calendar.createEventInCalendarAsync()
    }

    return (
        <Card className={`flex flex-col rounded-xl overflow-hidden transition-all duration-500 border-white border-1 ${(!expanded ? '' : 'mb-2')}`}>

            {/* header section */}
            <TouchableOpacity className='flex flex-row' activeOpacity={0.9} onPress={() => setExpanded(!expanded)}>
                {/* first image is subtle backdrop overlay, second image is main left image */}
                <Image source={{ uri: img }} className='absolute w-full h-full opacity-5' />
                <Image source={{ uri: img }} className='w-[20%] h-full' />

                <View className='w-[80%] px-3 py-2'>
                    <ThemedText className='font-black' numberOfLines={1}>{title}</ThemedText>
                    {location && <ThemedText className='text-[13px] font-bold' lightColor='text-sky-700' darkColor='text-sky-200' numberOfLines={1}>📍 {location}</ThemedText>}
                    <ThemedText className='text-[12px] font-bold' lightColor='text-yellow-600' darkColor='text-yellow-100'>{time}</ThemedText>
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
                    <ThemedLink href={link} className='flex flex-row gap-1 w-[49%] bg-yellow-500 border-yellow-600 border-2 items-center justify-center rounded-b-xl'>
                        <Text className='font-bold'>See Full Details</Text>
                        <FontAwesome name='external-link' />
                    </ThemedLink>
                </View>
            </View>

        </Card>
    )
}

export default memo(EventCard)