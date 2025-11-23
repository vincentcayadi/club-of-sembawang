import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { RenderLexical } from '@/components/RenderLexical'

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

  return (
    <article className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {post.headerImage && typeof post.headerImage === 'object' && post.headerImage.url && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
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
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        {post.excerpt && <p className="mb-8 text-xl text-muted-foreground">{post.excerpt}</p>}
        <div className="prose prose-lg max-w-3xl">
          <RenderLexical content={post.content} />
        </div>
      </div>
    </article>
  )
}
