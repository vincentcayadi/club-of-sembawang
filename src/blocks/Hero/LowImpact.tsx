'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'
import { RenderLexical } from '@/components/RenderLexical'
import { CMSLink } from '@/components/CMSLink'
import { useUIStore } from '@/stores/uiStore'
import { ANIMATION_SPEEDS } from '@/constants'
import type { HeroBlock } from '@/payload-types'

export function LowImpactHero({ richText, links }: HeroBlock) {
  const pathname = usePathname()
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion)
  const setPrefersReducedMotion = useUIStore((state) => state.setPrefersReducedMotion)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersReduced = mediaQuery.matches
    setPrefersReducedMotion(prefersReduced)
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', handleChange)

    if (!prefersReduced && contentRef.current) {
      const fadeElements = contentRef.current.querySelectorAll('.fade-up')
      gsap.set(fadeElements, { opacity: 0, y: 30 })
    }

    const ctx = gsap.context(() => {
      if (prefersReduced) return

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
          stagger: 0.15,
          delay: 0.3,
        })
      }
    }, heroRef)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      ctx.revert()
    }
  }, [pathname, prefersReducedMotion, setPrefersReducedMotion])

  return (
    <div ref={heroRef} className="container mx-auto px-4 py-20 lg:py-32">
      <div ref={contentRef} className="mx-auto max-w-3xl text-center">
        <div className="fade-up opacity-0 translate-y-4">
          <RenderLexical content={richText} className="mb-8" />
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
  )
}
