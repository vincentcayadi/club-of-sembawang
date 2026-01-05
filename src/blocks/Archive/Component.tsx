import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderLexical } from '@/components/RenderLexical'
import type { ArchiveBlock as ArchiveBlockProps, Media, Post } from '@/payload-types'

type ArchiveBlockComponentProps = ArchiveBlockProps & { id?: string; draft?: boolean }

const normalizeSelected = (selectedDocs: ArchiveBlockProps['selectedDocs']) => {
  const entries = selectedDocs || []
  const flattened = entries
    .map((entry) => {
      if (!entry) return null
      if ('value' in entry) return entry.value as Post
      return entry as unknown as Post
    })
    .filter(Boolean) as Post[]
  return flattened
}

const fetchCollectionDocs = async (
  collection: NonNullable<ArchiveBlockProps['relationTo']>,
  limit?: number,
  draft?: boolean,
) => {
  const payload = await getPayload({ config: await configPromise })
  const docs = await payload.find({
    collection,
    depth: 2,
    limit: limit ?? 6,
    draft,
    where: {
      and: [
        {
          or: [
            { _status: { equals: 'published' } },
            { _status: { exists: false } },
          ],
        },
        {
          or: [
            { publishedAt: { exists: false } },
            { publishedAt: { less_than_equal: new Date().toISOString() } },
          ],
        },
      ],
    },
  })
  return docs.docs as Post[]
}

const getMediaInfo = (media: Media | number | null | undefined) => {
  if (media && typeof media === 'object' && 'url' in media) {
    return {
      url: media.url,
      alt: media.alt || '',
      width: media.width || 1200,
      height: media.height || 700,
    }
  }
  return null
}

const calculateReadingTime = (content: any): number => {
  if (!content) return 1
  const text = JSON.stringify(content)
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

const formatDate = (dateString?: string | null): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

const ArchiveCard = ({ post }: { post: Post }) => {
  if (!post.slug) {
    console.error('Post missing slug:', post)
    return null
  }

  const href = `/posts/${post.slug}`
  const heroMedia = getMediaInfo(
    (post as Post & { headerImage?: Media | number | null }).headerImage as
      | Media
      | number
      | null
      | undefined,
  )

  const readingTime = calculateReadingTime((post as any).content)
  const publishDate = formatDate(post.publishedAt)
  const authorName =
    post.author && typeof post.author === 'object' && 'name' in post.author
      ? post.author.name
      : null

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-border"
    >
      {heroMedia?.url && (
        <div className="relative h-56 w-full overflow-hidden bg-muted">
          <Image
            src={heroMedia.url}
            alt={heroMedia.alt}
            width={heroMedia.width ?? 1200}
            height={heroMedia.height ?? 700}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {(authorName || publishDate || readingTime) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {authorName && <span>{authorName}</span>}
            {authorName && (publishDate || readingTime) && <span>•</span>}
            {publishDate && <time>{publishDate}</time>}
            {publishDate && readingTime && <span>•</span>}
            {readingTime && <span>{readingTime} min read</span>}
          </div>
        )}

        <div className="mt-auto flex justify-end pt-2">
          <svg
            className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export const ArchiveBlockComponent = async ({
  id,
  introContent,
  populateBy,
  relationTo = 'posts',
  limit,
  selectedDocs,
  draft,
}: ArchiveBlockComponentProps) => {
  const collection = relationTo || 'posts'
  let posts: Post[] = []
  try {
    posts =
      populateBy === 'selection' && selectedDocs?.length
        ? normalizeSelected(selectedDocs)
        : await fetchCollectionDocs(collection, limit ?? undefined, draft)
  } catch (error) {
    console.error('Archive block failed to load posts', error)
  }

  const validPosts = posts.filter(post => post && post.slug)

  if (!validPosts || validPosts.length === 0) {
    return (
      <section className="block-spacing" id={id ? `block-${id}` : undefined}>
        <div className="mx-auto max-w-5xl px-6">
          {introContent && (
            <RenderLexical
              content={introContent}
              className="prose prose-lg max-w-3xl text-muted-foreground"
            />
          )}
          <p className="mt-4 rounded-lg border border-border/60 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            No posts available right now.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="block-spacing" id={id ? `block-${id}` : undefined}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        {introContent && (
          <RenderLexical
            content={introContent}
            className="prose prose-xl max-w-3xl mx-auto text-center"
          />
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {validPosts.map((post) => (
            <ArchiveCard key={`${post.id ?? post.slug ?? 'post'}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
