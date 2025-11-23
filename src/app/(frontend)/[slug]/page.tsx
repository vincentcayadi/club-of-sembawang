import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RenderBlocks } from '@/components/RenderBlocks'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return pages.docs
    .filter((page) => page.slug !== 'home')
    .map((page) => ({
      slug: page.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: slug,
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
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${slug}`,
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: isDraftMode,
  })

  const page = result.docs[0]

  if (!page) {
    return notFound()
  }

  return <RenderBlocks blocks={page.layout} draft={isDraftMode} />
}
