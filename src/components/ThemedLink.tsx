import { Pressable, PressableProps } from 'react-native'

import { Link, RelativePathString } from 'expo-router'

import { useThemeColor } from '@/hooks/useThemeColor'

export interface ThemedLinkProps extends PressableProps {
  lightColor?: string;
  darkColor?: string;
  href: string | RelativePathString;
}

export default function ThemedLink({ lightColor, darkColor, className, children, href, ...otherProps }: ThemedLinkProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  
  return (
    <Link href={href as RelativePathString} asChild>
      <Pressable className={`${className} ${backgroundColor} opacity-100 active:opacity-80 transition-all`} {...otherProps}>{children}</Pressable>
    </Link>
  )
}

// past attempts lol

// <ThemedView className={`${className}`} style={[{ backgroundColor }]} {...otherProps}>
//       <Link className={'z-10 absolute w-full h-full bg-black opacity-0 active:opacity-50'} href={href}></Link>
//       {children}
//     </ThemedView>


// export function ThemedButton({ lightColor, darkColor, className, href, ...otherProps }: ThemedButtonProps) {
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

//   return <Link className={'bg-red-500 opacity-100 active:opacity-80'} href={href} asChild>
//     <ThemedView className={`${className}`} style={[{ backgroundColor }]} {...otherProps}></ThemedView>
//   </Link>
// }
