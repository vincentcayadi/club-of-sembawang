import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site Settings',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Primary logo (horizontal/full version)',
      },
    },
    {
      name: 'squareLogo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Square/icon version of logo (optional, for mobile or compact displays)',
      },
    },
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Club of Sembawang',
      required: true,
      admin: {
        description: 'Displayed when no logo is uploaded',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: "Singapore's first public health initiative",
      admin: {
        description: 'Short description of your site',
      },
    },
  ],
}
