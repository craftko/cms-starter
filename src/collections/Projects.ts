import type { CollectionConfig } from 'payload'

import { isAdmin, isAuthenticated, publishedOrAuthenticated } from '@/access'
import { seoFields, slugField, sortOrderField } from '@/fields/common'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'featured', '_status', 'sortOrder'],
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
      name: 'client',
      type: 'text',
      maxLength: 160,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 400,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          maxLength: 240,
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      maxRows: 20,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          maxLength: 60,
        },
      ],
    },
    {
      name: 'projectURL',
      type: 'text',
      maxLength: 500,
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
