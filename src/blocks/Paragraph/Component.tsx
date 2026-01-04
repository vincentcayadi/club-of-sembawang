'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RenderLexical } from '@/components/RenderLexical'
import { cn } from '@/lib/utils'
import type { Media, ParagraphBlock } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

const alignmentClasses = {
  left: '!text-left',
  center: '!text-center',
  right: '!text-right',
} as const

const parseColor = (color?: string | null) => {
  if (!color) return null
  const trimmed = color.trim()
  // Hex #rgb or #rrggbb
  const hexMatch = trimmed.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
  if (hexMatch) {
    const hex = hexMatch[1]
    const normalized =
      hex.length === 3
        ? hex
            .split('')
            .map((c) => c + c)
            .join('')
        : hex
    const intVal = parseInt(normalized, 16)
    return {
      r: (intVal >> 16) & 255,
      g: (intVal >> 8) & 255,
      b: intVal & 255,
    }
  }
  // hsl(h s% l%) simplified
  const hslMatch = trimmed.match(
    /^hsl\\(\\s*([0-9]+(?:\\.[0-9]+)?)\\s*,\\s*([0-9]+)%\\s*,\\s*([0-9]+)%\\s*\\)$/i,
  )
  if (hslMatch) {
    const h = Number(hslMatch[1])
    const s = Number(hslMatch[2]) / 100
    const l = Number(hslMatch[3]) / 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    let r = 0,
      g = 0,
      b = 0
    if (h >= 0 && h < 60) {
      r = c
      g = x
    } else if (h < 120) {
      r = x
      g = c
    } else if (h < 180) {
      g = c
      b = x
    } else if (h < 240) {
      g = x
      b = c
    } else if (h < 300) {
      r = x
      b = c
    } else {
      r = c
      b = x
    }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    }
  }
  return null
}

const isDark = (color?: string | null) => {
  const rgb = parseColor(color)
  if (!rgb) return false
  // Relative luminance
  const l = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return l < 0.6
}

export function ParagraphBlockComponent({
  content,
  alignment = 'left',
  backgroundType = 'none',
  backgroundColor,
  gradientFrom,
  gradientTo,
  backgroundImage,
}: ParagraphBlock) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const safeAlignment = (alignment || 'left') as keyof typeof alignmentClasses
  const darkText =
    backgroundType === 'solid'
      ? isDark(backgroundColor)
      : backgroundType === 'gradient'
        ? isDark(gradientTo || gradientFrom)
        : backgroundType === 'image'

  const hasImage =
    backgroundType === 'image' &&
    backgroundImage &&
    typeof backgroundImage === 'object' &&
    'url' in backgroundImage &&
    backgroundImage.url

  useEffect(() => {
    if (!contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-48 items-center overflow-hidden px-4 py-16 md:py-24"
      style={
        backgroundType === 'solid' && backgroundColor
          ? { backgroundColor }
          : backgroundType === 'gradient' && gradientFrom && gradientTo
            ? {
                backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
              }
            : undefined
      }
    >
      {hasImage && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${(backgroundImage as Media).url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      {hasImage && <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40" />}
      <div
        className={cn(
          'relative mx-auto flex w-full max-w-4xl',
          safeAlignment === 'left' && 'justify-start text-left',
          safeAlignment === 'center' && 'justify-center text-center',
          safeAlignment === 'right' && 'justify-end text-right',
        )}
      >
        <div
          ref={contentRef}
          className={cn(
            'prose prose-xl max-w-none',
            alignmentClasses[safeAlignment],
            darkText ? 'text-white prose-invert' : 'text-foreground',
            'prose-headings:font-bold prose-headings:tracking-tight',
            'prose-p:leading-relaxed prose-p:text-lg',
            'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
            'prose-strong:font-semibold prose-strong:text-foreground',
            backgroundType === 'none' && safeAlignment === 'left' && 'border-l-4 border-primary/20 pl-6',
          )}
        >
          <RenderLexical content={content} />
        </div>
      </div>
    </section>
  )
}
