import { View, Text } from 'react-native'

export default function() {
    return (
        <View className='flex items-center'>
            <Text className='text-yellow-600 font-bold'>— This is an app preview. —</Text>
            <Text className='text-neutral-500'>Report bugs, request features, give feedback</Text>
            <Text className='text-neutral-500'>to the <Text className='font-bold'>Computer Science Club.</Text></Text>
            {/* TODO - Add a link to a google form for feedback */}
        </View>
    )
}