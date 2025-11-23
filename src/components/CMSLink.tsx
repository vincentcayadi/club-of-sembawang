import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Page, Post } from '@/payload-types'

interface CMSLinkProps {
  type?: 'reference' | 'custom' | null
  url?: string | null
  reference?: {
    value: string | { slug?: string | null } | number | Page | Post
    relationTo: 'pages' | 'posts'
  } | null
  label?: string
  appearance?: 'default' | 'primary' | 'secondary' | null
  newTab?: boolean | null
  className?: string
}

const appearanceStyles = {
  default: 'bg-transparent text-foreground hover:bg-muted',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
}

export function CMSLink({
  type = 'custom',
  url,
  reference,
  label,
  appearance = 'primary',
  newTab,
  className,
}: CMSLinkProps) {
  const href =
    type === 'reference' && reference
      ? (() => {
          const { value, relationTo } = reference
          if (typeof value === 'string' || typeof value === 'number') return `/${relationTo}/${value}`
          if (value && typeof value === 'object' && 'slug' in value && value.slug) {
            if (relationTo === 'pages') {
              return value.slug === 'home' ? '/' : `/${value.slug}`
            }
            return `/${relationTo}/${value.slug}`
          }
          return '/'
        })()
      : url || '/'

  const baseStyles =
    'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

  const resolvedAppearance: keyof typeof appearanceStyles = (appearance || 'primary') as
    | 'default'
    | 'primary'
    | 'secondary'

  const linkStyles = cn(baseStyles, appearanceStyles[resolvedAppearance], className)

  if (newTab) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkStyles}>
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={linkStyles}>
      {label}
    </Link>
  )
}
