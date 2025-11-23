import React from 'react'
import type { GalleryBlock as GalleryBlockProps, Media } from '@/payload-types'
import { MediaImage } from '@/components/MediaImage'

type ResolvedCount = '1' | '2' | '3'

export const GalleryBlockComponent: React.FC<GalleryBlockProps> = ({
  imageCount,
  image1,
  image2,
  image3,
}) => {
  const images = [image1, image2, image3].filter(
    (img): img is Media =>
      !!img && typeof img === 'object' && 'url' in img && typeof img.url === 'string',
  )

  if (images.length === 0) return null

  const resolvedCount: ResolvedCount = imageCount === '2' || imageCount === '3' ? imageCount : '1'

  const gridClassMap: Record<ResolvedCount, string> = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-3',
  }

  const gridClass = gridClassMap[resolvedCount]

  return (
    <div className="my-8 w-full">
      <div className={`grid ${gridClass} gap-4`}>
        {images.map((image, index) => (
          <div
            key={image.id || index}
            className="relative aspect-video w-full overflow-hidden rounded-lg"
          >
            <MediaImage
              media={image}
              className="h-full w-full object-cover"
              sizes={
                resolvedCount === '1'
                  ? '100vw'
                  : resolvedCount === '2'
                    ? '(max-width: 768px) 100vw, 50vw'
                    : '(max-width: 768px) 100vw, 33vw'
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
