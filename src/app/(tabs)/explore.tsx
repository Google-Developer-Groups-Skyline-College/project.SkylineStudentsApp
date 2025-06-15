import { useRef, useCallback } from 'react'
import { Text, View, ScrollView } from 'react-native'

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import Octicons from '@expo/vector-icons/Octicons'
import { LinearGradient } from 'expo-linear-gradient'

import { ThemedBottomSheet } from '@/components/ThemedBottomSheet'
import { ScreenBase } from '@/components/ScreenBase'
import { ThemedText } from '@/components/ThemedText'
import { Image } from '@/components/Image'
import { Emoji } from '@/components/Emoji'
import { Card } from '@/components/Card'

function ClubCard({image, title, description}: {image: string, title: string, description: string}) {
    return (
        <Card className="h-32 w-80 rounded-2xl mr-2 bg-neutral-950 overflow-hidden">
            <Image source={image} className='absolute w-full h-full' blurRadius={4} contentFit='cover' />
            <Image source={image} className='w-full h-full bottom-0 opacity-95' contentFit='contain' />
            <LinearGradient
                className='absolute w-full h-full'
                colors={['#000000', '#FFFFFF00']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0.5 }}
            />
            <View className='absolute bottom-0 w-full p-2'>
                <Text className='text-lg text-white font-bold leading-tight' style={{fontFamily: 'Inter_700Bold', textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32}}>{title}</Text>
                <Text className='italic text-neutral-300 leading-tight'>{description}</Text>
            </View>
        </Card>
    )
}

export default function Explore() {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <>
            <ScreenBase
                title='Explore'
                subtitle='Discover your Campus.'
                backdrop={require('$/images/decoratives/explore/3rd-annual-ride-conference-fireside.webp')}
            >
                <View className='flex gap-2'>
                    <View className='flex gap-2'>
                        <View className='flex flex-row gap-x-2'>
                            <Emoji value='📬' />
                            <ThemedText type='subtitle'>Your Interests</ThemedText>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='overflow-visible'>
                            <ClubCard title="Engineering Robotics Club" description="Based on Interest: Business Administration" image={require("$/images/decoratives/clubs/engineering_robotics_club.webp")} />
                            <ClubCard title="Engineering Robotics Club" description="Based on Interest: Business Administration" image={require("$/images/decoratives/clubs/engineering_robotics_club.webp")} />
                        </ScrollView>
                    </View>

                    <View className='flex flex-row gap-x-2'>
                        <Emoji value='📰' />
                        <ThemedText type='subtitle'>Campus News</ThemedText>
                    </View>

                    <View className='flex flex-row gap-x-2'>
                        <Emoji value='🎉' />
                        <ThemedText type='subtitle'>Upcoming Events</ThemedText>
                    </View>

                    <View className='flex flex-row gap-x-2'>
                        <Emoji value='🤝' />
                        <ThemedText type='subtitle'>Student Communities</ThemedText>
                    </View>

                    <View className='flex flex-row gap-x-2'>
                        <Emoji value='📚' />
                        <ThemedText type='subtitle'>Campus Resources</ThemedText>
                    </View>
                </View>

                <View>
                    <View></View>
                    <View></View>
                </View>
            </ScreenBase>
            <ThemedBottomSheet
                ref={bottomSheetRef}
                style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,

                    elevation: 24,
                }}

                onChange={handleSheetChanges}

                index={1}

                enableDynamicSizing={false}
                snapPoints={['10%','22.5%','35%']}
                handleComponent={() => <View className='rounded-t-3xl py-2'>
                    <Octicons name='horizontal-rule' color={'#888'} size={16} className='mx-auto' />
                </View>}
            >
                <BottomSheetView>
                    <View className='h-32 bg-yellow-400'>

                    </View>
                </BottomSheetView>
            </ThemedBottomSheet>
        </>
    )
}