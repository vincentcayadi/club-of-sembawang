import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'testimonialsBlock',
  labels: {
    plural: 'Testimonials',
    singular: 'Testimonial',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'selectedTestimonials',
      type: 'relationship',
      hasMany: true,
      label: 'Selection',
      relationTo: ['testimonials'],
    },
  ],
}
