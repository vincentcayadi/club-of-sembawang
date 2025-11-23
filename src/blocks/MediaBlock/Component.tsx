'use client'

import React from 'react'
import type { MediaBlock as MediaBlockProps, Media } from '@/payload-types'
import { MediaImage } from '@/components/MediaImage'
import { RenderLexical } from '@/components/RenderLexical'

type ValidMedia = Media

export const MediaBlockComponent: React.FC<MediaBlockProps> = ({
  media,
  imagePosition = 'left',
  caption,
}) => {
  if (!media || typeof media === 'string') return null

  const typedMedia: ValidMedia = media as ValidMedia

  const imageElement = (
    <div className="relative w-full overflow-hidden rounded-lg border bg-card shadow-sm aspect-video">
      <MediaImage
        media={typedMedia}
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )

  const captionElement = caption && (
    <RenderLexical
      content={caption}
      className="prose prose-sm max-w-3xl text-muted-foreground"
      disableIndent
      disableTextAlign
    />
  )

  return (
    <div className="my-8 w-full">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        {imagePosition === 'right' ? (
          <>
            {captionElement}
            {imageElement}
          </>
        ) : (
          <>
            {imageElement}
            {captionElement}
          </>
        )}
      </div>
    </div>
  )
}
