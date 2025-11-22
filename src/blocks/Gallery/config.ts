import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  fields: [
    {
      name: 'imageCount',
      type: 'radio',
      defaultValue: '2',
      options: [
        {
          label: '1 Image',
          value: '1',
        },
        {
          label: '2 Images',
          value: '2',
        },
        {
          label: '3 Images',
          value: '3',
        },
      ],
      required: true,
    },
    {
      name: 'image1',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => {
          const count = siblingData?.imageCount
          return count === '2' || count === '3'
        },
      },
    },
    {
      name: 'image3',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.imageCount === '3',
      },
    },
  ],
}
