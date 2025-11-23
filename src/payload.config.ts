import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { plugins } from './plugins'
import { SERVER_URL as FRONTEND_SERVER_URL } from './constants'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.SERVER_URL ||
  FRONTEND_SERVER_URL ||
  'http://localhost:3000'

export default buildConfig({
  admin: {
    meta: {
      title: 'Club Of Sembawang Admin',
      titleSuffix: '',
      description: 'Content dashboard for Club Of Sembawang',
      defaultOGImageType: 'off',
      icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: 'Club Of Sembawang Admin',
        description: 'Content dashboard for Club Of Sembawang',
        images: [`${serverURL}/favicon.ico`],
      },
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Pages, Posts, Media],
  globals: [SiteSettings, Header, Footer],
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins,
})
