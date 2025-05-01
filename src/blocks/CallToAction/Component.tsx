import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <section className={'w-full bg-gradient-to-r from-violet-500 to-blue-600'}>
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center">
        {richText && (
          <RichText
            content={richText}
            enableGutter={false}
            className="text-white dark:text-white"
          />
        )}

        <div className="">
          {(links || []).map(({ link }, i) => (
            <CMSLink
              key={i}
              size="lg"
              className="rounded-full border-none bg-white px-6 py-3 text-blue-600 hover:bg-gray-200"
              {...link}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
