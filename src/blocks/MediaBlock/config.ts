import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: defaultLexical,
      required: false,
    },
  ],
}
