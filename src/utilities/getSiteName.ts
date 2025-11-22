import type { PayloadRequest } from 'payload'
import { SITE_NAME_DEFAULT, SITE_NAME } from '@/constants'

/**
 * Fetches the site name from SiteSettings global with fallbacks
 * @param req - Payload request object
 * @returns Site name from global settings, env variable, or hardcoded default
 */
export const getSiteName = async (req: PayloadRequest): Promise<string> => {
  try {
    const siteSettings = await req.payload.findGlobal({
      slug: 'siteSettings',
      req,
    })
    return siteSettings.siteName || SITE_NAME
  } catch (error) {
    return SITE_NAME
  }
}

/**
 * Synchronous version that returns the env variable or default
 * Use this when you don't have access to the Payload request object
 */
export const getSiteNameSync = (): string => {
  return SITE_NAME
}
