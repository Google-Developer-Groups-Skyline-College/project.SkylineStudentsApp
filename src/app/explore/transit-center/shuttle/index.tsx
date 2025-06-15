import { TouchableHighlight, View, Text } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { useModal } from 'react-native-modalfy'

import { ParallaxScrollView } from '@/components/ParallaxScrollView'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { LinkWrap } from '@/components/LinkWrap'
import { Image } from '@/components/Image'

export default function TransitCenter() {
    const { openModal } = useModal()

    return (
        <>
            <ParallaxScrollView
                headerImage={
                    <Image source={require('$/images/decoratives/transit-center/skyline-shuttle.webp')} className='w-full h-full' />
                }
            >
                
                <ThemedView className='flex gap-4'>
                    <View className='flex gap-2'>
                        <View>
                            <ThemedText type='title'>Skyline College Shuttle</ThemedText>
                            <HorizontalRule />
                        </View>
                        
                        <ThemedText>This section provides information on the free Skyline College Shuttle Service, also known as the Express Shuttle.</ThemedText>

                        <ThemedText>The free <ThemedText className='font-bold'>Skyline College Shuttle Service</ThemedText> is open to both students and public members of the community on days when classes are in-session.</ThemedText>

                        <LinkWrap href='https://skylinecollege.edu/maps/shuttle.php' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#CC4040]/50' darkColor='border-[#CC4040]'>
                            <Image source={require('$/images/decoratives/transit-center/skyline-shuttle-sunset-banner.webp')} className='w-full h-full'></Image>

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
                                    >See Service Information & Schedule</Text>
                                </View>
                                <Text
                                    className='text-neutral-300 text-sm leading-tight'
                                    style={{fontFamily: 'Inter_400Regular'}}
                                >Live Service Updates, Frequently Asked Questions</Text>
                            </View>
                        </LinkWrap>

                        <ThemedText>The <ThemedText className='font-bold'>Shuttle</ThemedText> has 3 stops: starting at <ThemedText className='font-bold'>Daly City BART</ThemedText>, with two stops at <ThemedText className='font-bold'>Skyline College.</ThemedText> This route takes, on-average, 15 minutes going to and from campus.</ThemedText>

                        <LinkWrap href='https://maps.app.goo.gl/nqpaoDiC86ZKNt986' className='w-full h-36 rounded-xl overflow-hidden border-2' lightColor='border-[#CC9B40FF]/50' darkColor='border-[#CC9B40FF]'>
                            <Image source={require('$/images/decoratives/transit-center/skyline-shuttle-route-banner.webp')} className='w-full h-full'></Image>

                            <LinearGradient className='absolute flex w-full h-full justify-center items-center opacity-75'
                                colors={['#422D00FF', '#CCA040FF']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0.4 }}>
                                <FontAwesome6 name='route' color='#FFFFFF38' size={128} className='absolute' />
                            </LinearGradient>

                            <View className='absolute bottom-1 px-2'>
                                <View className='flex flex-row items-center gap-x-2'>
                                    <FontAwesome6 name='route' color='white' size={16} />
                                    <Text
                                        className='text-white text-xl leading-tight'
                                        style={{fontFamily: 'Inter_700Bold'}}
                                    >See Shuttle Service Route</Text>
                                </View>
                                <Text
                                    className='text-neutral-300 text-sm leading-tight'
                                    style={{fontFamily: 'Inter_400Regular'}}
                                >Currently Viewable via Google Maps (to Daly City BART)</Text>
                            </View>
                        </LinkWrap>
                    </View>

                    <View className='flex gap-2'>
                        <View>
                            <ThemedText type='subtitle'>Skyline College Stops</ThemedText>
                            <HorizontalRule />
                        </View>
                        <ThemedText className='font-bold rounded-md p-2' lightColor='bg-orange-100 text-orange-950' darkColor='bg-orange-950 text-orange-100'>⚠️ The Shuttle stays at each stop seen below for only 2-3 minutes. Consider showing up at least 5 minutes early.</ThemedText>
                        <ThemedText>The <ThemedText className='font-bold'>Shuttle</ThemedText> drops-off & picks-up between the below stops 5 minutes between each other. If you miss the first stop, you can catch the Shuttle at the second stop.</ThemedText>

                        <View className='flex flex-row'>
                            <ThemedText>The first Skyline College stop is south of</ThemedText>
                            <Image source={require('$/images/icons/building.svg')} contentFit='contain' tintColor='#0ea5e9' className='w-[26px] h-full' />
                            <Text className='text-[#0ea5e9]'>Building 3.</Text>
                        </View>

                        <TouchableHighlight onPress={() => {openModal('MediaModal', {
                            source: require('$/images/decoratives/transit-center/skyline-shuttle-stop-b3-south.webp'),
                            mediaType: 'image'
                        })}}>
                            <Image source={require('$/images/decoratives/transit-center/skyline-shuttle-stop-b3-south.webp')} className='w-full h-44 rounded-xl' />
                        </TouchableHighlight>

                        <View className='flex flex-row'>
                            <ThemedText>The second Skyline College stop is north of</ThemedText>
                            <Image source={require('$/images/icons/building.svg')} contentFit='contain' tintColor='#0ea5e9' className='w-[26px] h-full' />
                            <Text className='text-[#0ea5e9]'>Building 4.</Text>
                        </View>

                        <TouchableHighlight onPress={() => {openModal('MediaModal', {
                            source: require('$/images/decoratives/transit-center/skyline-shuttle-stop-b4-north.webp'),
                            mediaType: 'image'
                        })}}>
                            <Image source={require('$/images/decoratives/transit-center/skyline-shuttle-stop-b4-north.webp')} className='w-full h-44 rounded-xl' />
                        </TouchableHighlight>

                    </View>

                    <View className='flex gap-2'>
                        <View>
                            <ThemedText type='subtitle'>Daly City BART Stop</ThemedText>
                            <HorizontalRule />
                        </View>
                        <ThemedText>The <ThemedText className='font-bold'>Shuttle</ThemedText> drops-off & picks-up at the below stop. It arrives early, staying for about 10 minutes, before heading back to Skyline College.</ThemedText>

                        <TouchableHighlight onPress={() => {openModal('MediaModal', {
                            source: require('$/images/decoratives/transit-center/skyline-shuttle-stop-bart.webp'),
                            mediaType: 'image'
                        })}}>
                            <Image source={require('$/images/decoratives/transit-center/skyline-shuttle-stop-bart.webp')} className='w-full h-44 rounded-xl' />
                        </TouchableHighlight>
                        <ThemedText>This stop is found across the west side of the platform and main bus stops, towards the parking garage. It is located at the end of the public pick-up area strip, on the right side.</ThemedText>
                    </View>



                </ThemedView>
            </ParallaxScrollView>
        </>
    )
}