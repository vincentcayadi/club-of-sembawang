'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import type { QuoteBlock } from '@/payload-types'
import { Quote as QuoteIcon, Info, AlertTriangle, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export const QuoteBlockComponent: React.FC<QuoteBlock> = ({ quoteText, author, style = 'quote' }) => {
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!quoteRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(quoteRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, quoteRef)

    return () => ctx.revert()
  }, [])

  const styleConfig = {
    quote: {
      bgColor: 'bg-muted/50',
      borderColor: 'border-l-primary',
      textColor: 'text-foreground',
      icon: QuoteIcon,
      iconColor: 'text-primary',
    },
    callout: {
      bgColor: 'bg-muted',
      borderColor: 'border-l-foreground',
      textColor: 'text-foreground',
      icon: null,
      iconColor: '',
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-blue-500',
      textColor: 'text-blue-900',
      icon: Info,
      iconColor: 'text-blue-500',
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-l-yellow-500',
      textColor: 'text-yellow-900',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
    },
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-l-green-500',
      textColor: 'text-green-900',
      icon: CheckCircle,
      iconColor: 'text-green-500',
    },
  }

  const config = styleConfig[style as keyof typeof styleConfig] || styleConfig.quote
  const Icon = config.icon

  return (
    <div ref={quoteRef} className="my-12 w-full px-4">
      <div className="mx-auto max-w-4xl">
        <blockquote
          className={cn(
            'relative rounded-lg border-l-4 p-6 md:p-8',
            config.bgColor,
            config.borderColor
          )}
        >
          {Icon && (
            <div className="mb-4">
              <Icon className={cn('h-8 w-8', config.iconColor)} />
            </div>
          )}
          <p className={cn('text-lg leading-relaxed md:text-xl', config.textColor)}>
            {style === 'quote' && '"'}
            {quoteText}
            {style === 'quote' && '"'}
          </p>
          {author && (
            <footer className={cn('mt-4 text-sm font-medium', config.textColor)}>
              — {author}
            </footer>
          )}
        </blockquote>
      </div>
    </div>
  )
}
