import { Image } from 'expo-image'

import { useColorScheme } from '@/hooks/useColorScheme'

import ThemedView from './ThemedView'

export default function LoadingScreen() {
    const colorScheme = useColorScheme() ?? 'light'

    return (
        <ThemedView className='absolute flex items-center justify-center w-full h-full'>
            <Image source={require('$/images/loading-ripple.webp')} className='opacity-50 w-[200px] h-[200px]' />
            <Image source={require('$/images/mono-icon.png')} tintColor={colorScheme === 'light' ? '#000000' : ''} className='absolute w-[500px] h-[500px] opacity-5' />
            <Image source={require('$/images/mono-icon.png')} tintColor={colorScheme === 'light' ? '#656565' : ''} className='absolute w-[100px] h-[100px]' />
        </ThemedView>
    )
}
