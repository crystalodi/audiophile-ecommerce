import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
	name: "category",
	title: "Product Category",
	type: "document",
	icon: TagIcon,
	fields: [
		defineField({
			name: "categoryName",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "categoryName",
			},
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "description",
			type: "text",
		}),
		defineField({
			name: "categoryThumbnail",
			type: "image",
			options: {
				hotspot: false,
			},
			validation: Rule => Rule.required().assetRequired(),
		}),
	],
});
