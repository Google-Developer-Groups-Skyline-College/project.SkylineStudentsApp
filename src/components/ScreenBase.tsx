import React, { ReactElement, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { ThemedView, ThemedViewProps } from './ThemedView'
import { ThemedText } from './ThemedText'
import { Image } from './Image'

import Animated, { useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated'

export interface ScreenBaseProps extends ThemedViewProps {
    title: string
    subtitle: string
    backdrop: number | ReactElement
    disableScrolling?: boolean
    height?: number
}

export function ScreenBase({ title, subtitle, backdrop, className, disableScrolling = false, height = 220, children }: ScreenBaseProps) {

    const backdropHeight = useSharedValue(120)
    const backdropAnimatedStyle = useAnimatedStyle(() => {
        return { height: backdropHeight.value }
    })

    useEffect(() => {
        setTimeout(() => {
            backdropHeight.value = withSpring(height)
        }, 100)
    })

    const content = (
        <>
            <Animated.View style={backdropAnimatedStyle} className='flex w-full justify-end'>

                {typeof(backdrop) === 'number' ? <Image source={backdrop} className='absolute w-full h-[110%] top-0 object-cover' /> : backdrop}

                {/* overlays on image */}
                <LinearGradient
                    className='absolute w-full h-[110%] top-0'
                    colors={['#000000', '#FFFFFF00']} start={{ x: -0.05, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                />

                <Image source={require('$/images/skyline-college-logo.png')} width={100} height={40} resizeMode='contain' className='absolute w-32 h-12 object-cover right-0 top-0 mt-8 mr-4'></Image>

                <View className='flex flex-col p-4'>
                    <View className='flex flex-row gap-x-2'>
                        <ThemedText
                            className='text-white leading-tight'
                            type='title'
                            style={{ textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32 }}>
                            {title}
                        </ThemedText>
                    </View>

                    <View className='flex flex-row gap-x-2'>
                        <Text
                            className='text-white text-xl leading-tight'
                            style={{ textShadowColor: 'rgba(0, 0, 0, 1)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 32 }}>
                            {subtitle}
                        </Text>
                    </View>
                </View>

            </Animated.View>

            <ThemedView className={`rounded-t-3xl p-4 ${className}`}>
                {children}
            </ThemedView>
        </>
    )

    if (disableScrolling) {
        return <View>{content}</View>
    }
    return (
        <ScrollView showsVerticalScrollIndicator>{content}</ScrollView>
    )
}