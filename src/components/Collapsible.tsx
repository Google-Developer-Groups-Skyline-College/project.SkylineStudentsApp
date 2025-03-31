import { PropsWithChildren, ReactNode, useState } from 'react'
import { TouchableOpacity, useColorScheme } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'

import { Colors } from '@/constants/Colors'

export interface CollapsibleProps extends PropsWithChildren {
  header: ReactNode
  defaultOpen?: boolean
}

export default function Collapsible({ children, header, defaultOpen = false }: CollapsibleProps) {
  const [ isOpen, setIsOpen ] = useState(defaultOpen)
  const theme = useColorScheme() ?? 'light'

  return (
    <>
      <TouchableOpacity
        className='flex flex-row gap-1 items-center'
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}>
        {header}
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
      </TouchableOpacity>
      {isOpen && children}
    </>
  )
}
