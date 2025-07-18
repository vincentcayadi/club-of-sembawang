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
    <>
      <Separator className="mx-auto mt-24 w-5/6 bg-neutral-200" />
      <footer className="my-4 px-4 transition-colors md:my-12 md:px-0">
        <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-8">
          <div className="col-span-2 flex flex-col items-start md:items-center">
            <Link href="/">
              <Logo loading="eager" priority="high" className="dark:invert-0" />
            </Link>
            <div className="text-left text-sm">© {currentYear} Club of Sembawang</div>
          </div>

          {/* Contact Section */}
          <div className="col-span-2 flex flex-col text-sm">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Contact Us</p>
              {contact?.email && (
                <Link
                  href={`mailto:${contact.email}`}
                  aria-label="Send an email"
                  className="hover:text-neutral-600 dark:hover:text-neutral-300"
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
                    className="hover:text-neutral-600 dark:hover:text-neutral-300"
                  >
                    {platform}
                  </Link>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
