'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

gsap.registerPlugin(ScrollTrigger)

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme('dark')

    if (heroRef.current) {
      const heroImage = heroRef.current.querySelector('.hero-image')

      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }
    }
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative -mt-[10rem] flex min-h-[100vh] select-none items-center justify-center overflow-hidden text-neutral-100"
      data-theme="dark"
    >
      <div className="container relative z-10 flex items-center justify-center text-center">
        <div className="max-w-[36.5rem]">
          {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 min-h-[100vh] w-full">
        {media && typeof media === 'object' && (
          <>
            <Media
              fill
              imgClassName="hero-image -z-10 object-cover w-full h-full"
              resource={media}
            />
            <div className="pointer-events-none absolute inset-0 bg-neutral-900/20 backdrop-blur-sm" />
          </>
        )}
      </div>
    </div>
  )
}
