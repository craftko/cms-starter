import type { Field } from 'payload'

export const slugField = (): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    description: 'Lowercase URL value, for example: facial-treatments',
    position: 'sidebar',
  },
  validate: (value: unknown) => {
    if (typeof value !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      return 'Use lowercase letters, numbers and hyphens only.'
    }
    return true
  },
})

export const sortOrderField = (): Field => ({
  name: 'sortOrder',
  type: 'number',
  defaultValue: 0,
  index: true,
  admin: {
    position: 'sidebar',
    step: 1,
  },
})

export const seoFields = (): Field => ({
  name: 'seo',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      maxLength: 70,
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 170,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
})
