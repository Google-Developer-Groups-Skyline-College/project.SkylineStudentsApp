import { Text } from 'react-native'
import { LinkWrap } from './LinkWrap'
import { ThemedView } from './ThemedView'

export function Footer() {

    {/* TODO - Add a link to a google form for feedback */}

    return (
        <ThemedView className='flex items-center pt-4 pb-16'>
            <Text className='text-orange-400 font-bold'>— This is an in-dev concept build. —</Text>
            <Text className='text-neutral-500'>Report bugs, request features, and give feedback</Text>
            <Text className='text-neutral-500'>to <Text className='font-bold'>the GDGoC Skyline College Chapter.</Text></Text>
            <LinkWrap href='/'>
                <Text className='text-sky-700 font-bold'>Stuck? Press Here to Return Home</Text>
            </LinkWrap>
        </ThemedView>
    )
}