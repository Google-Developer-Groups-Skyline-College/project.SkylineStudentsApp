import { useEffect, useState } from 'react'
import { View, Text, Platform } from 'react-native'
import Swiper from 'react-native-deck-swiper'

import { useNavigation } from 'expo-router'
import { openBrowserAsync } from 'expo-web-browser'
import { LinearGradient } from 'expo-linear-gradient'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image } from '@/components/Image'

import { useRssFetch, sanitizeXml, extractImages } from '@/hooks/useRssFetch'

const SKYLINE_SHINES_ENDPOINT = 'https://skylineshines.skylinecollege.edu/feed/'

let platformAdaptedEndpoint = SKYLINE_SHINES_ENDPOINT

// on web, we must use a CORS proxy (unless target rss server eventually changes its configured request headers)
if (Platform.OS === 'web')
    platformAdaptedEndpoint = 'https://cors-anywhere.herokuapp.com/' + SKYLINE_SHINES_ENDPOINT

interface ArticleRss {
    title: string
    // time: string
    link: string
    image: string
    description: string
    ['content:encoded']: string
    // location: string
}

export default function TestPage() {

    const [ articles, setArticles ] = useState<ArticleRss[]>()
    const navigation = useNavigation()

    const fetchedRss = useRssFetch<ArticleRss>(platformAdaptedEndpoint)

    useEffect(() => {
        if (!fetchedRss) return

        const collectedArticles: ArticleRss[] = []

        fetchedRss.channel.item.map((item) => {
            const foundImages = extractImages(item['content:encoded'])
            const image = foundImages ? foundImages[1].split('?')[0] : ''

            collectedArticles.push({
                title: item.title,
                description: item.description,
                link: item.link,
                ['content:encoded']: sanitizeXml(item['content:encoded']),
                image: image
            })
        })

        setArticles(collectedArticles)
    }, [fetchedRss])

    return (
        <>
            <View className='flex w-full h-[30%] bg-red-600 justify-center items-center'>
                <ThemedText className='font-bold'>Below are fetched from Skyline Shines last 10 feeds.</ThemedText>
            </View>
            <View className='h-[75%]'>
                {
                    articles &&
                    <Swiper
                        cards={articles}
                        renderCard={(card) => {
                            return (
                                <View className='rounded-3xl h-[65%] bg-neutral-950 overflow-hidden'>
                                    <Image source={card.image} className='absolute w-full h-full' blurRadius={4} contentFit='cover' />
                                    <Image source={card.image} className='w-full h-full bottom-0 opacity-95' contentFit='contain' />
                                    <LinearGradient
                                        className='absolute w-full h-full'
                                        colors={['#000000', '#FFFFFF00']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0.5 }}
                                    />
                                    <View className='absolute bottom-0 w-full  p-4'>
                                        <Text className='text-lg text-white font-bold'>{card.title}</Text>
                                        <Text className='text-base text-white'>{card.description + '...'}</Text>
                                    </View>
                                </View>
                            )
                        }}

                        onTapCard={(cardIndex) => { openBrowserAsync(articles[cardIndex].link) }}
                        onSwipedAll={() => { navigation.goBack() }}
                        cardIndex={0}
                        backgroundColor={'#4FD0E9'}
                        stackSize={3}
                    />
                }
            </View>
        </>
    )
}