import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Paragraph: Block = {
  slug: 'paragraph',
  interfaceName: 'ParagraphBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: defaultLexical,
              required: true,
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'left',
              admin: {
                description: 'Optional alignment for the text block.',
              },
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
            },
          ],
        },
        {
          label: 'Background',
          fields: [
            {
              name: 'backgroundType',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Solid color', value: 'solid' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Image', value: 'image' },
              ],
            },
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Background color',
              defaultValue: '',
              admin: {
                condition: (_, siblingData) => siblingData?.backgroundType === 'solid',
                description: 'Any valid CSS color for solid backgrounds.',
              },
            },
            {
              name: 'gradientFrom',
              type: 'text',
              label: 'Gradient from',
              defaultValue: '#0f172a',
              admin: {
                condition: (_, siblingData) => siblingData?.backgroundType === 'gradient',
              },
            },
            {
              name: 'gradientTo',
              type: 'text',
              label: 'Gradient to',
              defaultValue: '#1e293b',
              admin: {
                condition: (_, siblingData) => siblingData?.backgroundType === 'gradient',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (_, siblingData) => siblingData?.backgroundType === 'image',
                description: 'Image shown behind the text.',
              },
            },
          ],
        },
      ],
    },
  ],
}
