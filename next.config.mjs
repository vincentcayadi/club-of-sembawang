import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: (() => {
      const patterns = []

      // Only allow R2 bucket images for optimization (saves Vercel costs)
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
