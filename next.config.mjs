import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: (() => {
      const patterns = []

      // Allow R2 public URL for image optimization
      const r2PublicUrl = process.env.R2_PUBLIC_URL
      if (r2PublicUrl) {
        try {
          const url = new URL(r2PublicUrl)
          patterns.push({
            protocol: url.protocol.replace(':', ''),
            hostname: url.hostname,
            pathname: '/**',
          })
        } catch {
          // Fallback if R2_PUBLIC_URL is already just a hostname
          patterns.push({
            protocol: 'https',
            hostname: r2PublicUrl,
            pathname: '/**',
          })
        }
      }

      // Fallback to R2 storage hostname if public URL not set
      const r2AccountId = process.env.R2_ACCOUNT_ID
      if (r2AccountId) {
        patterns.push({
          protocol: 'https',
          hostname: `${r2AccountId}.r2.cloudflarestorage.com`,
          pathname: '/**',
        })
      }

      // Local development only
      if (process.env.NODE_ENV === 'development') {
        patterns.push({
          protocol: 'http',
          hostname: 'localhost',
          port: '3000',
        })
      }

      return patterns
    })(),
  },
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
