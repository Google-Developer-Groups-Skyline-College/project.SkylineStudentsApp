import { VideoView, VideoPlayer, useVideoPlayer } from 'expo-video'
import { ViewProps } from 'react-native'

import { cssInterop } from 'nativewind'

const InterOpVideoView = cssInterop(VideoView, { className: 'style'})

interface VideoProps extends ViewProps {
    source: string
    setup?: (player: VideoPlayer) => void
}

export function Video({source, setup, ...otherProps }: VideoProps) {
    const player = useVideoPlayer(source, setup ? (player => setup(player)) : undefined)

    return <InterOpVideoView player={player} {...otherProps} />
}