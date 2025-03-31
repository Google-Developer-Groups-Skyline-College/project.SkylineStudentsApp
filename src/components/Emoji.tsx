import React, { memo } from 'react'
import Image from './Image'

const CDN_ENDPOINT = 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/72x72/'

export interface EmojiProps {
  value: string
  size?: number
}

function Emoji({ value, size = 16 }: EmojiProps) {
  const codePoint = value.codePointAt(0)

  if (!codePoint)
    return <></>

  return (
    <Image
      source={`${CDN_ENDPOINT}${codePoint.toString(16)}.png`}
      height={size}
      width={size}
      className='my-auto'
    />
  )
}

export default memo(Emoji)