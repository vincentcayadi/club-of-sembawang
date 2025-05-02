import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const S3_ENDPOINT = process.env.S3_ENDPOINT || ''
const s3Url = new URL(S3_ENDPOINT)


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        protocol: s3Url.protocol.replace(':', ''),
        hostname: s3Url.hostname,
        pathname: `${s3Url.pathname.replace(/\/$/, '')}/**`,
      },
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })