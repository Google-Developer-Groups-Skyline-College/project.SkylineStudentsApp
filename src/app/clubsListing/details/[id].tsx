import { useState } from 'react';

import { Stack, Link, Href } from 'expo-router'
import { View, Text, Pressable } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Image from '@/components/Image';

import { useLocalSearchParams } from 'expo-router';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { TagDetails } from '@/constants/Tags'
import { Clubs } from '@/constants/Clubs'
import Footer from '@/components/Footer';

export default function ClubDetails() {
    const { id } : { id: string } = useLocalSearchParams()
    const clubDetails = Clubs[id]

    const [ showJoinButton, setShowJoinButton ] = useState(false)

    setTimeout(() => {
        setShowJoinButton(true)
    }, 500)

    return (
        <>
            <ParallaxScrollView
                headerImage={
                    <Image
                        source={clubDetails.backdropImg}
                        contentFit='cover'
                        className='relative w-full h-[114%]'
                    />
                }
            >
                <View className='flex items-center gap-2'>
                    <Image source={clubDetails.logoImg} className='absolute w-[76px] h-[76px] rounded-2xl -translate-y-full' />
                    <ThemedText type='title' className='text-center'>{id}</ThemedText>

                    <View className='flex flex-col w-full gap-y-2'>

                        <ThemedText type='subtitle'>Description</ThemedText>

                        <View className='flex flex-col gap-y-2'>
                            <ThemedView darkColor='#262626' lightColor='#EEEEEEFF' className='w-full p-2 rounded-xl'>
                                <ThemedText className='text-[13px] leading-snug'>{clubDetails.description}</ThemedText>
                            </ThemedView>

                            <View className='flex flex-row w-full gap-x-2'>
                                <View className='bg-green-600 w-[49%] p-2 rounded-xl shadow shadow-green-500'>
                                    <ThemedText type='subtitle' className='text-white' disableColorScheme>Meetings</ThemedText>
                                    <Text className='text-white text-sm'>📍 {clubDetails.meetingLocation}</Text>
                                    <Text className='text-white text-sm'>🕒 {clubDetails.meetingTime}</Text>
                                </View>
                                
                                <View className='bg-blue-500 w-[49%] p-2 rounded-xl shadow shadow-blue-500'>
                                    <ThemedText type='subtitle' className='text-white' disableColorScheme>Contact</ThemedText>
                                    <Link href={(clubDetails.contact.includes('@') ? 'mailto:' + clubDetails.contact : clubDetails.contact) as Href}>
                                        <Text className='text-blue-100 font-bold'>
                                            {clubDetails.contact}
                                        </Text>
                                    </Link>
                                </View>
                            </View>
                        </View>

                        <ThemedText type='subtitle'>Socials</ThemedText>

                        <View className='flex flex-row w-full gap-x-[6px]'>
                            {
                                clubDetails.website &&
                                <Link href={clubDetails.website as Href} asChild>
                                    <Pressable className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-green-500 rounded-lg overflow-hidden'>
                                        <MaterialCommunityIcons name='web' size={72} color='white' className='absolute opacity-25'/>
                                        <Text className='text-white font-bold'>Club Website</Text>
                                    </Pressable>
                                </Link>
                            }
                            {
                                clubDetails.instagram &&
                                <Link href={clubDetails.instagram as Href} asChild>
                                    <Pressable className='flex flex-row justify-center items-center gap-x-1 w-[32%] h-8 bg-purple-500 rounded-lg overflow-hidden'>
                                        <MaterialCommunityIcons name='instagram' size={64} color='white' className='absolute opacity-25'/>
                                        <Text className='text-white font-bold'>Instagram</Text>
                                    </Pressable>
                                </Link>
                            }
                            {
                                clubDetails.discord &&
                                <Link href={clubDetails.discord as Href} asChild>
                                    <Pressable className='flex flex-row justify-center items-center w-[32%] h-8 bg-sky-500 rounded-lg overflow-hidden'>
                                        <MaterialCommunityIcons name='discord' size={72} color='white' className='absolute opacity-25'/>
                                        <Text className='text-white font-bold'>Discord</Text>
                                    </Pressable>
                                </Link>
                            }
                        </View>

                        <ThemedText type='subtitle'>Gallery</ThemedText>

                        <View className='flex-1 flex-row flex-wrap justify-between w-full gap-1 h-64 overflow-auto'>
                            <Image source={require('$/images/clubs/photos/computer_science_club/sfhacks.jpg')} className='w-[49.5%] h-32' />
                            <Image source={require('$/images/bobaSocial.jpg')} className='w-[49.5%] h-32' />
                            <Image source={require('$/images/clubs/photos/computer_science_club/sfhacks.jpg')} className='w-[49.5%] h-32' />
                            <Image source={require('$/images/bobaSocial.jpg')} className='w-[49.5%] h-32' />
                        </View>
                    </View>
                </View>

                <Footer />
            </ParallaxScrollView>

            <View className={'absolute w-full bottom-3 transition-all duration-1000 ' + (showJoinButton ? 'px-4 opacity-100' : 'px-32 opacity-0 translate-y-full')}>
                <Text className='text-white text-center text-2xl font-semibold py-1 bg-green-600 shadow shadow-white rounded-lg'>Join Club</Text>
            </View>

            {/* removes unnecessary and redundant title on the top header */}
            <Stack.Screen options={{ title: '' }} />
        </>
    )
}