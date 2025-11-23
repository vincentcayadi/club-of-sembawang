import React from 'react'
import './globals.css'
import { LenisProvider } from './components/LenisProvider'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Header as HeaderGlobal } from '@/payload-types'

export async function generateMetadata() {
  const siteName = 'Club of Sembawang'

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: "Singapore's first public health initiative",
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  let navItems: NonNullable<HeaderGlobal['navItems']> = []
  try {
    const payload = await getPayload({ config: configPromise })
    const header = (await payload.findGlobal({ slug: 'header' })) as unknown as HeaderGlobal
    navItems = header.navItems || []
  } catch {
    navItems = []
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LenisProvider>
          <Header navItems={navItems as any} />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
