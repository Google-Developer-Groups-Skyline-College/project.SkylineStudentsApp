/*

    ReturnHome

    Footer section shortcut for pages and deeper links to return to Home(for now).

*/

import { Text, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { Link } from 'expo-router'

import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ReturnHome() {
    return (
        <View className='pb-16 gap-4'>
            <View className='flex flex-row justify-center w-full gap-2 pt-2'>
                <FontAwesome name="home" size={24} color="white" />
                <ThemedText className='text-center font-semibold'>
                    <Link href={'/'}>Return to Home</Link>
                </ThemedText>
            </View>

            <View className='flex items-center'>
                <Text className='text-yellow-600 font-bold'>— This is an app preview. —</Text>
                <Text className='text-neutral-500'>Report bugs, request features, give feedback</Text>
                <Text className='text-neutral-500'>to the <Text className='font-bold'>Computer Science Club.</Text></Text>
                {/* TODO - Add a link to a google form for feedback */}
            </View>
        </View>
    )
}