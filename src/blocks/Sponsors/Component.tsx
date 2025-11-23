import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Media, SponsorsBlock } from '@/payload-types'

function getMediaInfo(media: Media | number | null | undefined) {
  if (media && typeof media === 'object' && 'url' in media) {
    return {
      url: media.url,
      alt: media.alt || '',
      width: media.width || 400,
      height: media.height || 200,
    }
  }

  return null
}

export function SponsorsBlockComponent({ heading, subheading, logos }: SponsorsBlock) {
  const logosToShow = logos || []
  if (!logosToShow.length) return null

  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        {(heading || subheading) && (
          <div className="mb-8 space-y-2 text-center">
            {heading && <h2 className="text-3xl font-semibold">{heading}</h2>}
            {subheading && <p className="text-muted-foreground">{subheading}</p>}
          </div>
        )}
        <div className="grid grid-cols-2 gap-6 rounded-2xl border bg-muted/50 p-8 md:grid-cols-3 lg:grid-cols-4">
          {logosToShow.map((logo) => {
            const media = getMediaInfo(logo.logo)
            if (!media) return null
            return (
              <Link
                key={logo.id || logo.name}
                href={logo.url || '#'}
              className={cn(
                'flex items-center justify-center rounded-xl border bg-card p-4 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md',
                'saturate-0 hover:saturate-100',
              )}
            >
                {media.url && (
                  <Image
                    src={media.url}
                    alt={media.alt}
                    width={media.width || 160}
                    height={media.height || 80}
                    sizes="(max-width: 640px) 40vw, 160px"
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
