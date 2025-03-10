import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Separator } from '@/components/ui/separator'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []
  const contact = footer?.contact || {}
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 pt-10 text-sm text-neutral-100">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-8">
        <div className="col-span-2 flex items-center justify-center">
          <Link href="/" aria-label="Homepage">
            <picture>
              <img
                alt="Interact Club Of Sembawang Logo"
                width={150}
                height={50}
                className="h-auto max-h-36 w-auto"
                src="https://github.com/vincentcayadi/club-of-sembawang/blob/main/public/logo.webp?raw=true"
              />
            </picture>
          </Link>
          <Separator orientation="vertical" className="hidden h-full bg-neutral-600 md:block" />
        </div>

        <div className="col-span-2 flex flex-col">
          <p className="mb-1 font-medium">Contact Us</p>
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
        <div className="col-span-2 flex flex-col">
          <p className="mb-1 font-medium">Navigation</p>
          <nav className="flex flex-col gap-1 text-sm" aria-label="Footer Navigation">
            {navItems.map(({ link }, i) => (
              <CMSLink className="hover:underline" key={i} {...link} />
            ))}
          </nav>
        </div>
      </div>
      <Separator className="mx-auto mt-6 w-5/6 bg-neutral-600" />
      <div className="py-6 text-center text-sm">© {currentYear} Young Asians</div>
    </footer>
  )
}
