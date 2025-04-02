import { Text, type TextProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

type ThemedTextTypes = 'default' | 'title' | 'subtitle'

const baseStyles: { [type in ThemedTextTypes]: string } = {
  default: '',
  title: 'text-[30px] mb-1',
  subtitle: 'text-[22px] mb-1'
}

const basetyleFonts: { [type in ThemedTextTypes]: string } = {
  default: '',
  title: 'RobotoSlab_700Bold',
  subtitle: 'RobotoSlab_700Bold'
}

export interface ThemedTextProps extends TextProps {
  lightColor?: string
  darkColor?: string
  type?: ThemedTextTypes
}

export function ThemedText({ lightColor, darkColor, className, style, type = 'default', ...rest }: ThemedTextProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <Text className={`${baseStyles[type]} ${textColor} ${className}`} {...rest} style={[style, { fontFamily: basetyleFonts[type] }]}/>
  )
}