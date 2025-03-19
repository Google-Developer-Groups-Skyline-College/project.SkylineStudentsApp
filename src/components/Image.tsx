import { Image as ExpoImage } from 'expo-image'
import { cssInterop } from 'nativewind'

cssInterop(ExpoImage, { className: 'style' })

const SOURCE_FALLBACK = require('$/images/missing.jpg')
const SOURCE_PLACEHOLDER = require('$/images/placeholder.png')

export default function Image({source = SOURCE_FALLBACK, ...props}) {
    return <ExpoImage
        source={source}
        placeholder={SOURCE_PLACEHOLDER}
        placeholderContentFit='contain'
        {...props}
    />
}

// import { Image as NativeImage, ImageSourcePropType } from 'react-native'
// import { Image as ExpoImage, ImageSource } from 'expo-image'

// import { cssInterop } from 'nativewind'

// cssInterop(ExpoImage, { className: 'style' })

// const SOURCE_FALLBACK = require('$/images/missing.jpg')

// export default function Image({className, source = SOURCE_FALLBACK, native, ...props}: { className: string, source: ImageSourcePropType | ImageSource | string, native?: boolean } & ExpoImage) {
//     if (native) {
//         return <NativeImage source={source as ImageSourcePropType} className={className} {...props} />
//     }
//     return <ExpoImage source={source as ImageSource} className={className} {...props} />
// }