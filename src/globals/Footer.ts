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
      name: 'description',
      type: 'textarea',
      admin: {
        placeholder: "Singapore's first public health initiative promoting...",
        description: 'Short description displayed below the logo in footer',
      },
    },
    {
      name: 'footerLinks',
      type: 'array',
      label: 'Footer Links',
      maxRows: 8,
      admin: {
        description: 'Important links displayed in footer (can be different from header nav)',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Join Us',
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
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links',
      maxRows: 3,
      admin: {
        description: 'Legal links like Terms & Conditions, Privacy Policy',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Privacy Policy',
          },
        },
        createUrlField({
          name: 'url',
          label: 'Link',
          required: true,
          validateInternalPaths: true,
          checkExternalLinks: false,
        }),
      ],
    },
  ],
}
