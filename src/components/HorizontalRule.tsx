import { View, PixelRatio } from 'react-native'

const SINGLE_PIXEL_HEIGHT_STYLE = { height: 1 / PixelRatio.get() }

export default function HorizontalRule() {
    return <View className='w-full bg-neutral-500' style={SINGLE_PIXEL_HEIGHT_STYLE} />
}