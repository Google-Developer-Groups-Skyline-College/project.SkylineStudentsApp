import { useState } from 'react'
import { TouchableHighlight, View } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import MediaModal, { MediaModelContent } from '@/components/MediaModal'
import { LinkWrap } from '@/components/LinkWrap'
import { Image } from '@/components/Image'

export default function TransitCenter() {
    const [ modalContent, setModalContent ] = useState<MediaModelContent>()

    return (
        <>
            <MediaModal animatePin maxZoom={3} content={modalContent} />
            <ParallaxScrollView
                headerImage={
                    <Image source={require('$/images/decoratives/transit-center/skyline-shuttle.webp')} className='w-full h-full' />
                }
            >
                
                <ThemedView className='flex gap-1'>
                    <ThemedText type='title'>Skyline College Shuttle</ThemedText>
                    <HorizontalRule />
                    <ThemedText>This section provides information on the free Skyline College Shuttle Service.</ThemedText>
                    <ThemedText>The <ThemedText className='font-bold'>Shuttle</ThemedText> has 3 stops: one at <ThemedText className='font-bold'>Daly City BART</ThemedText>, and two at <ThemedText className='font-bold'>Skyline College.</ThemedText></ThemedText>

                    <ThemedText type='subtitle'>Skyline College Stops</ThemedText>
                    <HorizontalRule />
                    <ThemedText className='font-bold' lightColor='bg-orange-100 text-orange-950' darkColor='bg-orange-950 text-orange-100'>⚠️ The Shuttle only stays at these stops for 2-3 minutes. Consider showing up 5 minutes before.</ThemedText>
                    <ThemedText>At Skyline College, the Shuttle drops-off & picks-up between these stops 5 minutes between each other.</ThemedText>

                    <View className='flex flex-row'>
                        <ThemedText>The first Skyline College stop is south of</ThemedText>
                        <Image source={require('$/images/icons/building.svg')} contentFit='contain' tintColor='#0ea5e9' className='w-[26px] h-full' />
                        <ThemedText className='text-[#0ea5e9]'>Building 3.</ThemedText>
                    </View>

                    <TouchableHighlight onPress={() => {setModalContent({
                        source: require('$/images/decoratives/transit-center/skyline-shuttle-stop-b3-south.webp'),
                        mediaType: 'image'
                    })}}>
                        <Image source={require('$/images/decoratives/transit-center/skyline-shuttle-stop-b3-south.webp')} className='w-full h-44 rounded-xl' />
                    </TouchableHighlight>

                    <View className='flex flex-row'>
                        <ThemedText>The second Skyline College stop is north of</ThemedText>
                        <Image source={require('$/images/icons/building.svg')} contentFit='contain' tintColor='#0ea5e9' className='w-[26px] h-full' />
                        <ThemedText className='text-[#0ea5e9]'>Building 4.</ThemedText>
                    </View>

                    <TouchableHighlight onPress={() => {setModalContent({
                        source: require('$/images/decoratives/transit-center/skyline-shuttle-stop-b4-north.webp'),
                        mediaType: 'image'
                    })}}>
                        <Image source={require('$/images/decoratives/transit-center/skyline-shuttle-stop-b4-north.webp')} className='w-full h-44 rounded-xl' />
                    </TouchableHighlight>

                    <Image>

                    </Image>

                    

                </ThemedView>
            </ParallaxScrollView>
        </>
    )
}