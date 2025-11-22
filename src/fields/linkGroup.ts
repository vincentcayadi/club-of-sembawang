import type { ArrayField, Field } from 'payload'
import { deepMerge } from '@/utilities/deepMerge'
import { link } from './link'

type LinkGroupType = (options?: {
  overrides?: Partial<ArrayField>
  appearances?: ('default' | 'primary' | 'secondary')[] | false
}) => Field

export const linkGroup: LinkGroupType = ({ overrides = {}, appearances } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
      }),
    ],
  }

  return deepMerge(generatedLinkGroup, overrides)
}
