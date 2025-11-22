import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url') || '/'

  ;(await draftMode()).disable()

  redirect(url)
}
