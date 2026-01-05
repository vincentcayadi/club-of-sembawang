'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CTABlock as CTABlockProps } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export const CTABlockComponent: React.FC<CTABlockProps> = ({
  heading,
  body,
  layout = 'standard',
  backgroundColor = '#f4f4f5',
  buttons,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const getPrefersReduced = useReducedMotion()

  // Filter valid buttons
  const validButtons = buttons?.filter((btn) => btn?.text && btn?.url).slice(0, 2) || []

  // Don't render if no heading
  if (!heading) return null

  useEffect(() => {
    if (!sectionRef.current || getPrefersReduced()) return

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      if (buttonsRef.current && buttonsRef.current.children.length > 0) {
        gsap.from(buttonsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [getPrefersReduced])

  const isFullWidth = layout === 'fullWidth'

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative overflow-hidden',
        isFullWidth
          ? 'block-spacing !px-0'
          : 'w-full max-w-5xl mx-2 sm:mx-4 md:mx-auto rounded-lg border border-border/60 shadow-lg py-8 md:py-12 lg:py-16',
      )}
      style={
        isFullWidth
          ? {
              backgroundColor: backgroundColor || '#f4f4f5',
              width: '100vw',
              marginLeft: 'calc(50% - 50vw)',
              marginRight: 'calc(50% - 50vw)',
            }
          : { backgroundColor: backgroundColor || '#f4f4f5' }
      }
    >
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8',
          isFullWidth
            ? 'mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 py-12 md:py-16'
            : 'px-4 sm:px-6 md:px-8 py-8 md:py-12',
        )}
      >
        {/* Text Content */}
        <div ref={contentRef} className="flex-1 space-y-3">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            {heading}
          </h3>
          {body && (
            <div className="prose prose-sm sm:prose-base max-w-2xl text-muted-foreground">
              <RichText data={body} disableIndent disableTextAlign />
            </div>
          )}
        </div>

        {/* Buttons */}
        {validButtons.length > 0 && (
          <div ref={buttonsRef} className="flex flex-wrap gap-3 sm:gap-4">
            {validButtons.map((btn, idx) => {
              const variant = btn.variant || 'primary'
              return (
                <Link
                  key={`${btn.url}-${idx}`}
                  href={btn.url}
                  className={cn(
                    'group inline-flex items-center justify-center gap-2 rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95',
                    variant === 'primary' &&
                      'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
                    variant === 'secondary' &&
                      'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md',
                    variant === 'outline' &&
                      'border-2 border-primary/20 bg-transparent hover:bg-primary/5 hover:border-primary/40',
                  )}
                >
                  {btn.text}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
