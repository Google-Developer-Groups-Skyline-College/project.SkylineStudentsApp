import { View } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedViewProps } from './ThemedView'

export function Card({ lightColor, darkColor, className, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'cardBackground')

  return <View className={`overflow-hidden ${className} ${backgroundColor}`} {...otherProps} />
}
