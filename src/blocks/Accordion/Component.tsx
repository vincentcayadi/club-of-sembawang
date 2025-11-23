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
    <section className="mx-auto w-full max-w-4xl px-4 py-16">
      {header && (
        <h2
          className={cn(
            'mb-4 text-4xl font-bold tracking-tight',
            alignmentClasses[alignment || 'center'],
          )}
        >
          {header}
        </h2>
      )}
      {description && (
        <p className={cn('mb-12 text-lg text-gray-500', alignmentClasses[alignment || 'center'])}>
          {description}
        </p>
      )}
      <Accordion type="single" collapsible className="mt-8">
        {items?.map((item) => (
          <AccordionItem key={item.id} value={item.id || ''}>
            <AccordionTrigger className="text-left text-lg font-medium text-gray-700 hover:text-gray-600">
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
