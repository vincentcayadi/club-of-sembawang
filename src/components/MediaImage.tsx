import Image, { type ImageProps } from 'next/image'
import type { Media } from '@/payload-types'

type MediaImageProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  media: Media
}

export function MediaImage({ media, className, ...rest }: MediaImageProps) {
  if (!media?.url) return null

  const { url, alt, width = 1600, height = 900 } = media

  return (
    <Image
      src={url}
      alt={alt || ''}
      width={width ?? 1600}
      height={height ?? 900}
      className={className}
      {...rest}
    />
  )
}
