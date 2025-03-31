// todo:
// soon add orientation unlock when open

import { useEffect, useState } from 'react'
import { Pressable, View, Text } from 'react-native'

import Modal from 'react-native-modal'

import { ReactNativeZoomableView, ReactNativeZoomableViewProps } from '@openspacelabs/react-native-zoomable-view'

import Feather from '@expo/vector-icons/Feather'

import Video from './Video'
import Image from './Image'

export interface MediaModelContent {
    source: string
    mediaType: 'image' | 'video'
    caption?: string
}

interface MediaModalProps extends ReactNativeZoomableViewProps {
    content?: MediaModelContent
}

export default function MediaModal({ content, ...otherProps }: MediaModalProps) {
    const [ modalVisible, setModalVisible ] = useState(false)

    // useEffect(() => {
    //     navigation.addListener("focus", () => {
    //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
    //     })

    //     navigation.addListener("blur", () => {
    //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    //     })
    // }, [navigation])

    useEffect(() => {
        if (content) {
            setModalVisible(true)
        }
    }, [content])

    return <Modal style={{ margin: 4 }} isVisible={modalVisible} onBackButtonPress={() => setModalVisible(false)}>

        <Pressable onPress={() => setModalVisible(false)} className='active:opacity-50 transition-all'>
            <Feather name='x' color={'white'} size={32}></Feather>
        </Pressable>

        { content &&
        <ReactNativeZoomableView {...otherProps}>
            <Pressable className='absolute w-full h-full' onPress={() => setModalVisible(false)} />

            { content.mediaType === 'image' &&
            <View className='w-full aspect-video'>
                <Image
                    source={content.source}
                    blurRadius={8}
                    className='absolute w-full h-full rounded-xl'
                />
                <Image
                    source={content.source}
                    allowDownscaling={false}
                    contentFit='contain'
                    className='w-full h-full rounded-xl'
                />
            </View>
            }

            { content.mediaType === 'video' && 
            <Video
                source={content.source}
                className='w-full aspect-video rounded-xl'
                setup={player => {
                    player.loop = true
                    player.play()
                }}
            />
            }

            { content.caption &&
            <Text className='text-white p-2'>{content.caption}</Text>
            }
        </ReactNativeZoomableView>
        }
    </Modal>
}