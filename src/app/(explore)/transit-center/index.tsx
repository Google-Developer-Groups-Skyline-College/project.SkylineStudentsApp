import { View, Text, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import HorizontalRule from '@/components/HorizontalRule'
import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import LinkWrap from '@/components/LinkWrap'
import Image from '@/components/Image'

const width = Dimensions.get('window').width

const PHOTOS = [
    require('$/images/decoratives/transit-center/transit-center.webp'),
    require('$/images/decoratives/transit-center/skyline-shuttle.webp'),
    require('$/images/decoratives/transit-center/samtrans-route-121.webp'),
    require('$/images/decoratives/transit-center/transit-center.webp'),
    require('$/images/decoratives/transit-center/samtrans-route-sky.webp'),
]

export default function TransitCenter() {
    return (
        <ParallaxScrollView
            headerImage={
                <Carousel
                    width={width + 1}
                    height={width / 2}
                    data={PHOTOS}

                    loop
                    autoPlay
                    autoPlayInterval={4000}
                    scrollAnimationDuration={4000}

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
            <ThemedView className='flex gap-1'>
                <ThemedText type='title'>The Transit Center</ThemedText>
                <HorizontalRule />
                <ThemedText>This section provides information on the available transit connections at the Skyline College Transit Center.</ThemedText>
                <View className='flex flex-row'>
                    <ThemedText>Find the <ThemedText className='font-bold'>Transit Center</ThemedText> south of</ThemedText>
                    <Image source={require('$/images/icons/building.svg')} contentFit='contain' tintColor='#0ea5e9' className='w-[26px] h-full' />
                    <ThemedText className='text-[#0ea5e9]'>Building 3.</ThemedText>
                </View>

                <View className='flex gap-1'>
                    <ThemedText type='subtitle'>Transit Options</ThemedText>
                    <HorizontalRule />

                    <View className='flex gap-2 py-2'>

                        <LinkWrap href='/(explore)/transit-center/shuttle' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#CC4040]/50' darkColor='border-[#CC4040]'>
                            <Image source={require('$/images/decoratives/transit-center/skyline-shuttle.webp')} className='w-full h-full'></Image>

                            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
                                colors={['#420000FF', '#DB3131FF']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
                                <Image source={require('$/images/icons/shines.webp')} tintColor='#FFFFFF17' className='absolute w-32 h-32' />
                            </LinearGradient>

                            <View className='absolute bottom-1 px-2'>
                                <View className='flex flex-row items-center gap-x-2'>
                                <Image source={require('$/images/icons/shines.webp')} tintColor='#FFF' className='w-4 h-4' />
                                <Text
                                    className='text-white text-xl leading-tight'
                                    style={{fontFamily: 'Inter_700Bold'}}
                                >The Skyline College Shuttle</Text>
                                </View>
                                <Text
                                    className='text-neutral-300 text-sm leading-tight'
                                    style={{fontFamily: 'Inter_400Regular'}}
                                >Free, Hourly, Directly to and from Daly City BART</Text>
                            </View>
                        </LinkWrap>

                        <HorizontalRule />

                        <LinkWrap href='https://skylinecollege.edu/maps/shuttle.php' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#CC9B40FF]/50' darkColor='border-[#CC9B40FF]'>
                            <Image source={require('$/images/decoratives/transit-center/samtrans-route-sky.webp')} className='w-full h-full'></Image>

                            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
                                colors={['#422D00FF', '#CCA040FF']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
                                <Image source={require('$/images/icons/shines.webp')} tintColor='#FFFFFF17' className='absolute w-32 h-32' />
                            </LinearGradient>

                            <View className='absolute bottom-1 px-2'>
                                <View className='flex flex-row items-center gap-x-2'>
                                <FontAwesome6 name='bus' color='white' size={16} />
                                <Text
                                    className='text-white text-xl leading-tight'
                                    style={{fontFamily: 'Inter_700Bold'}}
                                >SamTrans Route SKY</Text>
                                </View>
                                <Text
                                    className='text-neutral-300 text-sm leading-tight'
                                    style={{fontFamily: 'Inter_400Regular'}}
                                >Daly City BART - Skyline College</Text>
                            </View>
                        </LinkWrap>



                        <LinkWrap href='https://skylinecollege.edu/maps/shuttle.php' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#4078CC]/50' darkColor='border-[#4078CC]/50'>
                            <Image source={require('$/images/decoratives/transit-center/samtrans-route-141.webp')} className='w-full h-full'></Image>

                            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
                                colors={['#000F42FF', '#4071CC']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
                                <Image source={require('$/images/icons/shines.webp')} tintColor='#FFFFFF17' className='absolute w-32 h-32' />
                            </LinearGradient>

                            <View className='absolute bottom-1 px-2'>
                                <View className='flex flex-row items-center gap-x-2'>
                                <FontAwesome6 name='bus' color='white' size={16} />
                                <Text
                                    className='text-white text-xl leading-tight'
                                    style={{fontFamily: 'Inter_700Bold'}}
                                >SamTrans Route 141</Text>
                                </View>
                                <Text
                                    className='text-neutral-300 text-sm leading-tight'
                                    style={{fontFamily: 'Inter_400Regular'}}
                                >Airport/Linden - Skyline College</Text>
                            </View>
                        </LinkWrap>



                        <LinkWrap href='https://skylinecollege.edu/maps/shuttle.php' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#4078CC]/50' darkColor='border-[#4078CC]'>
                            <Image source={require('$/images/decoratives/transit-center/samtrans-route-121.webp')} className='w-full h-full'></Image>

                            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
                                colors={['#000F42FF', '#4071CC']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
                                <Image source={require('$/images/icons/shines.webp')} tintColor='#FFFFFF17' className='absolute w-32 h-32' />
                            </LinearGradient>

                            <View className='absolute bottom-1 px-2'>
                                <View className='flex flex-row items-center gap-x-2'>
                                <FontAwesome6 name='bus' color='white' size={16} />
                                <Text
                                    className='text-white text-xl leading-tight'
                                    style={{fontFamily: 'Inter_700Bold'}}
                                >SamTrans Route 121</Text>
                                </View>
                                <Text
                                    className='text-neutral-300 text-sm leading-tight'
                                    style={{fontFamily: 'Inter_400Regular'}}
                                >Pope/Bellevue - Skyline College</Text>
                            </View>
                        </LinkWrap>

                    </View>
                </View>

            </ThemedView>
        </ParallaxScrollView>
    )
}