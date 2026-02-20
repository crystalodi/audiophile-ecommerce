import {
	defineType,
	defineField,
	defineArrayMember,
	ValidationContext,
} from "sanity";
import { BasketIcon } from "@sanity/icons";

const eMoneyValidatorFn = (
	value: string | undefined,
	context: ValidationContext
) => {
	const document = context.document;
	const paymentMethod = document?.paymentMethod;
	if (paymentMethod === "E-MONEY" && !value) {
		return "Field is required when payment method is e-Money";
	}
	return true;
};

export const orderType = defineType({
	name: "order",
	title: "Orders",
	type: "document",
	icon: BasketIcon,
	description: "Carts that have been converted to orders via checkout",
	fields: [
		defineField({
			name: "cart",
			title: "Cart Reference",
			type: "reference",
			to: [{ type: "cart" }],
			description: "Reference to the original cart",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "email",
			title: "Email",
			type: "email",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "phoneNumber",
			title: "Phone Number",
			type: "string",
			validation: Rule =>
				Rule.required()
					.regex(/^\+\d{1,4}\d{3}-\d{3}-\d{4}$/, {
						name: "phone number format",
						invert: false,
					})
					.error("Invalid Phone Number format"),
		}),
		defineField({
			name: "address",
			title: "Address",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "zipCode",
			title: "ZIP Code",
			type: "string",
			validation: Rule =>
				Rule.required()
					.length(5)
					.regex(/^\d{5}$/, {
						name: "ZIP Code format",
						invert: false,
					})
					.error("Invalid ZIP Code format"),
		}),
		defineField({
			name: "city",
			title: "City",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "country",
			title: "Country",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "items",
			title: "Order Items",
			type: "array",
			description: "Snapshot of items at time of order",
			validation: Rule => Rule.required().min(1),
			of: [
				defineArrayMember({
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
							name: "quantity",
							title: "Quantity",
							type: "number",
							validation: Rule => Rule.required().min(1),
						}),
						defineField({
							name: "price",
							title: "Price at Purchase",
							type: "number",
							description: "Price when order was placed",
							validation: Rule => Rule.required().min(0),
						}),
						defineField({
							name: "productName",
							title: "Product Name",
							type: "string",
							validation: Rule => Rule.required(),
						}),
					],
					preview: {
						select: {
							product: "productName",
							quantity: "quantity",
							price: "price",
						},
						prepare({ product, quantity, price }) {
							return {
								title: product,
								subtitle: `Qty: ${quantity} × $${price}`,
							};
						},
					},
				}),
			],
		}),
		defineField({
			name: "totalAmount",
			title: "Total Amount",
			type: "number",
			validation: Rule => Rule.required().min(0),
		}),
		defineField({
			name: "paymentMethod",
			title: "Payment Method",
			type: "string",
			options: {
				list: [
					{ title: "Cash on Delivery", value: "CASH" },
					{ title: "e-Money", value: "E-MONEY" },
				],
			},
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "eMoneyNumber",
			title: "e-Money Number",
			type: "string",
			hidden: ({ document }) => {
				const paymentMethod = document?.paymentMethod;
				return paymentMethod === "CASH";
			},
			validation: Rule =>
				Rule.custom(eMoneyValidatorFn)
					.length(9)
					.regex(/^\d{9}$/, {
						name: "eMoney number format",
						invert: false,
					})
					.error("Invalid e-Money number."),
		}),
		defineField({
			name: "eMoneyPin",
			title: "e-Money Pin",
			type: "string",
			hidden: ({ document }) => {
				const paymentMethod = document?.paymentMethod;
				return paymentMethod === "CASH";
			},
			validation: Rule =>
				Rule.custom(eMoneyValidatorFn)
					.length(4)
					.regex(/^\d{4}$/, {
						invert: false,
						name: "eMoney pin format",
					})
					.error("Invalid eMoney pin"),
		}),
		defineField({
			name: "paymentStatus",
			title: "Payment Status",
			type: "string",
			options: {
				list: [
					{ title: "Pending", value: "pending" },
					{ title: "Completed", value: "completed" },
				],
			},
			initialValue: "pending",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "orderStatus",
			title: "Order Status",
			type: "string",
			options: {
				list: [
					{ title: "Processing", value: "processing" },
					{ title: "Shipped", value: "shipped" },
					{ title: "Delivered", value: "delivered" },
					{ title: "Cancelled", value: "cancelled" },
				],
			},
			initialValue: "processing",
			validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			name: "name",
			email: "email",
			total: "totalAmount",
			status: "orderStatus",
		},
		prepare({ name, email, total, status }) {
			return {
				title: `${name} - ${email}`,
				subtitle: `$${total} - ${status}`,
			};
		},
	},
});
