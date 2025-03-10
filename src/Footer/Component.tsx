import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const contact = footerData?.contact || {}
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-24 bg-neutral-800 px-4 pt-10 text-neutral-100 md:px-0">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-8">
        <div className="col-span-2 flex items-center justify-center">
          <Link href="/" aria-label="Homepage">
            <Logo />
          </Link>
          <Separator
            orientation="vertical"
            className="ml-8 hidden h-full bg-neutral-600 md:block"
          />
        </div>

        {/* Contact Section */}
        <div className="col-span-2 flex flex-col text-sm">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Contact Us</p>
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
          <nav className="flex flex-col gap-1 text-sm" aria-label="Footer Navigation">
            <p className="font-medium">Navigation</p>
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
      <Separator className="mx-auto mt-6 w-5/6 bg-neutral-600" />
      <div className="py-6 text-center text-sm">© {currentYear} Interact Club of Sembawang</div>
    </footer>
  )
}
