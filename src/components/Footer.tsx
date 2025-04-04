import { View, Text } from 'react-native'
import { LinkWrap } from './LinkWrap'

export function Footer() {

    {/* TODO - Add a link to a google form for feedback */}

    return (
        <View className='flex items-center pt-4 pb-16'>
            <Text className='text-yellow-700 font-bold'>— This is an app preview build. —</Text>
            <Text className='text-neutral-500'>Report bugs, request features, give feedback</Text>
            <Text className='text-neutral-500'>to <Text className='font-bold'>the GDGoC Skyline College Chapter.</Text></Text>
            <LinkWrap href='/'>
                <Text className='text-sky-700 font-bold'>Stuck? Press Here to Return Home</Text>
            </LinkWrap>
        </View>
    )
}