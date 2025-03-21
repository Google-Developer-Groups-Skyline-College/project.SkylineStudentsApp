import { Text, type TextProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export interface ThemedTextProps extends TextProps {
  lightColor?: string
  darkColor?: string
  disableColorScheme?: boolean
  type?: 'default' | 'title' | 'subtitle'
}

const baseStyles: { [type: string]: string } = {
  default: '',
  title: 'text-[32px] font-bold',
  subtitle: 'text-[18px] font-bold'
}

export default function ThemedText({ lightColor, darkColor, className, type = 'default', ...rest }: ThemedTextProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <Text className={`${baseStyles[type]} ${textColor} ${className}`} {...rest}/>
  )
}
