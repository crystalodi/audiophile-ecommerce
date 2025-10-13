import { defineType, defineField } from "sanity";

export const preFooterContentType = defineType({
	name: "preFooterContent",
	title: "Pre Footer Content",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Content Name",
			type: "string",
			description:
				"Internal name for this pre-footer content (used for slug generation)",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "customImageType",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "blockContent",
			description: "Title text displayed with the description",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 4,
			validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			name: "name",
			title: "title",
			media: "image",
			slug: "slug",
		},
		prepare(selection) {
			const { name, title, media, slug } = selection;
			// Extract plain text from block content for subtitle
			const plainTitle =
				title?.[0]?.children?.map((child: any) => child.text).join("") ||
				"No title";

			return {
				title: name,
				subtitle: plainTitle,
				media,
			};
		},
	},
});
