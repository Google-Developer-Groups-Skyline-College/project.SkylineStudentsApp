import Collapsible from '@/components/Collapsible'

import { ReactNode, useEffect, useState } from 'react'
import { View } from 'react-native'

export interface DateItem<ItemType> {
    date: string
    item: ItemType
}

export interface DatedListProps<ItemType> {
    datedItems: DateItem<ItemType>[]
    itemComponent: (value: ItemType, index: number, array: ItemType[]) => ReactNode
    headerComponent: (title: string) => ReactNode
    className: string
}

export default function DatedList<ItemType>({ datedItems, itemComponent, className, headerComponent }: DatedListProps<ItemType>) {

    interface DatedItemSections {
        [date: string]: ItemType[]
    }

    const [ dateItemSections, setDateItemSections ] = useState<DatedItemSections>({})

    useEffect(() => {
        if (!datedItems || datedItems.length === 0) return

        let currentDate: string = datedItems[0].date
        let collectedDateItemSections: DatedItemSections = { [currentDate]: [] }

        for (let dateItem of datedItems) {
            if (currentDate !== dateItem.date) {
                currentDate = dateItem.date
                collectedDateItemSections[currentDate] = [dateItem.item]
            } else {
                collectedDateItemSections[currentDate].push(dateItem.item)
            }
        }

        setDateItemSections(collectedDateItemSections)
    }, [datedItems])

    return (
        <View>
            {
                dateItemSections && Object.keys(dateItemSections).map((key, index) => (
                    <Collapsible header={headerComponent(key)} key={index} defaultOpen>
                        <View className={className}>{dateItemSections[key].map(itemComponent)}</View>
                    </Collapsible>
                ))
            }
        </View>
    )
}