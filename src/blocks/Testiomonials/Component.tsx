'use client'

import React, { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Media, TestimonialsBlock } from '@/payload-types'

type Testimonial = NonNullable<TestimonialsBlock['testimonials']>[number]

function getMediaInfo(media: Media | number | null | undefined) {
  if (media && typeof media === 'object' && 'url' in media) {
    return {
      url: media.url,
      alt: media.alt || '',
      width: media.width || 120,
      height: media.height || 120,
    }
  }

  return null
}

function initialsFromName(name?: string | null) {
  if (!name) return '?'
  return (
    name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2) || '?'
  )
}

function TestimonialCard({ quote, name, role, avatar, highlight }: Testimonial) {
  const avatarInfo = getMediaInfo(avatar as Media | number | null | undefined)
  const initials = initialsFromName(name)

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col justify-between gap-3 rounded-2xl border border-border/60 bg-card p-6 shadow-sm min-h-48',
        highlight && 'ring-2 ring-primary/40',
      )}
    >
      {quote && (
        typeof quote === 'object' ? (
          <RichText data={quote as any} disableIndent disableTextAlign />
        ) : (
          <p className="text-base text-foreground">"{quote}"</p>
        )
      )}
      <div className="mt-4 flex items-center gap-3">
        <Avatar className="h-12 w-12 border border-border/60 bg-muted">
          {avatarInfo?.url ? (
            <AvatarImage src={avatarInfo.url} alt={avatarInfo.alt} />
          ) : (
            <AvatarFallback className="text-sm font-semibold">{initials}</AvatarFallback>
          )}
        </Avatar>
        <div>
          {name && <div className="font-semibold">{name}</div>}
          {role && <div className="text-sm text-muted-foreground">{role}</div>}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsBlockComponent({
  heading,
  layout = 'grid',
  showCount = 3,
  testimonials,
}: TestimonialsBlock) {
  const safeTestimonials = useMemo(
    () => (testimonials?.filter(Boolean) as Testimonial[] | undefined) || [],
    [testimonials],
  )
  const visible = useMemo(
    () => (layout === 'grid' ? safeTestimonials.slice(0, showCount || 3) : safeTestimonials),
    [layout, safeTestimonials, showCount],
  )
  const marqueeItems = useMemo(
    () => (layout === 'marquee' ? [...visible, ...visible] : []),
    [layout, visible],
  )

  const trackRef = useRef<HTMLDivElement | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useLayoutEffect(() => {
    if (layout !== 'marquee') return
    const track = trackRef.current
    if (!track) return

    const dupCount = 2
    const totalWidth = track.scrollWidth / dupCount
    if (!totalWidth) return

    tweenRef.current?.kill()
    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: Math.max(30, totalWidth / 25),
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x)
          if (!Number.isFinite(val)) return '0px'
          const mod = val % -totalWidth
          return `${mod}px`
        },
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [layout, marqueeItems])

  const handlePause = () => {
    tweenRef.current?.pause()
  }

  const handleResume = () => {
    tweenRef.current?.resume()
  }

  if (safeTestimonials.length === 0) return null

  return (
    <section className="px-4 py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {heading && (
          <div className="mx-auto max-w-3xl text-center">
            {typeof heading === 'object' ? (
              <RichText data={heading as any} disableIndent disableTextAlign />
            ) : (
              <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
            )}
          </div>
        )}
        {layout === 'marquee' ? (
          <div
            className="relative w-full overflow-hidden"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
            <div ref={trackRef} className="flex gap-4">
              {marqueeItems.map((item, idx) => (
                <div key={`${item?.id || idx}-${idx}`} className="min-w-[320px] max-w-sm shrink-0">
                  <TestimonialCard {...(item as Testimonial)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {visible.map((item, idx) => (
              <TestimonialCard key={(item?.id as string) || idx} {...(item as Testimonial)} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
