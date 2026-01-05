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
  aspectRatio = '4/3',
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
      className="my-8 w-full px-4 md:my-12 lg:my-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className={`
          flex flex-col items-center gap-6
          md:flex-row md:gap-8
          ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}
        `}>
          {/* Image Container */}
          <div
            ref={imageContainerRef}
            className="w-full md:w-auto md:flex-shrink-0"
          >
            <div
              className="relative mx-auto w-full max-w-sm rounded-lg overflow-hidden"
              style={{ aspectRatio }}
            >
              <OptimizedImage
                media={typedMedia}
                alt={typedMedia.alt || ''}
                wrapperClassName="w-full h-full"
                className="object-contain"
                objectFit="contain"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
          </div>

          {/* Content Container */}
          <div
            ref={contentRef}
            className="flex-1 flex flex-col justify-center"
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
