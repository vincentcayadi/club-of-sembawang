import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
    },
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'showCount',
      type: 'number',
      required: false,
      defaultValue: 3,
      admin: {
        description: 'Number of testimonials to show.',
        condition: (data, siblingData) => {
          return siblingData?.layout === 'grid'
        },
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: false },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'highlight',
          type: 'checkbox',
          required: false,
          label: 'Highlight this testimonial',
        },
      ],
    },
  ],
}
