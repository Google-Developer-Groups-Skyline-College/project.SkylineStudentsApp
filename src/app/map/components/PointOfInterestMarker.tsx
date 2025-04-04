import { Pressable, View, Text } from 'react-native'

// import Ionicons from '@expo/vector-icons/Ionicons'

import { PointOfInterest } from '..'
import { useEffect, useState } from 'react'

export interface PointOfInterestMarkerProps {
    feature: PointOfInterest
    onPressed: (feature: PointOfInterest) => void
}

export default function PointOfInterestMarker({ feature, onPressed }: PointOfInterestMarkerProps) {

    const [ fadeIn, setFadeIn ] = useState(false)

    useEffect(() => {
        setFadeIn(true)
        // setTimeout(() => {
        //     setFadeIn(true)
        // }, Math.random() * 500)
    }, [])

    return (
        <Pressable className={`flex flex-row justify-center active:opacity-50 transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`} onPress={() => {onPressed(feature)}}>
            <View className='px-2 py-1 rounded-xl bg-neutral-900/75'>
                <Text className='text-white text-sm'>{feature.name}</Text>
            </View>
        </Pressable>
    )
}