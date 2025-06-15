
import { ReactElement } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

type ToggleOption = {
    type: 'toggle'
    default: 'enabled' | 'disabled'
}

type ChoiceOption = {
    type: 'choice'
    default: string
    choices: string[]
}

type BaseOption = {
    [key: string]: {
        icon: ReactElement
        name: string
        description: string
    } & (ToggleOption | ChoiceOption)
}

const ICON_SIZE = 16

// AsyncStorage.setItem('class_reminders', 'enabled')
// AsyncStorage.setItem('campus_arrival_greet', 'enabled')
// AsyncStorage.setItem('force_dark_mode', 'disabled')
// AsyncStorage.setItem('automatic_dnd_location', 'disabled')
// AsyncStorage.setItem('automatic_dnd_campus', 'disabled')
// AsyncStorage.setItem('show_experiments', 'enabled')

export const Settings: { [key: string]: BaseOption } = {
    'Notifications': {
        'class_reminders': {
            name: 'Enable Class Reminders',
            description: 'Notifies when one of your classes in "My Schedule" are starting soon.',
            icon: <MaterialCommunityIcons name='bell-alert' size={ICON_SIZE} />,
            type: 'toggle',
            default: 'enabled'
        },
        'campus_arrival_greet': {
            name: 'Campus Arrival Greeting',
            description: 'Welcomes you when you arrive on campus, reminding you to review app insights. Requires location access.',
            icon: <MaterialCommunityIcons name='bell-check' size={ICON_SIZE} />,
            type: 'toggle',
            default: 'enabled'
        },
        'automatic_dnd_classes': {
            name: 'Class Automatic Do-Not-Disturb',
            description: 'Automatically toggles device do-not-disturb when a class in your "My Schedule" starts/ends.',
            icon: <MaterialCommunityIcons name='bell-cancel' size={ICON_SIZE} />,
            type: 'toggle',
            default: 'disabled'
        },
        'automatic_dnd_campus': {
            name: 'Campus Automatic Do-Not-Disturb',
            description: 'Automatically toggles device do-not-disturb when arriving on/leaving campus. Requires location access.',
            icon: <MaterialCommunityIcons name='bell-cancel' size={ICON_SIZE} />,
            type: 'toggle',
            default: 'disabled'
        },
    },
    'App Preferences': {
        'force_dark_mode': {
            name: 'Force Dark Mode',
            description: 'Keep dark mode enabled regardless of device\'s dark mode setting.',
            icon: <MaterialCommunityIcons name='moon-waning-crescent' size={ICON_SIZE} />,
            type: 'toggle',
            default: 'disabled',
        },
    },
    'Experiments': {
        'show_experiments': {
            name: 'Show Homescreen Experiments',
            description: 'Reveals experimental screens on the home page.',
            icon: <MaterialCommunityIcons name='alien' size={ICON_SIZE} />,
            type: 'toggle',
            default: 'enabled',
        },
    }
}
