import { View, PixelRatio, useColorScheme } from 'react-native'
import invert from 'invert-color'

const pixelRatio = 1 / PixelRatio.get()

export function HorizontalRule({ height = 1, color = '#EEE' }) {
    const theme = useColorScheme()
    if (theme === 'light')
        color = invert(color)

    return <View className='w-full' style={{
        height: pixelRatio * height,
        backgroundColor: color
    }} />
}