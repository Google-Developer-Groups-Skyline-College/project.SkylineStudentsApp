import ThemedView from './ThemedView'
import Image from './Image'

import { useColorScheme } from '@/hooks/useColorScheme'

export default function LoadingScreen() {
    const colorScheme = useColorScheme() ?? 'light'

    return (
        <ThemedView className='z-50 absolute flex items-center justify-center w-full h-full'>
            <Image source={require('$/images/loadingRipple.webp')} width={200} height={200} className='opacity-50' />
            <Image source={require('$/images/monoIcon.png')} tintColor={colorScheme === 'light' ? '#000000' : ''} width={500} height={500} className='absolute opacity-5' />
            <Image source={require('$/images/monoIcon.png')} tintColor={colorScheme === 'light' ? '#656565' : ''} width={100} height={100} className='absolute' />
        </ThemedView>
    )
}