import { defineType, defineField } from 'sanity';

export const customImageType = defineType({
  name: 'customImageType',
  type: 'object',
  title: 'Product Image Assets',
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: 'mobile',
      type: 'image',
      options: {
        hotspot: false
      },
      validation: (Rule) => Rule.required().assetRequired()
    }),
    defineField({
      name: 'tablet',
      type: 'image',
      options: {
        hotspot: false
      },
      validation: (Rule) => Rule.required().assetRequired()
    }),
    defineField({
      name: 'desktop',
      type: 'image',
      options: {
        hotspot: false
      },
      validation: (Rule) => Rule.required().assetRequired()
    })
  ]
})