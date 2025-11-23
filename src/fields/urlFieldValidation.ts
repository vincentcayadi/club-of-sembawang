import type { TextField } from 'payload'

interface UrlFieldOptions {
  name: string
  label?: string
  required?: boolean
  checkExternalLinks?: boolean
  validateInternalPaths?: boolean
  admin?: TextField['admin']
}

export const createUrlField = ({
  name,
  label,
  required = false,
  checkExternalLinks = true,
  validateInternalPaths = true,
  admin,
}: UrlFieldOptions): TextField => ({
  name,
  type: 'text',
  label: label || 'URL',
  required,
  admin: {
    placeholder: '/about or https://example.com',
    description: 'Internal path (/about) or external URL (https://example.com)',
    ...admin,
  },
  validate: async (value, options) => {
    const { req, required } = options

    if (!value) {
      return required ? 'URL is requiored' : true
    }

    const trimmedValue = value.trim()

    // Internal path
    if (trimmedValue.startsWith('/')) {
      if (!/^\/[a-zA-Z0-9-_/]*$/.test(trimmedValue)) {
        return 'Internal path can only contain letters, numbers, hyphens, and slashes'
      }

      if (validateInternalPaths && req?.payload) {
        const slug = trimmedValue.replace(/^\//, '').replace(/\/$/, '')
        const hardcodedRoutes = ['/', '/posts', '/admin']
        if (hardcodedRoutes.includes(trimmedValue)) return true

        try {
          if (slug === 'home') {
            return 'Cannot link to "/home" directly. The home page is accessed at "/" (root)'
          }

          const pages = await req.payload.find({
            collection: 'pages',
            where: { slug: { equals: slug } },
            limit: 1,
          })
          if (pages.docs.length > 0) return true

          const posts = await req.payload.find({
            collection: 'posts',
            where: { slug: { equals: slug } },
            limit: 1,
          })
          if (posts.docs.length > 0) return true

          return `Path "${trimmedValue}" does not exist. Did you mean something else?`
        } catch {
          return true
        }
      }

      return true
    }

    // External URL
    if (checkExternalLinks) {
      try {
        const url = new URL(trimmedValue)
        if (!['http:', 'https:'].includes(url.protocol)) {
          return 'External URL must start with http:// or https://'
        }
        return true
      } catch {
        return 'Please enter a valid URL (e.g., https://example.com) or internal path (e.g., /about)'
      }
    }

    return true
  },
})
