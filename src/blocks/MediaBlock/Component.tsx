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
    <section className="my-10 w-full px-4">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
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
    </section>
  )
}
