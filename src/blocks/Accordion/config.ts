import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Settings',
          fields: [
            {
              name: 'header',
              type: 'text',
              required: false,
              admin: {
                placeholder: 'e.g. Frequently Asked Questions',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: false,
              admin: {
                placeholder: 'Optional description text below the header',
              },
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'center',
              options: [
                {
                  label: 'Left',
                  value: 'left',
                },
                {
                  label: 'Center',
                  value: 'center',
                },
              ],
            },
          ],
        },
        {
          label: 'Items',
          fields: [
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  editor: defaultLexical,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
