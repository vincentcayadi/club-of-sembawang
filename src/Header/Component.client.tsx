// src/components/HeaderClient.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  // Hydration-safe theming
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme)
    }
  }, [headerTheme])

  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false)
  const navItems = data.navItems || []

  return (
    <header
      className="sticky top-0 z-50 border-b bg-white/95 shadow-sm"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>

        {/* Desktop nav + theme toggle */}
        <div className="ml-auto hidden md:flex md:items-center md:space-x-6">
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={link.label ?? i}
              {...link}
              appearance="link"
              className="hover:text-primary font-medium text-black transition-colors dark:text-white"
            />
          ))}
          <ThemeSelector />
        </div>

        {/* Mobile menu */}
        <div className="ml-auto md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-6 flex flex-col space-y-4 px-4">
                {navItems.map(({ link }, i) => (
                  // Wrap in a div so we can close the sheet on click
                  <div key={link.label ?? i} onClick={() => setIsOpen(false)}>
                    <CMSLink
                      {...link}
                      appearance="link"
                      className="hover:text-primary text-lg font-medium text-black transition-colors dark:text-white"
                    />
                  </div>
                ))}
                <ThemeSelector />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default HeaderClient
