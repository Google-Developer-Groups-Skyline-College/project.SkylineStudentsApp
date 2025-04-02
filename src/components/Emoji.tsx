import React, { memo } from 'react'
import { Image } from 'expo-image'

const CDN_ENDPOINT = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.2/assets/svg/'

export interface EmojiProps {
  value: string
  size?: number
}

function Emoji({ value, size = 16 }: EmojiProps) {
  const codePoint = value.codePointAt(0)
  let source

  if (!codePoint) {
    console.warn(`${value} was not found in twemoji CDN`)
    source = require('$/images/image.missing.webp')
  } else {
    source = `${CDN_ENDPOINT}/${codePoint.toString(16)}.svg`
  }

  return (
    <Image
      source={source}
      style={{ width: size, height: size, marginVertical: 'auto' }}
    />
  )
}

export default memo(Emoji)
