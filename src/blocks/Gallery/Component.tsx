'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { GalleryBlock as GalleryBlockProps, Media } from '@/payload-types'
import { OptimizedImage } from '@/components/OptimizedImage'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type ResolvedCount = '1' | '2' | '3'

export const GalleryBlockComponent: React.FC<GalleryBlockProps> = ({
  imageCount,
  image1,
  image2,
  image3,
}) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<Media | null>(null)

  const images = [image1, image2, image3].filter(
    (img): img is Media =>
      !!img && typeof img === 'object' && 'url' in img && typeof img.url === 'string',
  )

  useEffect(() => {
    if (!galleryRef.current || images.length === 0) return

    const ctx = gsap.context(() => {
      const items = galleryRef.current?.querySelectorAll('.gallery-item')
      if (items) {
        gsap.from(items, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, galleryRef)

    return () => ctx.revert()
  }, [images.length])

  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [selectedImage])

  if (images.length === 0) return null

  const resolvedCount: ResolvedCount = imageCount === '2' || imageCount === '3' ? imageCount : '1'

  const gridClassMap: Record<ResolvedCount, string> = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-3',
  }

  const gridClass = gridClassMap[resolvedCount]

  return (
    <>
      <div ref={galleryRef} className="w-full block-spacing">
        <div className={cn('mx-auto max-w-7xl grid gap-6 md:gap-8', gridClass)}>
          {images.map((image, index) => (
            <div
              key={image.id || index}
              className="gallery-item group relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-card shadow-md transition-all duration-300 hover:shadow-2xl cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30 z-10 flex items-center justify-center">
                <span className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-sm font-medium">
                  View Full Size
                </span>
              </div>
              <OptimizedImage
                media={image}
                wrapperClassName="h-full w-full"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                aspectRatio="16 / 9"
                objectFit="cover"
                fill
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

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 hover:rotate-90 duration-300"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw] animate-in zoom-in-95 duration-300">
            <OptimizedImage
              media={selectedImage}
              wrapperClassName="rounded-lg"
              className="object-contain"
              width={1200}
              height={800}
              objectFit="contain"
              sizes="90vw"
              priority
            />
            {selectedImage.alt && (
              <p className="mt-4 text-center text-sm text-white/80">{selectedImage.alt}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
