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

const ArchiveCard = ({ post }: { post: Post }) => {
  const href = `/posts/${post.slug}`
  const heroMedia = getMediaInfo(
    (post as Post & { headerImage?: Media | number | null }).headerImage as
      | Media
      | number
      | null
      | undefined,
  )

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {heroMedia?.url && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={heroMedia.url}
            alt={heroMedia.alt}
            width={heroMedia.width ?? 1200}
            height={heroMedia.height ?? 700}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
        {post.excerpt && <p className="text-sm text-muted-foreground">{post.excerpt}</p>}
        <span className="mt-auto text-sm font-semibold text-primary">Read more →</span>
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

  if (!posts || posts.length === 0) {
    return (
      <section className="my-12" id={id ? `block-${id}` : undefined}>
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
    <section className="my-12" id={id ? `block-${id}` : undefined}>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6">
        {introContent && (
          <RenderLexical
            content={introContent}
            className="prose prose-lg max-w-3xl text-muted-foreground"
          />
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <ArchiveCard key={`${post.id ?? post.slug ?? 'post'}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
