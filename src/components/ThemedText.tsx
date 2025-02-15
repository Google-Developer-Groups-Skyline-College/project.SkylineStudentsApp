import { Text, type TextProps, StyleSheet } from 'react-native';

import { useColorScheme } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  flipContrast?: boolean;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  className,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
    className={`${styles[type]} ${useColorScheme() === 'dark' ? 'text-white' : 'text-black'} ${className}`}
      {...rest}
    />
  );
}

// TODO consider removing default styling type

const styles = {
  default: 'text-base leading-6',
  title: 'text-[32px] font-bold leading-10',
  subtitle: 'text-2xl font-bold'
}