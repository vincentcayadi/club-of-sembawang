'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CTABlock as CTABlockProps } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

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

  const safeButtons = buttons?.slice(0, 2) || []
  if (!heading || safeButtons.length === 0) return null

  useEffect(() => {
    if (!sectionRef.current) return

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

      if (buttonsRef.current) {
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
  }, [])

  const isFullWidth = layout === 'fullWidth'

  const sectionClass = isFullWidth
    ? 'my-16 px-0 md:my-24'
    : 'my-16 w-full max-w-5xl mx-auto rounded-2xl border border-border/60 px-8 py-12 shadow-lg md:my-24'

  const contentWrapper = isFullWidth
    ? 'mx-auto flex w-full max-w-5xl flex-col gap-6 px-8 py-12 md:flex-row md:items-center md:justify-between md:gap-8 md:py-16'
    : 'flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8'

  const buttonClass =
    'group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95'

  const buttonVariants: Record<string, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary/20 bg-transparent hover:bg-primary/5 hover:border-primary/40',
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 244, g: 244, b: 245 }
  }

  const bg = backgroundColor || '#f4f4f5'
  const rgb = hexToRgb(bg)
  const gradientBg = `linear-gradient(135deg, ${bg} 0%, rgb(${rgb.r - 10}, ${rgb.g - 10}, ${rgb.b - 10}) 100%)`

  return (
    <section
      ref={sectionRef}
      className={cn(sectionClass, 'relative overflow-hidden')}
      style={
        isFullWidth
          ? {
              background: gradientBg,
              width: '100vw',
              marginLeft: 'calc(50% - 50vw)',
              marginRight: 'calc(50% - 50vw)',
            }
          : { background: gradientBg }
      }
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
      </div>
      <div className={contentWrapper}>
        <div ref={contentRef} className="flex-1 space-y-3">
          <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h3>
          {body ? (
            <div className="prose prose-base max-w-2xl [&>p]:text-muted-foreground [&>p]:text-lg">
              <RichText data={body} disableIndent disableTextAlign />
            </div>
          ) : null}
        </div>
        <div ref={buttonsRef} className="flex flex-wrap gap-4">
          {safeButtons.map((btn, idx) => (
            <Link
              key={`${btn.url}-${idx}`}
              href={btn.url ?? '#'}
              className={cn(buttonClass, buttonVariants[btn.variant || 'primary'])}
            >
              {btn.text}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
