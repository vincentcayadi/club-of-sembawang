import type { GlobalConfig } from 'payload'
import { SITE_NAME_DEFAULT, SITE_DESCRIPTION_DEFAULT } from '@/constants'

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
      defaultValue: SITE_NAME_DEFAULT,
      required: true,
      admin: {
        description: 'Displayed when no logo is uploaded',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: SITE_DESCRIPTION_DEFAULT,
      admin: {
        description: 'Short tagline or slogan',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: SITE_DESCRIPTION_DEFAULT,
      admin: {
        description: 'Default meta description for the site (used for SEO and social sharing)',
      },
    },
  ],
}
