import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <section className="w-full bg-linear-to-b from-blue-400 to-blue-500 transition-colors dark:from-blue-600 dark:to-blue-800">
      <div className="prose-headings:text-neutral-100 prose-p:text-neutral-100 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center">
        {richText && <RichText data={richText} enableGutter={false} />}
        <div className="">
          {(links || []).map(({ link }, i) => (
            <CMSLink
              key={i}
              size="lg"
              className="rounded-full border-none bg-white px-6 py-3 font-medium text-blue-600"
              {...link}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
