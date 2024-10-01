import { Block } from 'payload'

export const richText: Block = {
  slug: 'richText',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
