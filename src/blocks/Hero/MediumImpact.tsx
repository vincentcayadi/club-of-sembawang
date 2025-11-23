'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'
import { RenderLexical } from '@/components/RenderLexical'
import { CMSLink } from '@/components/CMSLink'
import { OptimizedImage } from '@/components/OptimizedImage'
import { useUIStore } from '@/stores/uiStore'
import { ANIMATION_SPEEDS } from '@/constants'
import type { HeroBlock } from '@/payload-types'

export function MediumImpactHero({ richText, links, media }: HeroBlock) {
  const pathname = usePathname()
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion)
  const setPrefersReducedMotion = useUIStore((state) => state.setPrefersReducedMotion)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', handleChange)

    if (!prefersReducedMotion) {
      if (mediaRef.current) {
        gsap.set(mediaRef.current, { opacity: 0 })
      }
      if (contentRef.current) {
        const fadeElements = contentRef.current.querySelectorAll('.fade-up')
        gsap.set(fadeElements, { opacity: 0, y: 30 })
      }
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return

      if (contentRef.current) {
        const fadeElements = contentRef.current.querySelectorAll('.fade-up')

        gsap.set(fadeElements, {
          opacity: 0,
          y: 30,
        })

        gsap.to(fadeElements, {
          opacity: 1,
          y: 0,
          duration: ANIMATION_SPEEDS.NORMAL,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.25,
        })
      }

      if (mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: ANIMATION_SPEEDS.SLOW,
            ease: 'power2.out',
            delay: 0.2,
          },
        )
      }
    }, heroRef)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      ctx.revert()
    }
  }, [pathname, prefersReducedMotion, setPrefersReducedMotion])

  return (
    <div ref={heroRef} className="container mx-auto px-4 py-20 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div ref={contentRef}>
          <div className="fade-up opacity-0 translate-y-4">
            <RenderLexical content={richText} className="mb-4" />
          </div>
          {links && links.length > 0 && (
            <div className="fade-up opacity-0 translate-y-4 mt-4 flex flex-wrap gap-4">
              {links.map((linkItem, i) => (
                <CMSLink key={i} {...linkItem.link} />
              ))}
            </div>
          )}
        </div>
        <div ref={mediaRef} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200">
          {media && typeof media === 'object' && media.url ? (
            <OptimizedImage
              media={media}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              objectFit="cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="h-32 w-32 rounded-lg bg-gray-300" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
