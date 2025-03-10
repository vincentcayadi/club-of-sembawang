'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'

import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface HeaderClientProps {
  data: Header
}

import { CMSLink } from '@/components/Link'

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const navItems = data?.navItems || []

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center">
          <Link href="/" className="mr-8">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="text-base font-medium text-black transition-colors hover:text-primary dark:text-white"
              />
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2">
            <span className="sr-only">Search</span>
            <SearchIcon className="h-5 w-5 text-primary" />
          </Link>
          <ThemeSelector />
        </div>
      </div>
    </header>
  )
}
