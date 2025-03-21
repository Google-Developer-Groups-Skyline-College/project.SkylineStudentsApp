import { View } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedViewProps } from './ThemedView'

export default function ThemedView({ lightColor, darkColor, className, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'cardBackground')

  return <View className={`${className} ${backgroundColor}`} {...otherProps} />
}
