import { useEffect, useState } from 'react'
import { View, Platform } from 'react-native'
import { Link, useNavigation } from 'expo-router'
import Swiper from 'react-native-deck-swiper'

import { openBrowserAsync } from 'expo-web-browser'
import { LinearGradient } from 'expo-linear-gradient'

import useRssFetch, { stripXML } from '@/hooks/useRssFetch'

import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import Image from '@/components/Image'

const SKYLINE_SHINES_ENDPOINT = 'https://skylineshines.skylinecollege.edu/feed/'

let platformAdaptedEndpoint = SKYLINE_SHINES_ENDPOINT

// on web, we must use CORS proxy (unless server changes its configured headers)
if (Platform.OS === 'web')
    platformAdaptedEndpoint = 'https://cors-anywhere.herokuapp.com/' + SKYLINE_SHINES_ENDPOINT

interface ArticleCardProps { 
    title: string
    // time: string
    link: string
    image: string
    description: string
    ["content:encoded"]: string
    // location: string
}

export default function TestPage() {

    const [ articles, setArticles ] = useState<ArticleCardProps[]>()
    const navigation = useNavigation()

    const fetchedRss = useRssFetch<ArticleCardProps>(platformAdaptedEndpoint)

    useEffect(() => {
        if (!fetchedRss) return

        const collectedArticles: ArticleCardProps[] = []

        fetchedRss.channel.item.map((item) => {
            const foundImages = item['content:encoded'].match(/<img[^>]+src="([^">]+)"/)

            let image = foundImages ? foundImages[1].split('?')[0].replace('http:', 'https:') : ''

            collectedArticles.push({
                title: item.title,
                description: item.description,
                link: item.link,
                ['content:encoded']: stripXML(item['content:encoded']),
                image: image
            })
        })

        setArticles(collectedArticles)

    }, [fetchedRss])

    return (
        <View>
            <View className='bg-red-500 w-full h-[40%]'>
                <ThemedText></ThemedText>
            </View>
            <View className='h-[60%]'>
                {
                    articles && <Swiper
                        cards={articles}
                        renderCard={(card) => {

                            return (
                                <ThemedView className='rounded-3xl h-[50%] overflow-hidden'>
                                    <Image source={card.image} className='absolute w-full h-full' blurRadius={4} contentFit='cover' />
                                    <Image source={card.image} className='w-full h-full bottom-0 opacity-95' contentFit='contain' />
                                    <LinearGradient
                                        className='absolute w-full h-full'
                                        colors={['#000000', '#FFFFFF00']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0.5 }}
                                    />
                                    <View className='absolute bottom-0 w-full bg-black/50 p-4'>
                                        <ThemedText className='text-lg font-bold'>{card.title}</ThemedText>
                                        <ThemedText className='text-base'>{card.description + '...'}</ThemedText>
                                    </View>
                                </ThemedView>
                            )
                        }}

                        onTapCard={(cardIndex) => { openBrowserAsync(articles[cardIndex].link) }}
                        onSwipedAll={() => { navigation.goBack() }}
                        cardIndex={0}
                        backgroundColor={'#4FD0E9'}
                        stackSize= {3}>
                    </Swiper>
                }
            </View>
        </View>
    )
}