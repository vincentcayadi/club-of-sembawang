import type { CollectionConfig } from 'payload'
import { createSeoHook } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Paragraph } from '@/blocks/Paragraph'
import { Accordion } from '@/blocks/Accordion/config'
import { Archive } from '@/blocks/Archive/config'
import { CTA } from '@/blocks/CTA/config'
import { Gallery } from '@/blocks/Gallery/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Sponsors } from '@/blocks/Sponsors/config'
import { Testimonials } from '@/blocks/Testiomonials/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const path = data.slug === 'home' ? '/' : `/${data.slug}`
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) => {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
      const secret = process.env.PAYLOAD_PUBLIC_DRAFT_SECRET || 'demo-secret-123'

      const params = new URLSearchParams({
        url: path,
        secret,
        collection: 'pages',
        slug: String(doc.slug || ''),
      })

      return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/preview?${params.toString()}`
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  access: {
    read: ({ req }): any => {
      if (req.user) return true
      const now = new Date().toISOString()
      return {
        and: [
          { _status: { equals: 'published' } },
          {
            or: [
              { publishedAt: { exists: false } },
              { publishedAt: { less_than_equal: now } },
            ],
          },
        ],
      }
    },
  },
  fields: [
    ...slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'excerpt',
              type: 'textarea',
              admin: {
                description:
                  'A short summary (1-2 sentences) that appears in search results and social media previews.',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                Paragraph,
                Testimonials,
                Sponsors,
                Archive,
                CTA,
                Gallery,
                MediaBlock,
                Accordion,
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              admin: {
                description: 'SEO and social overrides.',
              },
              fields: [
                OverviewField({
                  titlePath: 'meta.title',
                  descriptionPath: 'meta.description',
                  imagePath: 'meta.image',
                }),
                MetaTitleField({ hasGenerateFn: true }),
                MetaDescriptionField({}),
                MetaImageField({ relationTo: 'media' }),
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
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Schedule when this page goes live (leave blank to publish immediately)',
      },
    },
  ],
  hooks: {
    beforeValidate: [createSeoHook()],
  },
}
