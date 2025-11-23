import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const CTA: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CTABlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Heading',
              defaultValue: 'Ready to get started?',
            },
            {
              name: 'body',
              type: 'richText',
              editor: defaultLexical,
              required: false,
              label: 'Body',
            },
            {
              name: 'layout',
              type: 'select',
              label: 'Layout',
              defaultValue: 'standard',
              options: [
                { label: 'Standard', value: 'standard' },
                { label: 'Full width background', value: 'fullWidth' },
              ],
            },
            {
              name: 'backgroundColor',
              type: 'select',
              required: false,
              label: 'Background Color',
              defaultValue: '#f4f4f5',
              options: [
                { label: 'Light Gray (Default)', value: '#f4f4f5' },
                { label: 'White', value: '#ffffff' },
                { label: 'Light Blue', value: '#dbeafe' },
                { label: 'Light Green', value: '#d1fae5' },
                { label: 'Light Yellow', value: '#fef3c7' },
                { label: 'Light Pink', value: '#fce7f3' },
                { label: 'Light Purple', value: '#ede9fe' },
                { label: 'Dark Gray', value: '#1f2937' },
                { label: 'Black', value: '#000000' },
              ],
              admin: {
                description: 'Choose a background color for the CTA section',
              },
            },
          ],
        },
        {
          label: 'Buttons',
          fields: [
            {
              name: 'buttons',
              type: 'array',
              label: 'Buttons',
              minRows: 1,
              maxRows: 2,
              required: true,
              defaultValue: [
                {
                  text: 'Learn more',
                  url: '#',
                  variant: 'primary',
                },
              ],
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Button text',
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'Button URL',
                },
                {
                  name: 'variant',
                  type: 'select',
                  required: true,
                  defaultValue: 'primary',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Outline', value: 'outline' },
                  ],
                  label: 'Button variant',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
