import { View, Text, Pressable } from 'react-native'
import { ReactNode, useState } from 'react'

import Feather from '@expo/vector-icons/Feather';

import { TagDetails } from '@/constants/Tags';

function TagButton({ tagName }: { tagName: string }): ReactNode {
    return (
        <Pressable style={{backgroundColor: TagDetails[tagName].color}} className={`flex flex-row items-center px-4 py-1 gap-x-1 rounded-full`}>
            {TagDetails[tagName].icon}
            <Text className='font-bold text-white '>{tagName}</Text>
        </Pressable>
    )
}

export default function FilterSelector() {

    const [ filterList, setFilterList ] = useState(Array<string>)
    const [ showList, setShowList ] = useState(false)

    function toggleFilter(filter: string) {
        const found = filterList.findIndex((element) => element == filter)
        if (found) {
            filterList.splice(found, 1)
        }
    }

    return (
        <View className='flex flex-row gap-2'>
            <Pressable onPress={() => {setShowList(!showList)}} className='flex flex-row gap-1 items-center rounded-full bg-neutral-600 px-4 py-1'>
                <Feather name='filter' size={18} color='white' />
                <Text className='font-bold text-white'>Filter</Text>
            </Pressable>
            <View className={(showList ? '' : 'hidden') + ' flex flex-row gap-2'}>
                {<TagButton tagName='STEM' />}
                {<TagButton tagName='Hobby' />}
                {<TagButton tagName='Cultural' />}
            </View>
        </View>
    )
}