import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Settings',
          fields: [
            {
              name: 'heading',
              type: 'richText',
              editor: defaultLexical,
              required: false,
              admin: {
                description: 'Optional heading shown above testimonials.',
              },
            },
            {
              name: 'layout',
              type: 'select',
              required: true,
              defaultValue: 'grid',
              options: [
                { label: 'Grid', value: 'grid' },
                { label: 'Marquee (scrolling)', value: 'marquee' },
              ],
              admin: {
                description: 'Choose between a grid or infinite scrolling marquee.',
              },
            },
            {
              name: 'showCount',
              type: 'number',
              required: false,
              defaultValue: 3,
              min: 1,
              admin: {
                step: 1,
                description: 'Maximum testimonials to display in grid mode.',
                condition: (_, siblingData) => (siblingData as any)?.layout !== 'marquee',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              minRows: 1,
              admin: {
                description: 'Add testimonial entries.',
              },
              validate: (value, { siblingData }) => {
                const max = (siblingData as any)?.showCount || 3
                if (
                  (siblingData as any)?.layout !== 'marquee' &&
                  Array.isArray(value) &&
                  value.length > max
                ) {
                  return `You can only add up to ${max} testimonials in grid mode.`
                }
                return true
              },
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                  label: 'Quote',
                },
                { name: 'name', type: 'text', required: true, label: 'Name' },
                { name: 'role', type: 'text', required: false, label: 'Role/Title' },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                  label: 'Avatar',
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
        },
      ],
    },
  ],
}
