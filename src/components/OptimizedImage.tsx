'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  media: Media | string | null | undefined
  alt?: string
  className?: string
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

  const mediaData = typeof media === 'string' ? null : media
  const imageUrl = typeof media === 'string' ? media : mediaData?.url

  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
  }, [imageUrl])

  if (!imageUrl || hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted',
          className,
        )}
        style={{ aspectRatio }}
      >
        <svg
          className="h-12 w-12 text-muted-foreground/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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
    'progressive-image-wrapper relative overflow-hidden bg-muted/30',
    !isLoaded && 'animate-pulse',
    className,
  )

  const imageClasses = cn(
    'transition-opacity duration-700 ease-out',
    isLoaded ? 'opacity-100' : 'opacity-0',
  )

  const commonProps = {
    alt: alt || '',
    onLoad: () => setIsLoaded(true),
    onError: () => setHasError(true),
    priority,
    sizes: sizes || '100vw',
    style: { objectFit } as React.CSSProperties,
    placeholder: 'blur' as const,
    blurDataURL: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzIwMjAyMCIvPjwvc3ZnPg==',
  }

  return (
    <div className={wrapperClasses} style={{ aspectRatio }}>
      {fill ? (
        <Image
          src={imageUrl}
          {...commonProps}
          fill
          className={imageClasses}
        />
      ) : (
        <Image
          src={imageUrl}
          {...commonProps}
          width={width || 1200}
          height={height || 800}
          className={imageClasses}
        />
      )}
    </div>
  )
}
