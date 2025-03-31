import { View } from 'react-native'
import Icon, { iconNames } from 'react-native-ico-emojione-emojis'

export function Emoji({ name, size = 20 }: { name: iconNames, size?: number }) {
    return (
        <View className='flex items-center justify-center'>
            <Icon name={name} height={size} width={size} />
        </View>
    )
}