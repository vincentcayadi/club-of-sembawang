import type { GlobalConfig } from 'payload'
import { createUrlField } from '../fields/urlFieldValidation'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Maximum of 6 navigation links',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'About Us',
            description: 'The text shown in the navigation',
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
