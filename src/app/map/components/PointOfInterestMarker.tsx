import { Pressable, View, Text } from 'react-native'

// import Ionicons from '@expo/vector-icons/Ionicons'

import { PointOfInterest } from '..'
import { useEffect, useState } from 'react'

export interface PointOfInterestMarkerProps {
    feature: PointOfInterest
    onPressed: (feature: PointOfInterest) => void
    enlarge: boolean
}

export function PointOfInterestMarker({ feature, onPressed, enlarge = false }: PointOfInterestMarkerProps) {

    const [ fadeIn, setFadeIn ] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true)
        }, Math.random() * 200)
    }, [])

    return (
        <Pressable className={`flex flex-row justify-center active:opacity-50 transition-all duration-700 ${fadeIn ? 'opacity-100 mx-0' : 'opacity-0 -mx-40'}`} onPress={() => {onPressed(feature)}}>
            <View className='px-2 py-1 rounded-xl bg-neutral-900/75'>
                <Text className={`${enlarge ? 'text-xl' : 'text-md'} transition-all text-white`}>{feature.name}</Text>
            </View>
        </Pressable>
    )
}