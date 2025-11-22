import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  labels: { singular: 'Archive', plural: 'Archives' },
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: defaultLexical,
      label: 'Intro Content',
    },
    {
      name: 'populateBy',
      type: 'select',
      required: true,
      defaultValue: 'collection',
      options: [
        { label: 'Collection', value: 'collection' },
        { label: 'Individual selection', value: 'selection' },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      required: true,
      defaultValue: 'posts',
      options: [{ label: 'Posts', value: 'posts' }],
      admin: {
        condition: (_, siblings) => siblings?.populateBy === 'collection',
        description: 'Select which collection to pull entries from.',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: {
        condition: (_, siblings) => siblings?.populateBy === 'collection',
      },
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      relationTo: ['posts'],
      hasMany: true,
      admin: {
        condition: (_, siblings) => siblings?.populateBy === 'selection',
      },
    },
  ],
}
