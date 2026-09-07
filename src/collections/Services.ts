import type { CollectionConfig } from 'payload'

import { isAdmin, isAuthenticated, publishedOrAuthenticated } from '@/access'
import { seoFields, slugField, sortOrderField } from '@/fields/common'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priceLabel', 'featured', '_status', 'sortOrder'],
    group: 'Business',
  },
  access: {
    create: isAuthenticated,
    read: publishedOrAuthenticated,
    update: isAuthenticated,
    delete: isAdmin,
    readVersions: isAuthenticated,
  },
  defaultSort: 'sortOrder',
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
      required: true,
      maxLength: 320,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'priceLabel',
      type: 'text',
      maxLength: 80,
      admin: {
        description: 'Display value only, for example: from 150 zł',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', maxLength: 60 },
        { name: 'url', type: 'text', maxLength: 500 },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
    },
    sortOrderField(),
    seoFields(),
  ],
}
