import { View, Text, Dimensions } from 'react-native'

import { useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel'

import ThemedText from '@/components/ThemedText'
import LinkWrap from '@/components/LinkWrap'
import ThemedView from '@/components/ThemedView'
import SearchBar from '@/components/SearchBar'
import Card from '@/components/Card'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import FilterSelector from '@/components/FilterSelector'
import Image from '@/components/Image'

// import { Clubs, ClubDetails } from '@/constants/Clubs'
import { TagDetails } from '@/constants/Tags'
import Environment from '@/constants/Environment'

import Footer from '@/components/Footer'
import useSupabase from '@/hooks/useSupabase'

import { useQuery } from '@tanstack/react-query'
import { QueryData } from '@supabase/supabase-js'
import HorizontalRule from '@/components/HorizontalRule'

const SUPABASE_CLUB_ASSETS_ENDPOINT = Environment.SUPABASE_URL + '/storage/v1/object/public/clubs-assets'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/decoratives/club_rush.webp'),
    require('$/images/decoratives/clubs/data_science_meeting.webp'),
    require('$/images/decoratives/clubs/gdgoc_meeting.webp'),
    require('$/images/decoratives/clubs/erc_group_photo.webp'),
]

interface ClubCardProps {
    id: string
    name: string
    tags: string[]
}

function ClubCard({ id, name, tags }: ClubCardProps) {
    return (
        <LinkWrap href={`/clubs-listing/details/${id}`} className='flex flex-row items-center h-28 rounded-xl overflow-hidden'>
            {/* club card backdrop img */}
            <Image source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/z_backdrop.webp`} className='absolute w-full h-full'/>

            {/* dark contrast overlay */}
            <View className='absolute w-full h-full bg-black/35' />

            {/* club title and club logo */}
            <View className='flex flex-row w-full justify-between items-center p-4'>
                <Image source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/logos/${id}.webp`} className='absolute w-[72px] h-[72px] rounded-2xl right-2' />
                <Text
                    className='text-white text-2xl w-[80%]'
                    style={{ textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32, fontFamily: 'RobotoSlab_700Bold' }}>
                    {name}
                </Text>
            </View>

            {/* side color tags */}
            <View className='absolute h-full'>
                {!tags ?
                <View className='absolute border-l-4 border-neutral-300 w-full h-full' /> 
                :
                tags.map((tagName) => {
                    return <View key={tagName} style={{ borderColor: TagDetails[tagName].color, height: (100 / tags.length) }} className='w-full border-l-4' />
                })
                }
            </View>
        </LinkWrap>
    )
}


export default function ClubsListing() {

    const [ searchFilteredClubs, setSearchFilteredClubs ] = useState<Clubs>()
    const [ baseSearchableClubs, setBaseSearchableClubs ] = useState<Clubs>()
    const [ searchTerm, setSearchTerm ] = useState('')

    const supabase = useSupabase()

    const queryClubsFunction = supabase
        .from('clubs')
        .select('id, name, tags, aliases')
        .order('name', { ascending: true })

    const queryClubs = useQuery({ queryKey: ['clubs'], queryFn: async () => {
        const { data } = await queryClubsFunction
        return data
    }})

    type Clubs = QueryData<typeof queryClubsFunction>

    useEffect(() => {
        if (!searchFilteredClubs && queryClubs.data) {
            setSearchFilteredClubs(queryClubs.data)
            setBaseSearchableClubs(queryClubs.data)
        }
    }, [searchFilteredClubs, queryClubs])

    return (
        <View className='w-full h-full'>
            <ParallaxScrollView
                headerHeight={190}
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
                {/* title bar, also shows current search term if inputted */}
                <View>
                    <ThemedText type='subtitle' className='text-center'>
                        {searchTerm.length > 0 ? `Searching: '${searchTerm}'` : 'Discover Student Clubs'}
                    </ThemedText>

                    <HorizontalRule height={2} color='#e5e5e5' />
                </View>

                {/* <FilterSelector /> */}

                {/* club listing */}
                { searchFilteredClubs &&
                <View className='gap-1'>
                    {searchFilteredClubs.map((club) => {
                        return (
                            <ClubCard
                                id={club.id}
                                key={club.id}
                                name={club.name}
                                tags={club.tags}
                            />
                        )
                    })}
                </View>
                }

                <Footer />

            </ParallaxScrollView>

            {/* overlayed bottom search bar */}
            { baseSearchableClubs &&
            <Card className='absolute bottom-0 w-full rounded-t-3xl p-4'>
                <SearchBar
                    searchables={baseSearchableClubs}
                    placeholder='🔎  Search for Clubs'
                    onChangeText={setSearchTerm}
                    onFilterOutput={setSearchFilteredClubs}
                    placeholderTextColor={'gray'}
                    className='font-bold text-center text-xl'
                />
            </Card>
            }
            
        </View>
    )
}