// todo:
//     - make so searchables have configurable search property; accept input generic type as searchable

import { useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export interface Searchables {
    name: string
    aliases?: string[]
    tags?: string[]
}

interface SearchBarProps extends TextInputProps {
    searchables: Searchables[]
    onChangeText: (newText: string) => void
    onFilterOutput: Function
}

export default function SearchBar({ searchables, onChangeText, onFilterOutput, className, ...otherProps }: SearchBarProps) {
    const textColor = useThemeColor(null, 'text')

    const [searchTerm, setSearchTerm] = useState('')

    // removes surrounding whitespace and only allows letters and numbers (prevents breaking/escaping of regexp when matching as well)
    function sanitizeSearchTerm(term: string) {
        setSearchTerm(term.trim().replace(/[^\w\s]/gi, ''))
    }

    function processFilterOnSearchables() {
        onChangeText(searchTerm)

        if (searchTerm === '') {
            onFilterOutput(searchables)
        } else {
            const matchedItems: Searchables[] = []
            searchables.map((value) => {
                if (value.name.toLowerCase().match(searchTerm.toLowerCase())) {
                    matchedItems.push(value)
                } else if (value.aliases) {
                    value.aliases.map((alias) => {
                        if (alias.match(searchTerm.toLowerCase())) {
                            matchedItems.push(value)
                        }
                    })
                }
            })

            onFilterOutput(matchedItems)
        }
    }

    return (
        <TextInput
            className={`${className} ${textColor}`}
            autoCapitalize='none'
            onChangeText={sanitizeSearchTerm}
            onBlur={processFilterOnSearchables}
            {...otherProps}
        />
    )
}