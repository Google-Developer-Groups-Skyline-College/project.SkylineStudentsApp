import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { Stack } from 'expo-router'
import { View } from 'react-native'

import { useLocalSearchParams } from 'expo-router';
import { Image as ExpoImage } from 'expo-image'
import { cssInterop } from "nativewind";

import { Clubs } from '@/constants/Clubs';

export default function ClubDetails() {
    const { id } : { id: string } = useLocalSearchParams()
    const clubDetails = Clubs[id]

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#FF5454FF', dark: '#740101FF' }}
            headerImage={
                <ExpoImage 
                    source={clubDetails.backdropImg}
                    contentFit='cover'
                    style={{ width: '100%', height: '114%' }}
                />
            }
        >
            <View className='flex items-center gap-2'>
                <ExpoImage source={clubDetails.logoImg} style={{ width: 64, height: 64, borderRadius: 9999 }} />
                <ThemedText type='title' className='text-center pt-1'>{id}</ThemedText>
                <ThemedText>{clubDetails.description}</ThemedText>

                <View className='flex flex-col w-full gap-4'>
                    <View>
                        <ThemedText type='subtitle'>Meetings</ThemedText>
                        <ThemedText>📍 Building 7, Room 7-324</ThemedText>
                        <ThemedText>🕒 1:10 PM - 2:10 PM</ThemedText>
                    </View>
                    <View>
                        <ThemedText type='subtitle'>Contact</ThemedText>
                        <ThemedText>Email Us</ThemedText>
                    </View>
                    <View>
                        <ThemedText type='subtitle'>Gallery</ThemedText>
                        <View className='flex flex-row w-full gap-x-2 h-64'>
                            <ExpoImage source={require('$/images/clubs/photos/computer_science_club/sfhacks.jpg')} className='w-[50%] h-32' />
                            <ExpoImage source={require('$/images/bobaSocial.jpg')} className='w-[50%] h-32' />
                        </View>
                    </View>
                </View>

            </View>

            {/* removes unnecessary and redundant title on the top header */}
            <Stack.Screen
                options={{
                    title: '',
                }}
            />
        </ParallaxScrollView>
    )
}