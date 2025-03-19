import { useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export interface Searchables {
    [key: string]: {
        aliases?: string[]
        tags?: string[]
    }
}

interface SearchBarProps extends TextInputProps {
    searchables: Searchables
    onChangeText: (newText: string) => void
    onFilterOutput: Function
}

export default function SearchBar({ searchables, onChangeText, onFilterOutput, className, ...otherProps }: SearchBarProps) {
    const textColor = useThemeColor({}, 'text')

    const [searchTerm, setSearchTerm] = useState('')

    function processFilterOnItems() {
        onChangeText(searchTerm)

        if (searchTerm === '') {
            onFilterOutput(searchables)
        } else {
            const matchedItems: Searchables = {}
            for (let [key, value] of Object.entries(searchables)) {
                if (key.toLowerCase().match(searchTerm.toLowerCase())) {
                    matchedItems[key] = value
                } else {
                    if (value.aliases) {
                        for (let alias of value.aliases) {
                            if (alias.match(searchTerm.toLowerCase())) {
                                matchedItems[key] = value
                            }
                        }
                    }
                }
            }

            onFilterOutput(matchedItems)
        }
    }

    return (
        <TextInput className={`${className} ${textColor}`} onChangeText={(newText: string) => setSearchTerm(newText.trim())} onBlur={processFilterOnItems} {...otherProps} />
    )
}