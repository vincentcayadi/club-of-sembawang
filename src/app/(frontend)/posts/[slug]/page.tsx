import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { RenderLexical } from '@/components/RenderLexical'
import { ArrowLeft } from 'lucide-react'

interface PostProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return posts.docs.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: isDraftMode,
  })

  const post = result.docs[0]

  if (!post) {
    return {}
  }

  // Get header image or meta image
  let ogImage: string | undefined

  if (post.headerImage && typeof post.headerImage === 'object' && 'url' in post.headerImage) {
    ogImage = post.headerImage.url || undefined
  } else if (post.meta?.image && typeof post.meta.image === 'object' && 'url' in post.meta.image) {
    ogImage = post.meta.image.url || undefined
  }

  return {
    title: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt,
    openGraph: {
      title: post.meta?.title || post.title || '',
      description: post.meta?.description || post.excerpt || '',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${slug}`,
      type: 'article',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta?.title || post.title || '',
      description: post.meta?.description || post.excerpt || '',
      images: ogImage ? [ogImage] : [],
    },
  }
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

export default async function Post({ params }: PostProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: isDraftMode,
  })

  const post = result.docs[0]

  if (!post) {
    return notFound()
  }

  const readingTime = calculateReadingTime(post.content)
  const publishDate = formatDate(post.publishedAt)
  const authorName =
    post.author && typeof post.author === 'object' && 'name' in post.author
      ? post.author.name
      : null

  return (
    <article className="container mx-auto px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to posts</span>
        </Link>

        <header className="mb-12">
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg leading-relaxed text-muted-foreground border-l-4 border-primary/30 pl-4 py-2 mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {authorName && <span>{authorName}</span>}
            {authorName && (publishDate || readingTime) && <span>•</span>}
            {publishDate && <time>{publishDate}</time>}
            {publishDate && readingTime && <span>•</span>}
            {readingTime && <span>{readingTime} min read</span>}
          </div>
        </header>

        {post.headerImage && typeof post.headerImage === 'object' && post.headerImage.url && (
          <div className="relative mb-12 aspect-video overflow-hidden rounded-xl border border-border/50 shadow-lg">
            <Image
              src={post.headerImage.url}
              alt={post.headerImage.alt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:border prose-img:border-border/50">
          <RenderLexical content={post.content} />
        </div>
      </div>
    </article>
  )
}
