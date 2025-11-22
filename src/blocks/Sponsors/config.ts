import type { Block } from 'payload'

export const Sponsors: Block = {
  slug: 'sponsors',
  interfaceName: 'SponsorsBlock',
  fields: [
    { name: 'heading', type: 'text', required: false },
    { name: 'subheading', type: 'textarea', required: false },
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Marquee', value: 'marquee' },
      ],
    },
    {
      name: 'presentation',
      type: 'select',
      required: true,
      defaultValue: 'color',
      options: [
        { label: 'Full color', value: 'color' },
        { label: 'Muted until hover', value: 'mutedHover' },
      ],
      admin: {
        description: 'Muted hover applies only to grid layout.',
      },
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'url', type: 'text', required: false, label: 'Link URL' },
      ],
    },
  ],
}
