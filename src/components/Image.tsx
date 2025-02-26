import { Image } from 'expo-image'
import { cssInterop } from 'nativewind'

cssInterop(Image, { className: "style" })

export default function({...props}) {
    return (
        <Image {...props}></Image>
    )
}