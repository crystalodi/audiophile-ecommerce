import { BasketIcon } from "@sanity/icons";
import { defineType, defineField, defineArrayMember } from "sanity";

export const cartType = defineType({
	title: "Cart",
	name: "cart",
	type: "document",
	icon: BasketIcon,
	fields: [
		defineField({
			name: "items",
			title: "items",
			description: "Items added to this cart",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							name: "product",
							title: "Product Added To Cart",
							type: "reference",
							to: [{ type: "product" }],
						}),
						defineField({
							name: "quantity",
							title: "Quantity Added To Cart",
							type: "number",
						}),
						defineField({
							name: "reservedAt",
							title: "Reserved At",
							type: "datetime",
							description: "When this item was reserved",
						}),
					],
					preview: {
						select: {
							product: "product.productName",
							quantity: "quantity",
							image: "product.cartImage",
							price: "product.price",
						},
						prepare(select) {
							return {
								title: `${select.product} x ${select.quantity}`,
								subtitle: `${select.price * select.quantity}`,
								media: select.image,
							};
						},
					},
				}),
			],
		}),
		defineField({
			name: "status",
			title: "Cart Status",
			description:
				"Describes the status of the cart. Active - Cart has not expired; Expired - Cart has expired after 24 hours; Converted to Order - Items have been ordered via checkout",
			type: "string",
			options: {
				list: [
					{ title: "Active", value: "active" },
					{ title: "Expired", value: "expired" },
					{ title: "Converted to Order", value: "converted_to_order" },
				],
			},
			initialValue: "active",
		}),
		defineField({
			name: "createdAt",
			title: "Created At",
			type: "datetime",
			description: "When the cart was created",
		}),
		defineField({
			name: "expiresAt",
			title: "Expires At",
			type: "datetime",
			description: "When the cart expires (24 hours from creation)",
		}),
	],
	preview: {
		select: {
			status: "status",
			createdAt: "createdAt",
			items: "items",
		},
		prepare({ status, createdAt, items }) {
			const itemCount = items?.length || 0;
			const totalItems =
				items?.reduce(
					(sum: number, item: any) => sum + (item.quantity || 0),
					0
				) || 0;
			const totalPrice =
				items?.reduce(
					(sum: number, item: any) =>
						sum + (item.product?.price || 0) * (item.quantity || 0),
					0
				) || 0;
			const formattedDate = createdAt
				? new Date(createdAt).toLocaleDateString()
				: "N/A";

			return {
				title: `Cart - ${status} - $${totalPrice.toFixed(2)}`,
				subtitle: `${itemCount} products (${totalItems} items) - Created: ${formattedDate}`,
			};
		},
	},
});
