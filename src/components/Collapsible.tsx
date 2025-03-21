import Ionicons from '@expo/vector-icons/Ionicons'
import { PropsWithChildren, ReactNode, useState } from 'react'
import { TouchableOpacity, useColorScheme } from 'react-native'

import ThemedView from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'

export default function Collapsible({ children, header, defaultOpen = false }: PropsWithChildren & { header: ReactNode, defaultOpen?: boolean }) {
  const [ isOpen, setIsOpen ] = useState(defaultOpen)
  const theme = useColorScheme() ?? 'light'

  return (
    <ThemedView>
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
      {isOpen && <ThemedView>{children}</ThemedView>}
    </ThemedView>
  )
}
