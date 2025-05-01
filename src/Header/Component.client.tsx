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
      className="sticky top-0 z-50 border-b bg-neutral-100/95 shadow-sm backdrop-blur transition-colors dark:bg-neutral-800"
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
              className="font-medium text-neutral-900 transition-colors hover:text-primary dark:text-neutral-100"
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
            <SheetContent side="bottom" className="h-[85vh] rounded-t-xl pt-6">
              {/* Centered navigation links with theme selector below */}
              <div className="flex h-full flex-col items-center justify-center space-y-6 px-4">
                {navItems.map(({ link }, i) => (
                  // Wrap in a div so we can close the sheet on click
                  <div key={link.label ?? i} onClick={() => setIsOpen(false)}>
                    <CMSLink
                      {...link}
                      appearance="link"
                      className="text-lg font-medium text-neutral-900 transition-colors hover:text-primary dark:text-neutral-100"
                    />
                  </div>
                ))}

                {/* Theme selector below links with additional spacing */}
                <div className="mt-4">
                  <ThemeSelector />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default HeaderClient
