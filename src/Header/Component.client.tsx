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
  }, [pathname, setHeaderTheme]) // Added setHeaderTheme to dependency array

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme)
    }
  }, [headerTheme, theme]) // Added theme to dependency array

  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false)
  const navItems = data.navItems || []

  return (
    <header
      className="sticky top-0 z-50 bg-neutral-400/40 backdrop-blur-lg transition-colors dark:bg-neutral-700/20"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center px-4">
        <Link href="/" className="flex items-center space-x-4">
          <Logo loading="eager" priority="high" className="transition-colors dark:invert-0" />
        </Link>

        <div className="ml-auto hidden transition-colors md:flex md:items-center md:space-x-6">
          {navItems.map(({ link }, i) => (
            <CMSLink key={link.label ?? i} {...link} appearance="link" />
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
            <SheetContent side="bottom" className="h-[50vh] rounded-t-xl pt-6 dark:bg-neutral-800">
              <div className="flex h-full flex-col items-center justify-center space-y-6 px-4">
                {navItems.map(({ link }, i) => (
                  <div key={link.label ?? i} onClick={() => setIsOpen(false)}>
                    <CMSLink
                      {...link}
                      appearance="link"
                      className="hover:text-primary text-lg font-medium text-neutral-900 transition-colors dark:text-neutral-100"
                    />
                  </div>
                ))}

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
