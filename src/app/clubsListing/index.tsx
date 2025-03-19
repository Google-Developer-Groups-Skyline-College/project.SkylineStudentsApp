import { View, Text, ImageSourcePropType, Dimensions } from 'react-native'
import { Stack } from 'expo-router'

import { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel'

import ThemedText from '@/components/ThemedText'
import ThemedLink from '@/components/ThemedLink'
import ThemedView from '@/components/ThemedView'
import SearchBar from '@/components/SearchBar'
import Card from '@/components/Card'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import FilterSelector from '@/components/FilterSelector'
import ReturnHome from '@/components/ReturnHome'
import Image from '@/components/Image'

import { Clubs, ClubDetails } from '@/constants/Clubs'
import { TagDetails } from '@/constants/Tags'
import Footer from '@/components/Footer'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/clubs/photos/computer_science_club/sfhacks.jpg'),
    require('$/images/clubs/photos/computer_science_club/backdrop.png'),
    require('$/images/clubs/photos/engineering_robotics_club/backdrop.jpg'),
    require('$/images/club_rush.jpg')
]

interface ClubCardProps { 
    title: string,
    // time: string,
    // location: string,
    backdrop: ImageSourcePropType,
    logo: ImageSourcePropType
}

function ClubCard({ title, backdrop, logo }: ClubCardProps) {

    return (
        <ThemedLink href={`/clubsListing/details/${title}`}>
            <View className='flex flex-row items-center h-28 rounded-2xl overflow-hidden'>

                {/* club card backdrop img */}
                <Image source={backdrop} className='absolute w-full h-full'/>

                {/* dark contrast overlay */}
                <View className='absolute w-full h-full bg-black/50' />

                {/* club title and club logo */}
                <View className='flex flex-row w-full justify-between items-center p-4'>
                    <Text className='text-white text-2xl font-bold max-w-80'>{title}</Text>
                    <Image source={logo} className='w-[76px] h-[76px] rounded-2xl' />
                </View>

                {/* side color tags */}
                <View className='absolute h-full'>
                    {Clubs[title].tags.length === 0 ? <View className='absolute border-l-4 border-neutral-300/75 w-full h-full' /> : <></> }

                    {Clubs[title].tags.map((tagName) => {
                        return <View key={tagName} style={{ borderColor: TagDetails[tagName].color, height: (100 / Clubs[title].tags.length) }} className='w-full border-l-4' />
                    } )}
                </View>
            </View>
        </ThemedLink>
    )
}

export default function ClubsListing() {

    const [ searchTerm, setSearchTerm ] = useState('')
    const [ searchFilteredClubs, setSearchFilteredClubs ] = useState<ClubDetails>(Clubs)

    return (
        <View className='w-full h-full'>
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
                            <ThemedView className='flex w-full h-full justify-center'>
                                <Image source={PHOTOS[index]} className='w-full h-full rounded-lg' />
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
                <View className='gap-2'>
                    {/* <Text>{JSON.stringify(searchFilteredClubs)}</Text> */}
                    {Object.entries(searchFilteredClubs).map(([key, value]) => {
                        return (
                            <ClubCard
                                key={key}
                                title={key}
                                backdrop={value.backdropImg}
                                logo={value.logoImg}
                            />
                        )
                    })}
                </View>

                <Footer />

            </ParallaxScrollView>

            {/* overlayed bottom search bar */}
            <Card className='absolute bottom-0 w-full rounded-t-3xl p-4'>
                <SearchBar
                    searchables={Clubs}
                    placeholder='🔎  Search for Clubs'
                    onChangeText={setSearchTerm}
                    onFilterOutput={setSearchFilteredClubs}
                    placeholderTextColor={'gray'}
                    className='font-bold text-center text-xl'
                />
            </Card>
        </View>
    );
}