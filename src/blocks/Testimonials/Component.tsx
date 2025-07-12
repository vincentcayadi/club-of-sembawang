import React from 'react'
import { TestimonialsBlock as BlockType } from '@/payload-types'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Marquee } from '@devnomic/marquee'

export type TestimonialsProps = {
  block: BlockType
}

// const speedMap: Record<string, number> = {
//   slow: 20,
//   normal: 50,
//   fast: 100,
// }

const Testimonials: React.FC<TestimonialsProps> = ({ block }) => {
  const { title, subtitle, testimonials, settings } = block

  const items = testimonials
    .filter((t) => t.isActive)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section className="py-12">
      {settings.showTitle && <h2 className="mb-2 text-3xl font-bold">{title}</h2>}
      {settings.showSubtitle && <p className="mb-6 text-lg">{subtitle}</p>}

      <Marquee className="space-x-8" fade={true} pauseOnHover={true}>
        {items.map((t, idx) => (
          <Card key={idx} className="min-w-[280px]">
            <CardContent>
              <div className="mb-4 flex items-center">
                {t.avatar?.url || t.avatarUrl ? (
                  <Image
                    src={t.avatar?.url ?? t.avatarUrl!}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                )}
                <div className="ml-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">
                    {t.designation} @ {t.company}
                  </p>
                </div>
              </div>
              <blockquote>“{t.testimonial}”</blockquote>
            </CardContent>
          </Card>
        ))}
      </Marquee>
    </section>
  )
}

export default Testimonials
