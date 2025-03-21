import { View, Text, Dimensions } from 'react-native'

import { useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel'

import ThemedText from '@/components/ThemedText'
import ThemedLink from '@/components/ThemedLink'
import ThemedView from '@/components/ThemedView'
import SearchBar, { Searchables } from '@/components/SearchBar'
import Card from '@/components/Card'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import FilterSelector from '@/components/FilterSelector'
import Image from '@/components/Image'

// import { Clubs, ClubDetails } from '@/constants/Clubs'
import { TagDetails } from '@/constants/Tags'
import Footer from '@/components/Footer'
import useSupabase from '@/hooks/useSupabase'

import { useQuery } from '@tanstack/react-query'

const SUPABASE_CLUB_ASSETS_ENDPOINT = process.env.EXPO_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/clubs-assets'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/decoratives/club_rush.webp'),
    require('$/images/decoratives/clubs/data_science_meeting.webp'),
    require('$/images/decoratives/clubs/gdgoc_meeting.webp'),
    require('$/images/decoratives/clubs/erc_group_photo.webp'),
]

type ClubDetails = Searchables & {
    id: string
    name: string
    logo: string
    tags: string[]
    description: string,
    contact_email: string,
    website_url: string,
    instagram_url: string,
    discord_url: string,
    meeting_location: string,
    meeting_time: string,
    join_url: string
}

interface ClubCardProps {
    id: string
    name: string
    tags: string[]
}

function ClubCard({ id, name, tags }: ClubCardProps) {

    return (
        <ThemedLink href={`/clubsListing/details/${id}`}>
            <View className='flex flex-row items-center h-28 rounded-2xl overflow-hidden'>

                {/* club card backdrop img */}
                <Image source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/galleries/${id}/backdrop.webp`} className='absolute w-full h-full'/>

                {/* dark contrast overlay */}
                <View className='absolute w-full h-full bg-black/50' />

                {/* club title and club logo */}
                <View className='flex flex-row w-full justify-between items-center p-4'>
                    <Text className='text-white text-2xl font-bold max-w-80'>{name}</Text>
                    <Image source={`${SUPABASE_CLUB_ASSETS_ENDPOINT}/logos/${id}.webp`} className='w-[76px] h-[76px] rounded-2xl' />
                </View>

                {/* side color tags */}
                {
                    tags &&
                    <View className='absolute h-full'>
                        {tags.length === 0 ? <View className='absolute border-l-4 border-neutral-300/75 w-full h-full' /> : <></> }
                        {tags.map((tagName) => {
                            return <View key={tagName} style={{ borderColor: TagDetails[tagName].color, height: (100 / tags.length) }} className='w-full border-l-4' />
                        } )}
                    </View>
                }

            </View>
        </ThemedLink>
    )
}

export default function ClubsListing() {

    const [ searchFilteredClubs, setSearchFilteredClubs ] = useState<ClubDetails[]>()
    const [ searchableClubs, setSearchableClubs ] = useState<ClubDetails[]>()
    const [ searchTerm, setSearchTerm ] = useState('')

    const supabase = useSupabase()

    const queryClubs = useQuery({ queryKey: ['clubs'], queryFn: async () => {
        const { data } = await supabase
            .from('clubs')
            .select('id, name, tags, aliases')
        return data
    } })

    useEffect(() => {
        if (!searchFilteredClubs && queryClubs.data) {
            setSearchFilteredClubs(queryClubs.data)
            setSearchableClubs(queryClubs.data)
        }
    }, [searchFilteredClubs, queryClubs])

    return (
        <View className='w-full h-full'>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#000', dark: '#000' }}
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
                            <ThemedView className='flex w-full h-full justify-center'>
                                <Image source={PHOTOS[index]} contentPosition='center' className='w-full h-full rounded-lg' />
                            </ThemedView>
                        )}
                    />
                }
            >
                {/* title bar, also shows current search term if inputted */}
                <ThemedText type='subtitle' className='border-b-[1px] text-center border-neutral-200 pb-2'>
                    {searchTerm.length > 0 ? `Searching: '${searchTerm}'` : 'Discover Student Clubs'}
                </ThemedText>

                <FilterSelector />

                {/* club listing */}

                {
                (!queryClubs.isFetching && queryClubs.isFetched && searchFilteredClubs) &&
                    <View className='gap-2'>
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
            {
                queryClubs.data &&
                <Card className='absolute bottom-0 w-full rounded-t-3xl p-4'>
                    <SearchBar
                        searchables={searchableClubs}
                        placeholder='🔎  Search for Clubs'
                        onChangeText={setSearchTerm}
                        onFilterOutput={setSearchFilteredClubs}
                        placeholderTextColor={'gray'}
                        className='font-bold text-center text-xl'
                    />
                </Card>
            }
            
        </View>
    );
}