import type { Testimonial, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps & { id?: string }> = ({
  id,
  title,
  subtitle,
  selectedTestimonials,
}) => {
  const testimonials: Testimonial[] = (selectedTestimonials ?? [])
    .map((item) => item.value as Testimonial)
    .filter(Boolean)

  if (testimonials.length === 0) {
    return null
  }

  return (
    <div className="my-16" id={id ? `block-${id}` : undefined}>
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
