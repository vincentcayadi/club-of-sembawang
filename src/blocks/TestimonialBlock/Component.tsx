import React from 'react'

import type { Testimonial, TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export const TestimonialBlock: React.FC<TestimonialBlockProps> = async (props) => {
  const { title, subtitle, selectedTestimonial } = props

  let testimonials: Testimonial[] = []

  if (selectedTestimonial?.length) {
    const filteredselectedTestimonials = selectedTestimonial.map((testimonial) => {
      if (typeof testimonial.value === 'object') return testimonial.value
    }) as Testimonial[]

    testimonials = filteredselectedTestimonials
  }

  return (
    <div className="my-16">
      <div className="container mb-8">
        {title && <h2 className="text-center text-2xl font-bold">{title}</h2>}
        {subtitle && <p className="text-muted-foreground mt-2 text-center">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  {typeof t.avatar === 'object' && t.avatar?.url ? (
                    <AvatarImage src={t.avatar.url} alt={t.name} />
                  ) : (
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle>{t.name}</CardTitle>
                  {t.designation && <CardDescription>{t.designation}</CardDescription>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed whitespace-pre-line">{t.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
