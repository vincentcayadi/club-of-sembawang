import React from 'react'
import './globals.css'
import { LenisProvider } from './components/LenisProvider'
import { getSiteName } from '@/utilities/getSiteName'

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

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LenisProvider>
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  )
}
