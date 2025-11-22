import type { Field } from 'payload'
import { deepMerge } from '@/utilities/deepMerge'

type LinkAppearance = 'default' | 'primary' | 'secondary'

type LinkType = (options?: {
  appearances?: LinkAppearance[] | false
  disableLabel?: boolean
  overrides?: Partial<Field>
}) => Field

export const link: LinkType = ({
  appearances = ['default', 'primary', 'secondary'],
  disableLabel = false,
  overrides = {},
} = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
            defaultValue: 'reference',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
          },
          {
            name: 'newTab',
            type: 'checkbox',
            label: 'Open in new tab',
            admin: {
              width: '50%',
              style: {
                alignSelf: 'flex-end',
              },
            },
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['pages', 'posts'],
      required: true,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'Custom URL',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
  ]

  linkResult.fields = [...linkResult.fields, ...linkTypes]

  if (!disableLabel) {
    linkResult.fields.push({
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'The text displayed for the link',
      },
    })
  }

  if (appearances !== false) {
    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'default',
      options: appearances.map((appearance) => ({
        label: appearance.charAt(0).toUpperCase() + appearance.slice(1),
        value: appearance,
      })),
      admin: {
        description: 'Choose how the link should be displayed',
      },
    })
  }

  return deepMerge(linkResult, overrides)
}
