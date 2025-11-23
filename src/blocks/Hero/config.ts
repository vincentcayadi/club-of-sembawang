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
              options: [
                {
                  label: 'High Impact',
                  value: 'highImpact',
                },
                {
                  label: 'Medium Impact',
                  value: 'mediumImpact',
                },
                {
                  label: 'Low Impact',
                  value: 'lowImpact',
                },
              ],
              admin: {
                description: 'Choose the hero style',
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
