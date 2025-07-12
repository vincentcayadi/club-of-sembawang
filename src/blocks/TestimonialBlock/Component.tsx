import type { Testimonial, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { Marquee } from '@devnomic/marquee'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps & { id?: string }> = async (
  props,
) => {
  const { id, title, subtitle, populateBy, limit: limitFromProps, selectedDocs } = props

  const limit = limitFromProps || 3

  let testimonials: Testimonial[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedTestimonials = await payload.find({
      collection: 'testimonials',
      depth: 1,
      limit,
    })

    testimonials = fetchedTestimonials.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedTestimonials = selectedDocs.map((testimonial) => {
        if (typeof testimonial.value === 'object') return testimonial.value
      }) as Testimonial[]

      testimonials = filteredSelectedTestimonials
    }
  }

  return (
    <div className="my-16" id={id ? `block-${id}` : undefined}>
      <div className="container mb-16">
        {title && <h2 className="text-center text-2xl font-bold">{title}</h2>}
        {subtitle && <p className="text-muted-foreground mt-2 text-center">{subtitle}</p>}
      </div>

      <Marquee>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="mx-4">
            <Card className="max-w-xs">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {/* <Avatar>
                    {testimonial.avatar?.url ? (
                      <AvatarImage src={testimonial.avatar.url} alt={testimonial.name} />
                    ) : (
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar> */}
                  <div>
                    <CardTitle>{testimonial.name}</CardTitle>
                    {testimonial.designation && (
                      <CardDescription>{testimonial.designation}</CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Render textarea content as plain text */}
                <p className="text-sm leading-relaxed whitespace-pre-line">{testimonial.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
