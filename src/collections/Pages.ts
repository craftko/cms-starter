import type { CollectionConfig } from 'payload'

import { isAdmin, isAuthenticated, publishedOrAuthenticated } from '@/access'
import { seoFields, slugField, sortOrderField } from '@/fields/common'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: isAuthenticated,
    read: publishedOrAuthenticated,
    update: isAuthenticated,
    delete: isAdmin,
    readVersions: isAuthenticated,
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 160,
    },
    slugField(),
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 320,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    sortOrderField(),
    seoFields(),
  ],
}
