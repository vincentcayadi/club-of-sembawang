import { SERVER_URL } from '@/constants'

/**
 * Generates a preview URL for draft content
 */
export const generatePreviewURL = ({
  collection,
  slug,
  path,
}: {
  collection: 'pages' | 'posts'
  slug: string
  path?: string
}): string => {
  const previewPath = path || `/${slug}`
  const secret = process.env.PAYLOAD_PUBLIC_DRAFT_SECRET || 'demo-secret-123'

  const params = new URLSearchParams({
    url: previewPath,
    secret,
    collection,
    slug,
  })

  return `${SERVER_URL}/api/preview?${params.toString()}`
}
