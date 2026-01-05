import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Image + Text',
    plural: 'Image + Text Blocks',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
      admin: {
        description: 'The image that will appear on one side',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      label: 'Image Position',
      options: [
        {
          label: 'Left side (text on right)',
          value: 'left',
        },
        {
          label: 'Right side (text on left)',
          value: 'right',
        },
      ],
      required: true,
      admin: {
        description: 'Where should the image appear?',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '4/3',
      label: 'Image Aspect Ratio',
      options: [
        {
          label: 'Square (1:1)',
          value: '1/1',
        },
        {
          label: 'Standard (4:3)',
          value: '4/3',
        },
        {
          label: 'Widescreen (16:9)',
          value: '16/9',
        },
      ],
      required: true,
      admin: {
        description: 'Choose the aspect ratio for the image',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: defaultLexical,
      required: false,
      label: 'Text Content',
      admin: {
        description: 'The text that appears next to the image',
      },
    },
  ],
}
