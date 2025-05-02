import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'
import Link from 'next/link'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { formatAuthors } from '@/utilities/formatAuthors'
import { ChevronLeft } from 'lucide-react'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-0">
      <Link className={buttonVariants({ variant: 'outline' })} href="/posts">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="mt-4 flex flex-col gap-8">
        <div className="max-h-[400px] overflow-hidden rounded-xl">
          {heroImage && typeof heroImage !== 'string' && (
            <Media className="w-full object-cover" resource={heroImage} />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {categories
              ?.filter((cat) => typeof cat === 'object' && cat !== null)
              .map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category.title || 'Untitled category'}
                </Badge>
              ))}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>

          <div className="flex items-center gap-4">
            {populatedAuthors && (
              <div className="flex flex-col gap-1 font-medium">
                {populatedAuthors.map((author, index) => {
                  const { name } = author

                  const isLast = index === populatedAuthors.length - 1
                  const secondToLast = index === populatedAuthors.length - 2

                  return (
                    <React.Fragment key={index}>
                      {name}
                      {secondToLast && populatedAuthors.length > 2 && (
                        <React.Fragment>, </React.Fragment>
                      )}
                      {secondToLast && populatedAuthors.length === 2 && (
                        <React.Fragment> </React.Fragment>
                      )}
                      {!isLast && populatedAuthors.length > 1 && (
                        <React.Fragment>and </React.Fragment>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            )}
            {publishedAt && (
              <p className="text-sm text-muted-foreground">
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
