import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-8 rounded-lg border border-border bg-gradient-to-r from-violet-500 to-blue-600 p-8 text-center text-neutral-100 md:flex-row md:text-left">
      {richText && (
        <div className="flex-1">
          <RichText className="mb-0" content={richText} enableGutter={false} />
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 md:justify-end">
        {(links || []).map(({ link }, i) => (
          <CMSLink key={i} size="lg" {...link} />
        ))}
      </div>
    </div>
  )
}
