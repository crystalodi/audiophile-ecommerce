import { MenuIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const navigationMenuType = defineType({
	name: "navigationMenu",
	title: "Navigation Menu",
	icon: MenuIcon,
	type: "document",
	fields: [
		defineField({
			name: "menuType",
			title: "Menu Type",
			type: "string",
			options: {
				list: [
					{ title: "Header", value: "header" },
					{ title: "Footer", value: "footer" },
					{ title: "Mobile", value: "mobile" },
					{ title: "Content", value: "content" },
				],
			},
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			validation: Rule => Rule.required(),
			options: {
				source: "menuType",
				maxLength: 50,
			},
		}),
		defineField({
			name: "showLogo",
			title: "Show Logo",
			type: "boolean",
			initialValue: ({ parent }) => {
				const menuType = parent?.menuType;
				return menuType === "header" || menuType === "footer";
			},
			description:
				"Set based on menu type: Header/Footer show logo, Mobile/Content don't",
		}),
		defineField({
			name: "navigationItems",
			title: "Navigation Items",
			type: "array",
			validation: Rule => Rule.min(1),
			of: [
				{
					type: "object",
					name: "navigationItemObject",
					fields: [
						defineField({
							name: "title",
							title: "Link Title",
							type: "string",
							validation: Rule => Rule.required(),
						}),
						defineField({
							name: "href",
							title: "Link URL",
							type: "string",
							validation: Rule => Rule.required(),
						}),
						defineField({
							name: "image",
							title: "Navigation Image",
							type: "image",
							options: {
								hotspot: false,
							},
							fields: [
								defineField({
									name: "alt",
									title: "Alt text",
									type: "string",
									validation: Rule => Rule.required(),
								}),
							],
							description:
								"Image for stylized navigation items (mobile/content menus)",
							hidden: ({ document }) => {
								const menuType = document?.menuType;
								return menuType !== "mobile" && menuType !== "content";
							},
							validation: Rule =>
								Rule.custom((value, context) => {
									const document = context.document;
									const menuType = document?.menuType;

									// Require image for mobile and content menu types
									if (
										(menuType === "mobile" || menuType === "content") &&
										!value
									) {
										return "Image is required for mobile and content menu items";
									}

									return true;
								}),
						}),
						defineField({
							name: "order",
							title: "Display Order",
							type: "number",
							validation: Rule => Rule.required().min(0),
						}),
						defineField({
							name: "isActive",
							title: "Active",
							type: "boolean",
							initialValue: true,
						}),
					],
					preview: {
						select: {
							title: "title",
							href: "href",
							order: "order",
							image: "image",
						},
						prepare({ title, href, order, image }) {
							return {
								title,
								subtitle: `${href} • Order: ${order}`,
								media: image,
							};
						},
					},
				},
			],
		}),
	],
	preview: {
		select: {
			menuType: "menuType",
			showLogo: "showLogo",
		},
		prepare({ menuType, showLogo }) {
			const logoStatus = showLogo ? "With Logo" : "No Logo";
			return {
				title: `${menuType} Menu`,
				subtitle: logoStatus,
			};
		},
	},
});
