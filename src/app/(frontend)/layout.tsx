import React from 'react'
import './globals.css'
import { LenisProvider } from './components/LenisProvider'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Header as HeaderGlobal } from '@/payload-types'
import type { SiteSetting } from '@/payload-types'

export async function generateMetadata() {
  const siteName = 'Club Of Sembawang'

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: "Singapore's first public health initiative",
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  let navItems: NonNullable<HeaderGlobal['navItems']> = []
  let siteSettings: SiteSetting | null = null
  try {
    const payload = await getPayload({ config: configPromise })
    const header = (await payload.findGlobal({ slug: 'header' })) as unknown as HeaderGlobal
    navItems = header.navItems || []
    siteSettings = (await payload.findGlobal({ slug: 'siteSettings' })) as unknown as SiteSetting
  } catch {
    navItems = []
    siteSettings = null
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LenisProvider>
          <Header
            navItems={navItems as any}
            logo={siteSettings?.logo ?? undefined}
            squareLogo={siteSettings?.squareLogo ?? undefined}
            siteName={siteSettings?.siteName ?? undefined}
          />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
