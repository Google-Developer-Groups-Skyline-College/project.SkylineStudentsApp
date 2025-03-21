import { View, type ViewProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export interface ThemedViewProps extends ViewProps {
  lightColor?: string
  darkColor?: string
}

export default function ThemedView({ lightColor, darkColor, className, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return <View className={`${className} ${backgroundColor}`} {...otherProps} />
}
