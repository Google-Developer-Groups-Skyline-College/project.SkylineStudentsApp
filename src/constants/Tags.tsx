import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Entypo from '@expo/vector-icons/Entypo'

import { ReactNode } from 'react'

interface TagProps {
    [key: string]: {
        color: string,
        icon: ReactNode
    }
}

const ICON_SIZE = 18

export const TagDetails: TagProps = {
    ['STEM']: {
        color: '#95DD31FF',
        icon: <MaterialCommunityIcons name='atom-variant' size={ICON_SIZE} color='white' />
    },
    ['Hobby']: {
        color: '#FAA543FF',
        icon: <Entypo name='emoji-happy' size={ICON_SIZE} color='white' />
    },
    ['Cultural']: {
        color: '#8D59E6FF',
        icon: <MaterialCommunityIcons name='party-popper' size={ICON_SIZE} color='white' />
    },
    ['Unsorted']: {
        color: '#4B4B4BFF',
        icon: <MaterialCommunityIcons name='microscope' size={ICON_SIZE} color='white' />
    }
}

