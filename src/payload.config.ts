import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { FAQs } from '@/collections/FAQs'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Projects } from '@/collections/Projects'
import { Services } from '@/collections/Services'
import { Users } from '@/collections/Users'
import { SiteSettings } from '@/globals/SiteSettings'
import { allowedOrigins, env } from '@/lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · CMS',
    },
  },
  collections: [Users, Media, Pages, Services, FAQs, Projects],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({
    push: process.env.PAYLOAD_DB_PUSH === 'true',
    pool: {
      connectionString: env.databaseURL,
      max: 10,
    },
  }),
  secret: env.payloadSecret,
  serverURL: env.serverURL,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  graphQL: {
    disable: true,
  },
  defaultDepth: 1,
  maxDepth: 3,
  defaultMaxTextLength: 10_000,
  debug: process.env.NODE_ENV !== 'production',
  telemetry: false,
  upload: {
    limits: {
      fileSize: 8 * 1024 * 1024,
      files: 1,
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
})
