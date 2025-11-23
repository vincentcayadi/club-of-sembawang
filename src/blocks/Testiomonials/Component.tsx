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
        'flex h-full w-full flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-md transition-all duration-300 hover:shadow-xl min-h-48',
        highlight && 'ring-2 ring-primary/40 bg-primary/5',
      )}
    >
      <div className="flex-1">
        {quote && (
          <div className="relative">
            <span className="absolute -top-2 -left-1 text-5xl text-muted-foreground/20 leading-none">"</span>
            <div className="relative pl-4">
              {typeof quote === 'object' ? (
                <div className="prose prose-sm max-w-none [&>p]:text-foreground [&>p]:leading-relaxed [&>p]:m-0">
                  <RichText data={quote as any} disableIndent disableTextAlign />
                </div>
              ) : (
                <p className="text-base text-foreground leading-relaxed italic">{quote}</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-border/40 pt-4">
        <Avatar className="h-12 w-12 border-2 border-border/60 bg-muted">
          {avatarInfo?.url ? (
            <AvatarImage src={avatarInfo.url} alt={avatarInfo.alt} />
          ) : (
            <AvatarFallback className="text-sm font-semibold">{initials}</AvatarFallback>
          )}
        </Avatar>
        <div>
          {name && <div className="font-semibold text-foreground">{name}</div>}
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
  const marqueeItems = useMemo(() => {
    if (layout !== 'marquee') return []
    // Duplicate twice for seamless infinite loop
    return [...visible, ...visible]
  }, [layout, visible])

  const trackRef = useRef<HTMLDivElement | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useLayoutEffect(() => {
    if (layout !== 'marquee' || visible.length === 0) return
    const track = trackRef.current
    if (!track) return

    // Calculate the width of one complete set of items
    const totalWidth = track.scrollWidth / 2
    if (!totalWidth) return

    tweenRef.current?.kill()

    // Create seamless infinite loop
    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: totalWidth / 30, // Adjust speed: smaller = faster
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
      }
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [layout, visible.length])

  const handlePause = () => {
    tweenRef.current?.pause()
  }

  const handleResume = () => {
    tweenRef.current?.resume()
  }

  if (safeTestimonials.length === 0) return null

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        {heading && (
          <div className="mx-auto max-w-3xl text-center">
            {typeof heading === 'object' ? (
              <div className="prose prose-lg mx-auto [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:md:text-4xl [&>p]:text-muted-foreground">
                <RichText data={heading as any} disableIndent disableTextAlign />
              </div>
            ) : (
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
            )}
          </div>
        )}
        {layout === 'marquee' ? (
          <div
            className="relative w-full overflow-hidden py-4"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
            <div ref={trackRef} className="flex gap-6">
              {marqueeItems.map((item, idx) => (
                <div key={`${item?.id || idx}-${idx}`} className="min-w-[380px] max-w-md shrink-0">
                  <TestimonialCard {...(item as Testimonial)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {visible.map((item, idx) => (
              <TestimonialCard key={(item?.id as string) || idx} {...(item as Testimonial)} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
