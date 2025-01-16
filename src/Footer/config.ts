import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          admin: {
            placeholder: 'example@domain.com',
          },
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Media Links',
          fields: [
            {
              name: 'platform',
              label: 'Platform Name',
              type: 'text',
              admin: {
                placeholder: 'e.g., Instagram',
              },
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              admin: {
                placeholder: 'https://instagram.com/yourprofile',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
