import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homePageContentType = defineType({
	name: "homePageContent",
	title: "Home Page Content",
	type: "document",
	icon: HomeIcon,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "featuredProducts",
			title: "Featured Products",
			type: "array",
			validation: Rule => Rule.min(1),
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "product",
							title: "Product",
							type: "reference",
							to: [{ type: "product" }],
							validation: Rule => Rule.required(),
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
							description:
								"Optional custom description for this featured product",
						}),
						defineField({
							name: "layoutType",
							title: "Layout Type",
							type: "string",
							validation: Rule => Rule.required(),
							options: {
								list: [
									{ title: "Grid with Bitmap Image", value: "grid" },
									{ title: "Hero w/ Background Image", value: "hero" },
								],
							},
						}),
						defineField({
							name: "backgroundType",
							title: "Background Type",
							type: "string",
							options: {
								list: [
									{ title: "SVG Background", value: "svg" },
									{ title: "Bitmap Image", value: "bitmap" },
								],
							},
							hidden: ({ parent }) => parent?.layoutType !== "hero",
							validation: Rule =>
								Rule.custom((value, context) => {
									const parent = context.parent as { layoutType?: string };
									const layoutType = parent?.layoutType;
									if (layoutType === "hero" && !value) {
										return "Background type is required for Hero layout";
									}
									return true;
								}),
						}),
						defineField({
							name: "heroBitmapBackgroundImage",
							title: "Hero Bitmap Background Image",
							type: "customImageType",
							hidden: ({ parent }) => parent?.backgroundType !== "bitmap",
							validation: Rule =>
								Rule.custom((value, context) => {
									const parent = context.parent as {
										backgroundType: string;
										layoutType: string;
									};
									const layoutType = parent.layoutType;
									const backgroundType = parent.backgroundType;
									if (
										layoutType === "hero" &&
										backgroundType === "bitmap" &&
										!value
									) {
										return "Hero bitmap background image is required when background type is bitmap image and layout type is hero";
									}
									return true;
								}),
						}),
						defineField({
							name: "heroSVGBackgroundImage",
							title: "Hero SVG Background Image",
							type: "file",
							options: {
								accept: ".svg",
							},
							hidden: ({ parent }) => parent?.backgroundType !== "svg",
							validation: Rule =>
								Rule.custom((value, context) => {
									const parent = context.parent as {
										backgroundType: string;
										layoutType: string;
									};
									const layoutType = parent.layoutType;
									const backgroundType = parent.backgroundType;
									if (
										layoutType === "hero" &&
										backgroundType === "svg" &&
										!value
									) {
										return "Hero svg background image is required when background type is svg image and layout type is hero";
									}
									return true;
								}),
						}),
						defineField({
							name: "featuredProductImage",
							title: "Featured Product Image",
							type: "customImageType",
							validation: Rule =>
								Rule.custom((value, context) => {
									const parent = context.parent as {
										layoutType: string;
									};
									const layoutType = parent.layoutType;
									if (layoutType === "grid" && !value) {
										return "Featured product image is required when layout type is grid";
									}
									return true;
								}),
						}),
						defineField({
							name: "ctaType",
							title: "CTA Type",
							type: "string",
							validation: Rule => Rule.required(),
							options: {
								list: [
									{ title: "Transparent Button", value: "transparentButton" },
									{ title: "Black Button", value: "blackButton" },
								],
							},
						}),
						defineField({
							name: "textAlignment",
							title: "Text Alignment",
							type: "object",
							description: "Control text alignment for different screen sizes",
							validation: Rule => Rule.required(),
							fields: [
								defineField({
									name: "mobile",
									title: "Mobile Text Alignment",
									type: "string",
									options: {
										list: [
											{ title: "Left", value: "left" },
											{ title: "Center", value: "center" },
											{ title: "Right", value: "right" },
										],
									},
									validation: Rule => Rule.required(),
								}),
								defineField({
									name: "tablet",
									title: "Tablet Text Alignment",
									type: "string",
									options: {
										list: [
											{ title: "Left", value: "left" },
											{ title: "Center", value: "center" },
											{ title: "Right", value: "right" },
										],
									},
									validation: Rule => Rule.required(),
								}),
								defineField({
									name: "desktop",
									title: "Desktop Text Alignment",
									type: "string",
									options: {
										list: [
											{ title: "Left", value: "left" },
											{ title: "Center", value: "center" },
											{ title: "Right", value: "right" },
										],
									},
									validation: Rule => Rule.required(),
								}),
							],
						}),
						defineField({
							name: "height",
							title: "Card Height (pixels)",
							type: "object",
							description:
								"Custom height for this featured product card on different devices",
							validation: Rule => Rule.required(),
							fields: [
								defineField({
									name: "mobile",
									title: "Mobile Height",
									type: "number",
									description: "Height in pixels",
									validation: Rule => Rule.required().min(1),
								}),
								defineField({
									name: "tablet",
									title: "Tablet Height",
									type: "number",
									description: "Height in pixels",
									validation: Rule => Rule.required().min(1),
								}),
								defineField({
									name: "desktop",
									title: "Desktop Height",
									type: "number",
									description: "Height in pixels",
									validation: Rule => Rule.required().min(1),
								}),
							],
						}),
					],
					preview: {
						select: {
							title: "product.productName",
						},
					},
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
		},
	},
});
