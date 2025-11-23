import sharp from 'sharp'

export async function getBlurDataURL(imageUrl: string): Promise<string | undefined> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl)
    if (!response.ok) return undefined

    const buffer = await response.arrayBuffer()

    // Generate a small blurred version
    const blurBuffer = await sharp(Buffer.from(buffer))
      .resize(10) // Very small for fast loading
      .blur(10)
      .webp({ quality: 20 })
      .toBuffer()

    // Convert to base64
    const base64 = blurBuffer.toString('base64')
    return `data:image/webp;base64,${base64}`
  } catch (error) {
    console.error('Error generating blur placeholder:', error)
    return undefined
  }
}
