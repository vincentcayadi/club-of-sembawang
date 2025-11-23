import type { Block } from 'payload'

export const Quote: Block = {
  slug: 'quote',
  interfaceName: 'QuoteBlock',
  labels: {
    singular: 'Quote / Callout',
    plural: 'Quotes / Callouts',
  },
  fields: [
    {
      name: 'quoteText',
      type: 'textarea',
      required: true,
      label: 'Quote Text',
      admin: {
        description: 'The main quote or callout message',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: false,
      label: 'Author / Attribution',
      admin: {
        description: 'Who said this? (optional)',
      },
    },
    {
      name: 'style',
      type: 'select',
      required: true,
      defaultValue: 'quote',
      label: 'Style',
      options: [
        { label: 'Quote - With quotation marks', value: 'quote' },
        { label: 'Callout - Highlighted box', value: 'callout' },
        { label: 'Info - Blue info box', value: 'info' },
        { label: 'Warning - Yellow warning box', value: 'warning' },
        { label: 'Success - Green success box', value: 'success' },
      ],
      admin: {
        description: 'Choose how this should look',
      },
    },
  ],
}
