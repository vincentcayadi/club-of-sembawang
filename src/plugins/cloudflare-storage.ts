import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'

/**
 * Cloudflare R2 Storage Plugin
 *
 * Only activates when R2 credentials are provided (production).
 * Falls back to local storage in development if credentials are missing.
 */
export const cloudflareStorage = (): Plugin | null => {
  const hasR2Config =
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME

  // Always return the plugin configuration for import map generation
  // Use dummy values if credentials aren't available (for import map only)
  const isGeneratingImportMap = process.argv.includes('generate:importmap')

  if (!hasR2Config && !isGeneratingImportMap) {
    console.log('R2 credentials not found - using local storage')
    return null
  }

  if (!hasR2Config && isGeneratingImportMap) {
    console.log('Generating import map with placeholder R2 config')
    return s3Storage({
      collections: {
        media: true,
      },
      bucket: 'placeholder',
      config: {
        endpoint: 'https://placeholder.r2.cloudflarestorage.com',
        region: 'auto',
        credentials: {
          accessKeyId: 'placeholder',
          secretAccessKey: 'placeholder',
        },
        forcePathStyle: true,
      },
    })
  }

  console.log('Cloudflare R2 storage enabled')

  return s3Storage({
    collections: {
      media: true,
    },
    bucket: process.env.R2_BUCKET_NAME!,
    config: {
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
      forcePathStyle: true,
    },
  })
}
