import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from 'payload/i18n/en'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
// import { seoPlugin } from '@payloadcms/plugin-seo'
// import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { PagesCollection } from '@/app/collections/Pages'
import { PostsCollection } from '@/app/collections/Posts'
import { Users } from '@/app/collections/Users'
import { Media } from '@/app/collections/Media'

import { Header } from '@/app/globals/Header'
import { Footer } from '@/app/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  globals: [Header, Footer],
  collections: [PagesCollection, PostsCollection, Users, Media],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || '',
    },
  }),
  i18n: {
    supportedLanguages: { en },
  },
  sharp,
  plugins: [
    // seoPlugin({
    //   generateTitle,
    //   generateURL,
    // }),
  ],
})
