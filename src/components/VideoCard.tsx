import { ThemedViewProps } from './ThemedView'
import { Image } from './Image'
import { Card } from './Card'

interface VideoCardProps extends ThemedViewProps {
    source: string
}

export default function VideoCard({ source, ...otherProps }: VideoCardProps) {
    return <Card {...otherProps}>
        <Image source={source} className='w-full h-full'></Image>
        <Image source={require('$/images/videocard.player-overlay.webp')} contentFit='contain' className='absolute w-full h-full'></Image>
    </Card>
}