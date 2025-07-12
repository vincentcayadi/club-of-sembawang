import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial Block',
    plural: 'Testimonial Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'What Our Clients Say',
    },
    {
      name: 'subheading',
      type: 'richText',
      label: 'Section Subtitle',
      defaultValue:
        "Don't just take our word for it. Here's what our satisfied clients have to say about their experience.",
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      maxRows: 20,
      fields: [
        { name: 'name', type: 'text', label: 'Full Name', required: true },
        { name: 'designation', type: 'text', label: 'Designation', required: true },
        { name: 'company', type: 'text', label: 'Company Name', required: false },
        { name: 'testimonial', type: 'textarea', label: 'Testimonial Text', required: true },
        {
          name: 'avatar',
          type: 'upload',
          label: 'Avatar Image',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'avatarUrl',
          type: 'text',
          label: 'Avatar URL (if not uploading)',
          admin: {
            description: 'Use this if you want to link to an external image instead of uploading',
          },
          required: false,
        },
        { name: 'isActive', type: 'checkbox', label: 'Show this testimonial', defaultValue: true },
        {
          name: 'order',
          type: 'number',
          label: 'Display Order',
          admin: { description: 'Lower numbers appear first' },
          defaultValue: 1,
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Display Settings',
      fields: [
        { name: 'showTitle', type: 'checkbox', label: 'Show Section Title', defaultValue: true },
        {
          name: 'showSubtitle',
          type: 'checkbox',
          label: 'Show Section Subtitle',
          defaultValue: true,
        },
        // {
        //   name: 'animationSpeed',
        //   type: 'select',
        //   label: 'Animation Speed',
        //   options: [
        //     { label: 'Slow', value: 'slow' },
        //     { label: 'Normal', value: 'normal' },
        //     { label: 'Fast', value: 'fast' },
        //   ],
        //   defaultValue: 'normal',
        // },
      ],
    },
  ],
}
