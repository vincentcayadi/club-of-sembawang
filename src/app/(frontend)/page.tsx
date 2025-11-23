import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { RenderBlocks } from '@/components/RenderBlocks'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: 'home',
      },
    },
    draft: isDraftMode,
  })

  const page = result.docs[0]

  if (!page) {
    return {}
  }

  const ogImage =
    page.meta?.image && typeof page.meta.image === 'object' && 'url' in page.meta.image
      ? page.meta.image.url
      : undefined

  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description || page.excerpt,
    openGraph: {
      title: page.meta?.title || page.title || '',
      description: page.meta?.description || page.excerpt || '',
      url: process.env.NEXT_PUBLIC_SERVER_URL || '',
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
      title: page.meta?.title || page.title || '',
      description: page.meta?.description || page.excerpt || '',
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: 'home',
      },
    },
    draft: isDraftMode,
  })

  const page = result.docs[0]

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome</h1>
        <p>No home page found. Create a page with slug "home" in the admin panel.</p>
      </div>
    )
  }

  return <RenderBlocks blocks={page.layout} draft={isDraftMode} />
}
