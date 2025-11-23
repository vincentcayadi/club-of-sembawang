"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import type { Header as HeaderType, SiteSetting } from "@/payload-types"
import { useMobileMenuStore } from "@/stores/useMobileMenuStore"
import { useHeaderStore } from "@/stores/useHeaderStore"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface HeaderProps {
  navItems: NonNullable<HeaderType["navItems"]>
  logo?: SiteSetting["logo"]
  squareLogo?: SiteSetting["squareLogo"]
  siteName?: string | null
}

export function Header({ navItems, logo, squareLogo, siteName }: HeaderProps) {
  const { isOpen, open, close } = useMobileMenuStore()
  const hasHighImpactHero = useHeaderStore((state) => state.hasHighImpactHero)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!hasHighImpactHero) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasHighImpactHero])

  const desktopLogo =
    (logo && typeof logo === "object" && "url" in logo
      ? (logo as any)
      : squareLogo && typeof squareLogo === "object" && "url" in squareLogo
        ? (squareLogo as any)
        : null)
  const mobileLogo =
    squareLogo && typeof squareLogo === "object" && "url" in squareLogo
      ? (squareLogo as any)
      : desktopLogo
  const label = siteName || "Club of Sembawang"
  const hasLogo = Boolean(desktopLogo?.url || mobileLogo?.url)

  const isTransparent = hasHighImpactHero && !isScrolled

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isTransparent
          ? "border-transparent bg-transparent"
          : "border-b border-border/40 bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 text-lg font-bold tracking-tight transition-colors hover:text-primary",
            isTransparent && "text-white hover:text-white/80"
          )}
        >
          {desktopLogo?.url ? (
            <span className="relative hidden h-12 w-40 md:block">
              <Image
                src={desktopLogo.url}
                alt={desktopLogo.alt || label}
                fill
                className="object-contain"
                sizes="200px"
              />
            </span>
          ) : null}
          {mobileLogo?.url ? (
            <span className="relative h-10 w-10 md:hidden">
              <Image
                src={mobileLogo.url}
                alt={mobileLogo.alt || label}
                fill
                className="object-contain"
                sizes="64px"
              />
            </span>
          ) : null}
          <span className={cn("text-base font-semibold md:text-lg", hasLogo && "sr-only")}>
            {label}
          </span>
        </Link>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems?.map((item) => (
                <NavigationMenuItem key={item.id || item.url}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isTransparent && "text-white hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet open={isOpen} onOpenChange={(val) => (val ? open() : close())}>
          <SheetTrigger asChild className="md:hidden">
            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-md border",
                isTransparent && "border-white text-white"
              )}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm border-l-0 bg-background/95 backdrop-blur-xl">
            <SheetHeader className="border-b border-border/40 pb-4">
              <SheetTitle className="text-left text-lg font-bold">{label}</SheetTitle>
            </SheetHeader>
            <nav className="mt-8">
              <ul className="flex flex-col gap-2">
                {navItems?.map((item, index) => (
                  <li key={item.id || item.url}>
                    <Link
                      href={item.url}
                      className="group block rounded-lg px-4 py-3 text-base font-medium transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
                      onClick={close}
                    >
                      <span className="flex items-center justify-between">
                        {item.label}
                        <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
                      </span>
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
