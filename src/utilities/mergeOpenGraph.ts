import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'A public health initiative by Interactors—for our communities and beyond.',
  images: [
    {
      url: `${getServerSideURL()}/OG.webp`,
    },
  ],
  siteName: 'Interact Club Of Sembawang',
  title: 'Interact Club Of Sembawang',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
