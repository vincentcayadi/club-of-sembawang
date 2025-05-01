import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Parse the server URL to get hostname and protocol
      {
        protocol: new URL(NEXT_PUBLIC_SERVER_URL).protocol.replace(':', ''),
        hostname: new URL(NEXT_PUBLIC_SERVER_URL).hostname,
        pathname: '/api/media/**',
      },
      // Additional allowed patterns
      {
        protocol: 'https',
        hostname: '**.uploadthing.com',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig)
