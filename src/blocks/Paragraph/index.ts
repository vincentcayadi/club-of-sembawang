import type { Block } from 'payload'
import { richLexical } from '@/fields/richLexical'

export const Paragraph: Block = {
  slug: 'paragraph',
  interfaceName: 'ParagraphBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: richLexical,
      required: true,
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '1',
      admin: {
        description: 'Number of columns the text should span',
      },
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: '5xl',
      admin: {
        description: 'Maximum width of the container',
      },
      options: [
        { label: 'Small (2xl)', value: '2xl' },
        { label: 'Medium (4xl)', value: '4xl' },
        { label: 'Large (5xl)', value: '5xl' },
        { label: 'Extra Large (7xl)', value: '7xl' },
        { label: 'Full Width', value: 'full' },
      ],
    },
  ],
}
