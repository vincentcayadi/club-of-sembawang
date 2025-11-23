'use client'

import React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import type { Header as HeaderType } from '@/payload-types'
import { useMobileMenuStore } from '@/stores/useMobileMenuStore'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

interface HeaderProps {
  navItems: NonNullable<HeaderType['navItems']>
}

export function Header({ navItems }: HeaderProps) {
  const { isOpen, close, toggle } = useMobileMenuStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="text-lg font-bold tracking-tight transition-colors hover:text-primary">
          Club of Sembawang
        </Link>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems?.map((item) => (
                <NavigationMenuItem key={item.id || item.url}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet open={isOpen} onOpenChange={toggle}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 max-w-[80vw]">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="mt-6">
              <ul className="flex flex-col gap-1">
                {navItems?.map((item) => (
                  <li key={item.id || item.url}>
                    <Link
                      href={item.url}
                      className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
