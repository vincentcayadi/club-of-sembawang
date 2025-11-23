'use client'

import React, { useEffect, useRef } from 'react'
import type { InstagramBlock } from '@/payload-types'

export const InstagramBlockComponent: React.FC<InstagramBlock> = ({ url }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)

    // Process embeds when script loads
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [url])

  if (!url) return null

  return (
    <div ref={containerRef} className="my-12 w-full px-4">
      <div className="mx-auto max-w-xl">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: '0',
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '540px',
            minWidth: '326px',
            padding: '0',
            width: 'calc(100% - 2px)',
          }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            View this post on Instagram
          </a>
        </blockquote>
      </div>
    </div>
  )
}
