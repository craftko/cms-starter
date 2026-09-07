import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: {
    group: 'Business',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
    readVersions: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    max: 20,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            { name: 'siteName', type: 'text', required: true, maxLength: 160 },
            { name: 'legalName', type: 'text', maxLength: 200 },
            { name: 'tagline', type: 'text', maxLength: 240 },
            { name: 'description', type: 'textarea', maxLength: 600 },
            { name: 'logo', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'email', type: 'email' },
            { name: 'phoneDisplay', type: 'text', maxLength: 80 },
            { name: 'phoneHref', type: 'text', maxLength: 80 },
            { name: 'address', type: 'textarea', maxLength: 400 },
            { name: 'mapsURL', type: 'text', maxLength: 500 },
            { name: 'bookingURL', type: 'text', maxLength: 500 },
          ],
        },
        {
          label: 'Social links',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              maxRows: 12,
              fields: [
                { name: 'label', type: 'text', required: true, maxLength: 80 },
                { name: 'url', type: 'text', required: true, maxLength: 500 },
              ],
            },
          ],
        },
        {
          label: 'Default SEO',
          fields: [
            { name: 'seoTitle', type: 'text', maxLength: 70 },
            { name: 'seoDescription', type: 'textarea', maxLength: 170 },
            { name: 'seoImage', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}
