import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image'
import { ImageProps as NativeImageProps } from 'react-native'
import { cssInterop } from 'nativewind'

const InterOpImage = cssInterop(ExpoImage, { className: 'style' })

const SOURCE_FALLBACK = require('$/images/missing.webp')
const SOURCE_PLACEHOLDER = require('$/images/placeholder.webp')

type ImageProps = ExpoImageProps & NativeImageProps

export default function Image({source = SOURCE_FALLBACK, ...props}: ImageProps) {
    return <InterOpImage
        source={source}
        placeholder={SOURCE_PLACEHOLDER}
        placeholderContentFit='contain'
        transition={{ duration: 500 }}
        {...props}
    />
}

// import { Image as NativeImage, ImageSourcePropType } from 'react-native'
// import { Image as ExpoImage, ImageSource } from 'expo-image'

// import { cssInterop } from 'nativewind'

// cssInterop(ExpoImage, { className: 'style' })

// const SOURCE_FALLBACK = require('$/images/missing.webp')

// export default function Image({className, source = SOURCE_FALLBACK, native, ...props}: { className: string, source: ImageSourcePropType | ImageSource | string, native?: boolean } & ExpoImage) {
//     if (native) {
//         return <NativeImage source={source as ImageSourcePropType} className={className} {...props} />
//     }
//     return <ExpoImage source={source as ImageSource} className={className} {...props} />
// }