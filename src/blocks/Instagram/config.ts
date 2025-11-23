import type { Block, TextFieldSingleValidation } from 'payload'

export const Instagram: Block = {
  slug: 'instagram',
  interfaceName: 'InstagramBlock',
  labels: {
    singular: 'Instagram Post',
    plural: 'Instagram Posts',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Instagram Post URL',
      admin: {
        description: 'Paste the Instagram post URL (e.g. https://www.instagram.com/p/ABC123/)',
        placeholder: 'https://www.instagram.com/p/...',
      },
      validate: ((value) => {
        if (!value) return 'Instagram URL is required'
        if (typeof value === 'string' && !value.includes('instagram.com')) {
          return 'Please enter a valid Instagram URL'
        }
        return true
      }) as TextFieldSingleValidation,
    },
  ],
}
