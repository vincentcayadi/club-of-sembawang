import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Separator } from '@/components/ui/separator' // Import ShadCN Separator component

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []
  const legalLinks = footer?.legalLinks || [] // Add this to pull legal links dynamically
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white pb-6 pt-10">
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
                src="https://github.com/vincentcayadi/club-of-sembawang/blob/main/public/logo.png?raw=true"
              />
            </picture>
          </Link>
          <Separator orientation="vertical" className="ml-8 h-full" />
        </div>

        {/* Contact Section */}
        <div className="col-span-2 text-sm">
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <p>interact.sembawang@gmail.com</p>
          <p className="mt-2">Tel: +65 9172 6652</p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <img src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="col-span-2 flex flex-col">
          <h3 className="font-semibold text-lg mb-2">Navigation</h3>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Footer Navigation">
            {navItems.map(({ link }, i) => (
              <CMSLink className="hover:underline" key={i} {...link} />
            ))}
          </nav>
        </div>

        {/* Legal Section */}
        <div className="col-span-2 flex flex-col">
          <h3 className="font-semibold text-lg mb-2">Legal</h3>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Legal Links">
            {legalLinks.map(({ link }, i) => (
              <CMSLink className="hover:underline" key={i} {...link} />
            ))}
          </nav>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className=" pt-4 text-sm text-center">
        © {currentYear} Interact Club of Sembawang. All rights reserved.
      </div>
    </footer>
  )
}
