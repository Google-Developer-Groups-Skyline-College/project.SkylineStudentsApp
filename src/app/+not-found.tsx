//
// +not-found.tsx
//
// A special directory shown when navigator tries accessing a missing or out-of-scope route.
// This should only occur in rare circumstances in production due to missing data.
//

import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import Footer from '@/components/Footer'
import Image from '@/components/Image'

import { useColorScheme } from '@/hooks/useColorScheme'

export default function NotFoundScreen() {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <ThemedView className='flex-1 justify-center items-center p-5 gap-4'>
      <Image source={require('$/images/mono-icon.png')} tintColor={colorScheme === 'light' ? '#000000' : ''} width={500} height={500} className='absolute opacity-5' />
        <ThemedText type='title'>This page doesn't exist.</ThemedText>
      <Footer />
    </ThemedView>
  )
}
