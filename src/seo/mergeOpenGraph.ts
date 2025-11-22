import type { Metadata } from 'next'
import { SITE_NAME, SERVER_URL } from '@/constants'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: SITE_NAME,
  title: SITE_NAME,
  description: `Welcome to ${SITE_NAME}`,
  images: [
    {
      url: `${SERVER_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
  ],
}

/**
 * Merges custom Open Graph metadata with defaults
 * Useful for generating consistent social sharing cards
 */
export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
