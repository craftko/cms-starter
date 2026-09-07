import type { CollectionConfig } from 'payload'

import { isAdmin, isAuthenticated, publishedOrAuthenticated } from '@/access'
import { sortOrderField } from '@/fields/common'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', '_status', 'sortOrder'],
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
      name: 'question',
      type: 'text',
      required: true,
      maxLength: 240,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      maxLength: 4000,
    },
    {
      name: 'category',
      type: 'text',
      maxLength: 100,
      index: true,
    },
    sortOrderField(),
  ],
}
