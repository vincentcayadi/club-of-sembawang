import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Separator } from '@/components/ui/separator' // Import ShadCN Separator component
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []
  const contact = footer?.contact || {}
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-100 pt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-8">
        {/* Logo Section */}
        <div className="col-span-2 flex items-center justify-center">
          <Link href="/" aria-label="Homepage">
            <picture>
              <img
                alt="Interact Club Of Sembawang Logo"
                width={150}
                height={50}
                className="w-auto h-auto max-h-36"
                src="https://github.com/vincentcayadi/club-of-sembawang/blob/main/public/logo.webp?raw=true"
              />
            </picture>
          </Link>
          <Separator
            orientation="vertical"
            className="ml-8 h-full bg-neutral-600 md:block hidden"
          />
        </div>

        {/* Contact Section */}
        <div className="col-span-2 text-sm flex flex-col">
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <div className="flex flex-col gap-1">
            {contact?.email && (
              <Link
                href={`mailto:${contact.email}`}
                aria-label="Send an email"
                className="hover:text-neutral-300"
              >
                {contact.email}
              </Link>
            )}

            {contact?.socialLinks?.map(({ platform, url }, index) =>
              url ? (
                <Link
                  key={index}
                  href={url}
                  aria-label={`Visit our ${platform}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-300"
                >
                  {platform}
                </Link>
              ) : null,
            )}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="col-span-2 flex flex-col">
          <h3 className="font-semibold text-lg mb-2">Navigation</h3>
          <nav className="flex flex-col gap-1 text-sm" aria-label="Footer Navigation">
            {navItems.map(({ link }, i) => (
              <CMSLink className="hover:underline" key={i} {...link} />
            ))}
          </nav>
        </div>

        {/* Theme Selection*/}
        <div className="col-span-2 flex flex-col content-end justify-end">
          <ThemeSelector />
        </div>
      </div>
      <Separator className="mt-6 bg-neutral-600 w-5/6 mx-auto" />
      {/* Footer Bottom Section */}
      <div className="text-sm text-center py-6">
        © {currentYear} Interact Club of Sembawang. Privacy Policy
      </div>
    </footer>
  )
}
