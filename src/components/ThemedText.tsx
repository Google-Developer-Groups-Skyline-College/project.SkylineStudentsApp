import { Text, type TextProps } from 'react-native';

import { useColorScheme } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  flipContrast?: boolean;
  disableColorScheme?: boolean;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  lightColor,
  darkColor,
  className,
  disableColorScheme,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={`${baseStyles[type]} ${(!disableColorScheme ? (useColorScheme() === 'dark' ? 'text-white' : 'text-black') : '')} ${className}`}
      {...rest}
    />
  );
}

const baseStyles: { [type: string]: string } = {
  default: 'text-base',
  title: 'text-[32px] font-bold',
  subtitle: 'text-[18px] font-bold',
}