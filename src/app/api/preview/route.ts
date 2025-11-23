import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: Request): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  const secret = searchParams.get('secret')

  // Validate preview secret
  if (secret !== process.env.PAYLOAD_PUBLIC_DRAFT_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  // Validate URL exists
  if (!url) {
    return new Response('URL is required', { status: 400 })
  }

  // Extract collection and slug from URL
  const collection = searchParams.get('collection')
  const slug = searchParams.get('slug')

  if (!collection || !slug) {
    return new Response('Collection and slug are required', { status: 400 })
  }

  // Verify the document exists
  try {
    const docs = await payload.find({
      collection: collection as 'pages' | 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      draft: true,
    })

    if (docs.docs.length === 0) {
      return new Response('Document not found', { status: 404 })
    }
  } catch (_error) {
    return new Response('Error fetching document', { status: 500 })
  }

  // Enable Draft Mode
  (await draftMode()).enable()

  // Redirect to the preview URL
  redirect(url)
}
