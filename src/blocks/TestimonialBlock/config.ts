import type { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonialBlock',
  interfaceName: 'testimonialBlock',
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
      name: 'selectedTestimonial',
      type: 'relationship',
      hasMany: true,
      label: 'Selection',
      relationTo: ['testimonial'],
    },
  ],
}
