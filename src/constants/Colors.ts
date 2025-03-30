/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FF3737FF'
const tintColorDark = '#FF5959FF'

export const Colors = {
  light: {
    text: 'text-black',
    background: 'bg-white',
    cardBackground: 'bg-neutral-200',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: 'text-white',
    background: 'bg-[#111111]',
    cardBackground: 'bg-neutral-800',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  }
}
