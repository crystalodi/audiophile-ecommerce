import { defineType, defineField } from 'sanity'

export const customIncludesType = defineType({
  name: 'customIncludesType',
  type: 'object',
  fields: [
    defineField({
      name: 'quantity',
      type: 'number',
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'item',
      type: 'string',
      validation: (Rule) => Rule.required()
    })
  ]
})