// Environment
export const PRODUCTION_ENVIRONMENT = 'production'
export const DEVELOPMENT_ENVIRONMENT = 'development'

// Site
export const SITE_NAME_DEFAULT = 'Club of Sembawang'
export const SITE_DESCRIPTION_DEFAULT = "Singapore's first public health initiative"
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || SITE_NAME_DEFAULT
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Collections
export const COLLECTION_SLUGS = {
  PAGES: 'pages',
  POSTS: 'posts',
  MEDIA: 'media',
  USERS: 'users',
} as const

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  USER: 'user',
} as const

// Status
export const CONTENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const
