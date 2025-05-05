import type { Metadata } from 'next'

import type { Page, Post, Config, Media } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverURL = getServerSideURL()
  let url = serverURL + '/OG.webp' // Default image URL

  if (image && typeof image === 'object' && 'url' in image) {
    // If image is an object with a url property, use it
    url = image.url ? (image.url.startsWith('http') ? image.url : serverURL + image.url) : url
  }

  return url
}

export const generateMeta = async (args: { doc: Page | Post }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Interact Club Of Sembawang'
    : 'Interact Club Of Sembawang'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
