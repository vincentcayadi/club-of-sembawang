import type { GlobalConfig } from 'payload'
import { createUrlField } from '../fields/urlFieldValidation'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      admin: {
        placeholder: '© 2025 Club Of Sembawang',
        description: 'Copyright text displayed in footer',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      maxRows: 8,
      admin: {
        description: 'Add links to your social media profiles',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Other', value: 'other' },
          ],
          admin: {
            description: 'Select the social media platform',
          },
        },
        {
          name: 'customPlatform',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.platform === 'other',
            description: 'Enter custom platform name',
            placeholder: 'Discord',
          },
        },
        createUrlField({
          name: 'url',
          label: 'Link',
          required: true,
          validateInternalPaths: false,
          checkExternalLinks: true,
        }),
      ],
    },
  ],
}
