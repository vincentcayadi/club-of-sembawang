'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import type { MediaBlock as MediaBlockProps, Media } from '@/payload-types'
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
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate content only
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          x: imagePosition === 'right' ? -40 : 40,
          duration: 0.9,
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
      className="w-full block-spacing"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className={`
          grid grid-cols-1 items-center block-gap
          md:grid-cols-2
          ${imagePosition === 'right' ? 'md:grid-flow-dense' : ''}
        `}>
          {/* Image Container */}
          <div className={`flex justify-center ${imagePosition === 'right' ? 'md:col-start-2' : ''}`}>
            <div
              className="relative w-full max-w-sm max-h-80 rounded-lg overflow-hidden"
              style={{ aspectRatio }}
            >
              {typedMedia.url && (
                <Image
                  src={typedMedia.url}
                  alt={typedMedia.alt || ''}
                  width={typedMedia.width || 400}
                  height={typedMedia.height || 400}
                  className="w-full h-full object-contain"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              )}
            </div>
          </div>

          {/* Content Container */}
          <div
            ref={contentRef}
            className={`flex flex-col justify-center ${imagePosition === 'right' ? 'md:col-start-1' : ''}`}
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
