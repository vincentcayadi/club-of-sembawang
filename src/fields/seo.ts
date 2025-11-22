import type { CollectionBeforeValidateHook, Field } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

/**
 * Creates a reusable SEO tab with auto-population
 * @param config - Configuration options
 * @param config.includeImage - Whether to include header/featured image auto-fill (for Posts)
 */

export const createSeoTab = (config?: { includeImage?: boolean }): Field => ({
  type: 'tabs',
  tabs: [
    {
      label: 'SEO & Social',
      description:
        'How this appears on Google and social media (optional - fills automatically from content above)',
      fields: [
        {
          name: 'meta',
          type: 'group',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({}),
            MetaImageField({
              relationTo: 'media',
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
})

/**
 * Reusable beforeValidate hook for SEO meta auto-population
 * @param config - Configuration options
 * @param config.imageField - Name of the image field to use for meta.image (e.g., 'headerImage')
 */

export const createSeoHook = (
  config?: { imageField?: string },
): CollectionBeforeValidateHook => {
  return ({ data }) => {
    if (!data) return data

    const title = data.title as string | undefined
    const excerpt = data.excerpt as string | undefined
    const meta = data.meta || {}
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Your Site Name'

    // Auto-fill meta title
    if (!meta.title && title) {
      meta.title = `${title} | ${siteName}`
    }

    // Auto-fill meta description
    if (!meta.description && excerpt) {
      meta.description = excerpt
    }

    // Auto-fill meta image from specified field (e.g., headerImage for posts)
    if (config?.imageField && !meta.image && data[config.imageField]) {
      meta.image = data[config.imageField]
    }

    data.meta = meta
    return data
  }
}
