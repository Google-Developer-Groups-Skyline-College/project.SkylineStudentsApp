import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { Stack } from 'expo-router'
import { View } from 'react-native'

import { useLocalSearchParams } from 'expo-router';
import { Image as ExpoImage } from 'expo-image'

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