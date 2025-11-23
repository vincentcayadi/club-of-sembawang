import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'
import { defaultLexical } from '@/fields/defaultLexical'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'mediumImpact',
              required: true,
              label: 'Hero Style',
              options: [
                {
                  label: 'High Impact - Full screen with background image (homepage style)',
                  value: 'highImpact',
                },
                {
                  label: 'Medium Impact - Split layout with image on side',
                  value: 'mediumImpact',
                },
                {
                  label: 'Low Impact - Simple centered text, no image',
                  value: 'lowImpact',
                },
              ],
              admin: {
                description: 'High Impact = dramatic full-screen hero. Medium = text + side image. Low = simple banner.',
              },
            },
            {
              name: 'richText',
              type: 'richText',
              editor: defaultLexical,
              required: true,
            },
            linkGroup({
              overrides: {
                name: 'links',
                maxRows: 2,
              },
            }),
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Background image or side image depending on hero type',
              },
            },
          ],
        },
      ],
    },
  ],
}
