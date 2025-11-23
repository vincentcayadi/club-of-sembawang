'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { RenderLexical } from '@/components/RenderLexical'
import { CMSLink } from '@/components/CMSLink'
import { useUIStore } from '@/stores/uiStore'
import { useHeaderStore } from '@/stores/useHeaderStore'
import { ANIMATION_SPEEDS } from '@/constants'
import type { HeroBlock } from '@/payload-types'

export function HighImpactHero({ richText, links, media }: HeroBlock) {
  const pathname = usePathname()
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion)
  const setPrefersReducedMotion = useUIStore((state) => state.setPrefersReducedMotion)
  const setHasHighImpactHero = useHeaderStore((state) => state.setHasHighImpactHero)

  useEffect(() => {
    setHasHighImpactHero(true)
    return () => setHasHighImpactHero(false)
  }, [setHasHighImpactHero])

  useEffect(() => {
    setImageLoaded(false)
  }, [pathname])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)

    // Detect reduced motion preference once per mount
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
          duration: ANIMATION_SPEEDS.SLOW,
          ease: 'power3.out',
          stagger: 0.18,
          delay: 0.3,
        })
      }

      if (mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: ANIMATION_SPEEDS.SLOW + 0.3,
            ease: 'power2.out',
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
    <div
      ref={heroRef}
      className="select-none relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0f17]"
    >
      <div className="relative z-10 flex items-center justify-center px-4 text-center">
        <div ref={contentRef} className="max-w-4xl">
          <div className="fade-up opacity-0 translate-y-4">
            <RenderLexical content={richText} className="mb-8 text-white" />
          </div>
          {links && links.length > 0 && (
            <div className="fade-up opacity-0 translate-y-4 flex flex-wrap justify-center gap-4">
              {links.map((linkItem, i) => (
                <CMSLink key={i} {...linkItem.link} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div ref={mediaRef} className="absolute inset-0 h-full w-full">
        {media && typeof media === 'object' && media.url && (
          <>
            <Image
              src={media.url}
              alt={media.alt || ''}
              fill
              className={`object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              priority
              sizes="100vw"
              quality={90}
              onLoadingComplete={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f17] via-[#0f1623] to-[#0b0f17] blur-sm transition-opacity duration-500" />
            )}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          </>
        )}
      </div>
    </div>
  )
}
