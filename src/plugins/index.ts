import { seoPlugin } from '@payloadcms/plugin-seo'
import type { Plugin } from 'payload'
import type {
  GenerateTitle,
  GenerateURL,
  GenerateDescription,
} from '@payloadcms/plugin-seo/types'
import type { Page, Post, Media } from '../payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { getSiteName } from '@/utilities/getSiteName'

const generateTitle: GenerateTitle<Post | Page> = async ({ doc, req }) => {
  const siteName = await getSiteName(req)
  const base = doc?.title || siteName
  return `${base} | ${siteName}`
}

const generateDescription: GenerateDescription<Post | Page> = async ({ doc, req }) => {
  const siteName = await getSiteName(req)
  return doc?.excerpt || `Welcome to ${siteName}`
}

const generateURL: GenerateURL<Post | Page> = ({ doc, req }) => {
  const url = getServerSideURL()

  // Handle home page
  if (doc?.slug === 'home') {
    return url
  }

  // Check if this is a post by looking at the collection context
  const isPost = req?.collection?.config?.slug === 'posts'

  if (isPost && doc?.slug) {
    return `${url.replace(/\/$/, '')}/posts/${doc.slug}`
  }

  return doc?.slug ? `${url.replace(/\/$/, '')}/${doc.slug}` : url
}

const generateImage = ({ doc }: any) => {
  // Try to get the header image for posts
  if (doc?.headerImage && typeof doc.headerImage === 'object') {
    const media = doc.headerImage as Media
    return media.url || undefined
  }

  // Try to get the meta image if explicitly set
  if (doc?.meta?.image && typeof doc.meta.image === 'object') {
    const media = doc.meta.image as Media
    return media.url || undefined
  }

  return undefined
}

export const plugins: Plugin[] = [
  seoPlugin({
    uploadsCollection: 'media',
    collections: [],
    generateTitle,
    generateDescription,
    generateURL,
    generateImage,
  }),
]
