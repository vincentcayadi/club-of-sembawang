'use client'

import React from 'react'
import type { CTABlock as CTABlockProps } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const CTABlockComponent: React.FC<CTABlockProps> = ({
  heading,
  body,
  layout = 'standard',
  backgroundColor = '#f4f4f5',
  buttons,
}) => {
  const safeButtons = buttons?.slice(0, 2) || []
  if (!heading || safeButtons.length === 0) return null

  const bg = backgroundColor || '#f4f4f5'

  const isFullWidth = layout === 'fullWidth'

  const sectionClass = isFullWidth
    ? 'my-10 px-0'
    : 'my-10 w-full max-w-5xl mx-auto rounded-xl border border-border/60 px-6 py-10 shadow-sm'

  const contentWrapper = isFullWidth
    ? 'mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between'
    : 'flex flex-col gap-4 md:flex-row md:items-center md:justify-between'

  const buttonClass =
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

  const buttonVariants: Record<string, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-transparent hover:bg-muted',
  }

  return (
    <section
      className={sectionClass}
      style={
        isFullWidth
          ? {
              backgroundColor: bg,
              width: '100vw',
              marginLeft: 'calc(50% - 50vw)',
              marginRight: 'calc(50% - 50vw)',
            }
          : { backgroundColor: bg }
      }
    >
      <div className={contentWrapper}>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">{heading}</h3>
          {body ? (
            <div className="prose prose-sm max-w-prose text-muted-foreground">
              <RichText data={body} disableIndent disableTextAlign />
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          {safeButtons.map((btn, idx) => (
            <Link
              key={`${btn.url}-${idx}`}
              href={btn.url ?? '#'}
              className={cn(buttonClass, buttonVariants[btn.variant || 'primary'])}
            >
              {btn.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
