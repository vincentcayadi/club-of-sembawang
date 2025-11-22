import { seoPlugin } from '@payloadcms/plugin-seo'
import type { Plugin } from 'payload'
import type {
  GenerateTitle,
  GenerateURL,
  GenerateDescription,
} from '@payloadcms/plugin-seo/types'
import type { Page, Post } from '../payload-types'
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

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url.replace(/\/$/, '')}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    uploadsCollection: 'media',
    collections: [],
    generateTitle,
    generateDescription,
    generateURL,
  }),
]
