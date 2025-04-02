// todo:
// soon add orientation unlock when open
import { useEffect, useCallback } from 'react'
import { Pressable, View, Text } from 'react-native'

import * as ScreenOrientation from 'expo-screen-orientation'

import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'

import { ModalComponentProp } from 'react-native-modalfy'

import Feather from '@expo/vector-icons/Feather'

import { StatusBar } from 'expo-status-bar'
import { Video } from '../Video'
import { Image } from '../Image'

export interface MediaModelContent {
    modal: {
        source: string
        mediaType: 'image' | 'video'
        caption?: string
    }
}

export function MediaModal({ modal: { addListener, closeModal, getParam } }: ModalComponentProp<MediaModelContent>) {

    const source = getParam('source')
    const mediaType = getParam('mediaType')
    const caption = getParam('caption')

    function dismiss() {
        closeModal()
    }

    const handleClose = useCallback(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }, [])

    useEffect(() => {
        addListener('onClose', handleClose)
    })

    useEffect(() => {
        if (source) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
        }
    }, [source])

    return (
        <>
            <StatusBar hidden/>
            <View className='w-full h-full'>
                { source &&
                <ReactNativeZoomableView maxZoom={4}>
                    <Pressable className='absolute w-full h-full' onPress={dismiss} />

                    { mediaType === 'image' &&
                    <View className='w-full aspect-video'>
                        {/* blur backdrop for non-16:9 media */}
                        <Image
                            source={source}
                            blurRadius={8}
                            className='absolute w-full h-full rounded-xl'
                        />
                        <Image
                            source={source}
                            allowDownscaling={false}
                            contentFit='contain'
                            className='w-full h-full rounded-xl'
                        />
                    </View>
                    }

                    { mediaType === 'video' &&
                    <Video
                        source={source}
                        className='w-full aspect-video rounded-xl'
                        setup={player => {
                            player.loop = true
                            player.play()
                        }}
                    />
                    }

                    { caption &&
                    <Text className='text-white p-2'>{caption}</Text>
                    }
                </ReactNativeZoomableView>
                }

                <Pressable onPress={dismiss} className='absolute h-full active:opacity-50 transition-all'>
                    <Feather name='x' color={'white'} size={32} />
                </Pressable>

            </View>
        </>
    
    )
}