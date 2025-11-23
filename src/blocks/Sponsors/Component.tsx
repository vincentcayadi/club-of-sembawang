'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Media, SponsorsBlock } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

function getMediaInfo(media: Media | number | null | undefined) {
  if (media && typeof media === 'object' && 'url' in media) {
    return {
      url: media.url,
      alt: media.alt || '',
      width: media.width || 400,
      height: media.height || 200,
    }
  }

  return null
}

export function SponsorsBlockComponent({ heading, subheading, logos }: SponsorsBlock) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const logosToShow = logos || []

  useEffect(() => {
    if (!gridRef.current || logosToShow.length === 0) return

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.sponsor-logo')
      if (items) {
        gsap.from(items, {
          opacity: 0,
          y: 30,
          scale: 0.9,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [logosToShow.length])

  if (!logosToShow.length) return null

  return (
    <section ref={sectionRef} className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {(heading || subheading) && (
          <div className="mb-12 space-y-3 text-center">
            {heading && <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>}
            {subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
          </div>
        )}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-6 rounded-2xl border border-border/60 bg-gradient-to-br from-muted/30 to-muted/50 p-8 shadow-sm md:grid-cols-3 md:gap-8 md:p-10 lg:grid-cols-4"
        >
          {logosToShow.map((logo) => {
            const media = getMediaInfo(logo.logo)
            if (!media) return null

            const content = (
              <>
                {media.url && (
                  <Image
                    src={media.url}
                    alt={media.alt}
                    width={media.width || 160}
                    height={media.height || 80}
                    className="h-auto w-full max-w-[160px] object-contain transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 40vw, 160px"
                  />
                )}
              </>
            )

            const linkClass = cn(
              'sponsor-logo group flex items-center justify-center rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl',
              'grayscale hover:grayscale-0',
              'aspect-[3/2]'
            )

            return logo.url ? (
              <Link key={logo.id || logo.name} href={logo.url} className={linkClass}>
                {content}
              </Link>
            ) : (
              <div key={logo.id || logo.name} className={linkClass}>
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
