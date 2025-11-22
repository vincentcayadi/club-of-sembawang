import type { CollectionConfig } from 'payload'
import { createSeoHook } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { richLexical } from '@/fields/richLexical'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Posts: CollectionConfig = {
  slug: 'posts',
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${data.slug}`
      },
    },
    preview: (doc) => {
      const secret = process.env.PAYLOAD_PUBLIC_DRAFT_SECRET || 'demo-secret-123'

      const params = new URLSearchParams({
        url: `/posts/${doc.slug}`,
        secret,
        collection: 'posts',
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
      schedulePublish: true,
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
              name: 'headerImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Main image shown at the top of the post (also used for social media preview)',
              },
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
              name: 'content',
              type: 'richText',
              editor: richLexical,
              required: true,
            },
          ],
        },
        {
          label: 'SEO & Social',
          description:
            'How this post appears on Google and social media (optional - fills automatically from content above)',
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
        description: 'Schedule when this post goes live (leave blank to publish immediately)',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeValidate: [createSeoHook({ imageField: 'headerImage' })],
  },
}
