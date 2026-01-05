'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { RenderLexical } from '@/components/RenderLexical'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { AccordionBlock } from '@/payload-types'

export function AccordionBlockComponent({ header, description, alignment, items }: AccordionBlock) {
  const alignmentClasses = {
    center: 'text-center',
    left: 'text-left',
  }

  return (
    <section className="mx-auto w-full max-w-4xl block-spacing">
      {header && (
        <h2
          className={cn(
            'mb-3 text-3xl font-bold leading-tight tracking-tight md:mb-4 md:text-4xl',
            alignmentClasses[alignment || 'center'],
          )}
        >
          {header}
        </h2>
      )}
      {description && (
        <p
          className={cn(
            'mb-8 text-base text-gray-500 md:mb-12 md:text-lg',
            alignmentClasses[alignment || 'center'],
          )}
        >
          {description}
        </p>
      )}
      <Accordion type="single" collapsible className="mt-8">
        {items?.map((item) => (
          <AccordionItem key={item.id} value={item.id || ''}>
            <AccordionTrigger className="text-left text-base font-medium text-gray-700 hover:text-gray-600 md:text-lg">
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              <RenderLexical
                content={item.content}
                className="prose prose-sm max-w-3xl text-muted-foreground"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
