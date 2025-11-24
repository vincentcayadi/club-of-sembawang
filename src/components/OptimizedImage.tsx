'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  media: Media | string | null | undefined
  alt?: string
  className?: string
  wrapperClassName?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  aspectRatio?: string
}

export function OptimizedImage({
  media,
  alt = '',
  className,
  wrapperClassName,
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  objectFit = 'cover',
  aspectRatio,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const mediaData = typeof media === 'string' ? null : media
  const imageUrl = typeof media === 'string' ? media : mediaData?.url

  // Reset loading state when image URL changes
  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
  }, [imageUrl])

  // Intersection observer for lazy loading
  useEffect(() => {
    if (priority || !wrapperRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '50px' }
    )

    observer.observe(wrapperRef.current)

    return () => observer.disconnect()
  }, [priority])

  // Error fallback
  if (!imageUrl || hasError) {
    return (
      <div
        ref={wrapperRef}
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted',
          wrapperClassName,
        )}
        style={{ aspectRatio }}
      >
        <svg
          className="h-12 w-12 text-muted-foreground/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    )
  }

  const wrapperClasses = cn(
    'progressive-image-wrapper relative overflow-hidden bg-muted/20',
    wrapperClassName,
  )

  // Loading placeholder that fades out
  const placeholderClasses = cn(
    'absolute inset-0 z-10 bg-gradient-to-br from-muted/40 to-muted/20 transition-opacity duration-700 ease-out',
    isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100',
  )

  // Blur layer - the image itself with blur, fades out when loaded
  const blurImageClasses = cn(
    'absolute inset-0 z-20 scale-110 blur-xl transition-all duration-700 ease-out',
    isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100',
    className,
  )

  // Full quality image that fades in
  const fullImageClasses = cn(
    'absolute inset-0 z-30 transition-opacity duration-700 ease-out',
    isLoaded ? 'opacity-100' : 'opacity-0',
    className,
  )

  const commonProps = {
    onError: () => setHasError(true),
    sizes: sizes || '100vw',
    style: { objectFit } as React.CSSProperties,
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div ref={wrapperRef} className={wrapperClasses} style={{ aspectRatio }}>
      {/* Gradient placeholder - bottom layer */}
      <div className={placeholderClasses} aria-hidden="true">
        <div className="absolute inset-0 animate-pulse" />
      </div>

      {isInView && (
        <>
          {/* Blur layer - shows immediately with blur effect */}
          {fill ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              {...commonProps}
              className={blurImageClasses}
              priority={priority}
              quality={10}
              aria-hidden="true"
            />
          ) : (
            <Image
              src={imageUrl}
              alt=""
              width={width || 1200}
              height={height || 800}
              {...commonProps}
              className={blurImageClasses}
              priority={priority}
              quality={10}
              aria-hidden="true"
            />
          )}

          {/* Full quality image - fades in when loaded */}
          {fill ? (
            <Image
              src={imageUrl}
              alt={alt}
              fill
              {...commonProps}
              className={fullImageClasses}
              onLoad={handleLoad}
              priority={priority}
              quality={90}
            />
          ) : (
            <Image
              src={imageUrl}
              alt={alt}
              width={width || 1200}
              height={height || 800}
              {...commonProps}
              className={fullImageClasses}
              onLoad={handleLoad}
              priority={priority}
              quality={90}
            />
          )}
        </>
      )}
    </div>
  )
}
