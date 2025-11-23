'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { MediaBlock as MediaBlockProps, Media } from '@/payload-types'
import { MediaImage } from '@/components/MediaImage'
import { RenderLexical } from '@/components/RenderLexical'

gsap.registerPlugin(ScrollTrigger)

type ValidMedia = Media

export const MediaBlockComponent: React.FC<MediaBlockProps> = ({
  media,
  imagePosition = 'left',
  caption,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.95,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      if (captionRef.current) {
        gsap.from(captionRef.current, {
          opacity: 0,
          x: imagePosition === 'right' ? -30 : 30,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: captionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [imagePosition])

  if (!media || typeof media === 'string') return null

  const typedMedia: ValidMedia = media as ValidMedia

  const imageElement = (
    <div
      ref={imageRef}
      className="group relative w-full overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg transition-all duration-500 hover:shadow-2xl aspect-video"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
      <MediaImage
        media={typedMedia}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )

  const captionElement = caption && (
    <div ref={captionRef} className="flex flex-col justify-center">
      <RenderLexical
        content={caption}
        className="prose prose-lg max-w-none leading-relaxed"
        disableIndent
        disableTextAlign
      />
    </div>
  )

  return (
    <section ref={sectionRef} className="my-16 w-full px-4 md:my-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
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
