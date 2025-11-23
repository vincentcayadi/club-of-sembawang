import React from 'react'
import { HeroBlockComponent } from '@/blocks/Hero/Component'
import { AccordionBlockComponent } from '@/blocks/Accordion/Component'
import { CTABlockComponent } from '@/blocks/CTA/Component'
import { GalleryBlockComponent } from '@/blocks/Gallery/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { SponsorsBlockComponent } from '@/blocks/Sponsors/Component'
import { TestimonialsBlockComponent } from '@/blocks/Testiomonials/Component'
import { ParagraphBlockComponent } from '@/blocks/Paragraph/Component'
import { ArchiveBlockComponent } from '@/blocks/Archive/Component'
import type { Page } from '@/payload-types'

interface RenderBlocksProps {
  blocks: Page['layout']
  draft?: boolean
}

export async function RenderBlocks({ blocks, draft }: RenderBlocksProps) {
  if (!blocks?.length) return null

  const rendered = await Promise.all(
    blocks.map(async (block, index) => {
      switch (block.blockType) {
        case 'hero':
          return <HeroBlockComponent key={block.id ?? `hero-${index}`} {...block} />
        case 'paragraph':
          return <ParagraphBlockComponent key={block.id ?? `para-${index}`} {...block} />
        case 'testimonials':
          return <TestimonialsBlockComponent key={block.id ?? `testi-${index}`} {...block} />
        case 'sponsors':
          return <SponsorsBlockComponent key={block.id ?? `sponsors-${index}`} {...block} />
        case 'ctaBlock':
          return <CTABlockComponent key={block.id ?? `cta-${index}`} {...block} />
        case 'gallery':
          return <GalleryBlockComponent key={block.id ?? `gallery-${index}`} {...block} />
        case 'mediaBlock':
          return <MediaBlockComponent key={block.id ?? `media-${index}`} {...block} />
        case 'accordion':
          return <AccordionBlockComponent key={block.id ?? `accordion-${index}`} {...block} />
        case 'archive':
          return (
            <ArchiveBlockComponent
              key={block.id ?? `archive-${index}`}
              {...block}
              draft={draft}
              id={block.id ?? undefined}
            />
          )
        default:
          return null
      }
    }),
  )

  return <>{rendered}</>
}
