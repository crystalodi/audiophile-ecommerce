import { BasketIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Products',
  icon: BasketIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'shortName',
      title: "Product Short Name",
      type: 'string',
      description: 'A shorter name for the product'
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'categoryImage',
      type: 'customImageType'
    }),
    defineField({
      name: 'image',
      type: 'customImageType'
    }),
    defineField({
      name: 'features',
      type: 'blockContent',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'isNewProduct',
      type: 'boolean'
    }),
    defineField({
      name: 'includes',
      title: 'Included in the box',
      type: 'array',
      validation: (Rule) => Rule.min(1),
      of: [{type: 'customIncludesType'}]
    }),
    defineField({
      name: 'gallery',
      type: 'object',
      title: 'Gallery Images',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'first',
          title: 'First Image',
          type: 'customImageType'
        }),
        defineField({
          name: 'second',
          title: 'Second Gallery Image',
          type: 'customImageType'
        }),
        defineField({
          name: 'third',
          title: 'Third Gallery Image',
          type: 'customImageType'
        })
      ]
    }),
    defineField({
      name: 'others',
      title: 'Related Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }]
    }),
    defineField({
      name: 'price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: 'stock',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    })
  ],
  preview: {
    select: {
      title: 'productName',
      categoryName: 'category.categoryName'
    },
    prepare({title, categoryName}) {
      return {
        title,
        subtitle: categoryName
      }
    }
  }
});