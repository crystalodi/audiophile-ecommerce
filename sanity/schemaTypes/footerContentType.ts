import { defineType, defineField } from "sanity";

export const footerContentType = defineType({
	name: "footerContent",
	title: "Footer Content",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Content Name",
			type: "string",
			description:
				"Internal name for this footer content (used for slug generation)",
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
			name: "footerText",
			title: "Footer Text",
			type: "text",
			rows: 3,
			description: "Summary of who they are and what they do",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "socialMediaLinks",
			title: "Social Media Links",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "platform",
							title: "Platform Name",
							type: "string",
							validation: Rule => Rule.required(),
						}),
						defineField({
							name: "url",
							title: "URL",
							type: "url",
							validation: Rule => Rule.required(),
						}),
						defineField({
							name: "icon",
							title: "Icon",
							type: "string",
							options: {
								list: [
									{ title: "Facebook", value: "facebook" },
									{ title: "Twitter", value: "twitter" },
									{ title: "Instagram", value: "instagram" },
								],
							},
							validation: Rule => Rule.required(),
						}),
					],
					preview: {
						select: {
							title: "platform",
							subtitle: "url",
						},
					},
				},
			],
			validation: Rule => Rule.required().min(1),
		}),
		defineField({
			name: "copyrightText",
			title: "Copyright Text",
			type: "string",
			description:
				"Copyright text without the year (year will be automatically added as current year)",
			placeholder: "All rights reserved",
			validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "copyrightText",
		},
	},
});
