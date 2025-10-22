import { defineType, defineField } from "sanity";
import { ComposeSparklesIcon } from "@sanity/icons";

export const heroContentType = defineType({
	name: "heroContent",
	title: "Hero Content",
	type: "document",
	icon: ComposeSparklesIcon,
	fields: [
		defineField({
			name: "heroBackgroundImage",
			title: "Hero Background Image",
			type: "customImageType",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "featuredProduct",
			description:
				"Product That will be featured in Hero with CTA to view the product.",
			type: "reference",
			to: [{ type: "product" }],
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "featuredProductDescription",
			type: "text",
			description: "A short description for featuredProduct",
			rows: 2,
			validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "featuredProduct.productName",
			subtitle: "featuredProductDescription",
			media: "heroBackgroundImage",
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: title ? `Hero: ${title}` : "Hero Content",
				subtitle: subtitle || "No description",
				media: media,
			};
		},
	},
});
