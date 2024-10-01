import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      required: true,
      relationTo: 'media',
    },
    {
      name: 'nav',
      label: 'Navigation',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
        },
      ],
      minRows: 1,
    },
    {
      name: 'copyright',
      label: 'Copyright',
      type: 'text',
    },
  ],
  slug: 'footer',
}
