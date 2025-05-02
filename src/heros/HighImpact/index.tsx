'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'

import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const pathname = usePathname() // Detects when the page changes
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset scroll position when navigating between pages
    window.scrollTo(0, 0)

    // Only run animation if the content exists
    if (contentRef.current) {
      // Get all elements with fade-up class
      const fadeElements = contentRef.current.querySelectorAll('.fade-up')

      // Kill any existing animations to prevent duplicates
      gsap.killTweensOf(fadeElements)

      // Set initial state (invisible and below final position)
      gsap.set(fadeElements, {
        opacity: 0,
        y: 30,
        visibility: 'hidden', // This helps with autoAlpha
      })

      // Create the animation with a slight delay
      gsap.to(fadeElements, {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 1.8,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.2, // Small delay to ensure animation runs after component is fully mounted
      })
    }
  }, [pathname]) // Re-run when pathname changes

  return (
    <div
      ref={heroRef}
      className="relative flex min-h-[100vh] select-none items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 flex items-center justify-center text-center">
        <div
          ref={contentRef}
          className="max-w-7xl prose-headings:text-neutral-100 prose-p:text-neutral-100"
        >
          {richText && (
            <RichText
              // dont do this again wtf
              className="fade-up"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="fade-up flex justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 min-h-screen w-full">
        {media && typeof media === 'object' && (
          <>
            <Media fill imgClassName="object-cover w-full h-full" resource={media} />
            <div className="backdrop-blur-xs pointer-events-none absolute inset-0 bg-neutral-900/30" />
          </>
        )}
      </div>
    </div>
  )
}
