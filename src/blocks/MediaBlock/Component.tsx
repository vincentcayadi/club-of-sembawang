'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { MediaBlock as MediaBlockProps, Media } from '@/payload-types'
import { OptimizedImage } from '@/components/OptimizedImage'
import { RenderLexical } from '@/components/RenderLexical'

gsap.registerPlugin(ScrollTrigger)

type ValidMedia = Media

export const MediaBlockComponent: React.FC<MediaBlockProps> = ({
  media,
  imagePosition = 'left',
  caption,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate image container
      if (imageContainerRef.current) {
        gsap.from(imageContainerRef.current, {
          opacity: 0,
          scale: 0.96,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Animate content
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          x: imagePosition === 'right' ? -40 : 40,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [imagePosition])

  if (!media || typeof media === 'string') return null

  const typedMedia: ValidMedia = media as ValidMedia

  return (
    <section
      ref={sectionRef}
      className="my-16 w-full px-4 md:my-24 lg:my-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className={`
          grid grid-cols-1 items-center gap-8
          md:grid-cols-2 md:gap-12
          lg:gap-16
          ${imagePosition === 'right' ? 'md:grid-flow-dense' : ''}
        `}>
          {/* Image Container */}
          <div
            ref={imageContainerRef}
            className={`
              group relative w-full
              ${imagePosition === 'right' ? 'md:col-start-2' : ''}
            `}
          >
            {/* Main image wrapper with aspect ratio */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/30 shadow-xl ring-1 ring-border/50 transition-all duration-500 hover:shadow-2xl hover:ring-border">
              <OptimizedImage
                media={typedMedia}
                wrapperClassName="absolute inset-0"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                fill
              />

              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />
          </div>

          {/* Content Container */}
          <div
            ref={contentRef}
            className={`
              flex flex-col justify-center
              ${imagePosition === 'right' ? 'md:col-start-1' : ''}
            `}
          >
            {caption && (
              <div className="prose prose-lg prose-slate max-w-none">
                <RenderLexical
                  content={caption}
                  className="leading-relaxed"
                  disableIndent
                  disableTextAlign
                />
              </div>
            )}

            {!caption && (
              <div className="flex items-center justify-center h-full min-h-[200px] text-muted-foreground/50 italic">
                No caption provided
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
