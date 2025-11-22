import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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
    ogImage = post.headerImage.url
  } else if (post.meta?.image && typeof post.meta.image === 'object' && 'url' in post.meta.image) {
    ogImage = post.meta.image.url
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
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.excerpt && <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>}
      {/* TODO: Render rich text content from post.content */}
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </article>
  )
}
