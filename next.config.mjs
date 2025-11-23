import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: (() => {
      const patterns = []
      const envURL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL
      const addHost = (urlString) => {
        try {
          const parsed = new URL(urlString)
          patterns.push({
            protocol: parsed.protocol.replace(':', ''),
            hostname: parsed.hostname,
            port: parsed.port || undefined,
          })
        } catch {
          // ignore invalid URLs
        }
      }
      if (envURL) addHost(envURL)
      addHost('https://club-of-sembawang.vercel.app')
      addHost('http://localhost:3000')
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
