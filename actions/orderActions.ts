"use server";

import { writeClient } from "@/sanity/lib/writeClient";
import { fetchCart } from "@/sanity/lib/cartApi";
import { revalidatePath } from "next/cache";
import { clearCartId } from "@/actions/cartCookieActions";

interface OrderFormData {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	zipCode: string;
	city: string;
	country: string;
	paymentMethod: string;
	eMoneyNumber?: string;
	eMoneyPin?: string;
}

export async function createOrder(cartId: string, formData: OrderFormData) {
	try {
		const cart = await fetchCart(cartId);
		if (!cart || !cart.items || cart.items.length === 0) {
			return { success: false, error: "Cart is empty or not cart not found" };
		}

		if (cart.status !== "active") {
			return { success: false, error: "Cart is no longer active" };
		}

		const validItems = cart.items.filter(
			item =>
				item.product !== null && item.quantity !== null && item.quantity > 0
		);

		if (validItems.length === 0) {
			return { success: false, error: "No valid items in cart" };
		}

		const orderItems = validItems.map(item => ({
			product: { _ref: item.product!._id },
			quantity: item.quantity!,
			price: item.product!.price,
			productName: item.product!.productName,
		}));

		const totalAmount = orderItems.reduce(
			(sum, item) => sum + item.quantity * item.price,
			0
		);

		const transaction = writeClient.transaction();

		transaction.create({
			_type: "order",
			cart: { _ref: cartId },
			name: formData.name,
			email: formData.email,
			phoneNumber: formData.phoneNumber,
			address: formData.address,
			zipCode: formData.zipCode,
			city: formData.city,
			country: formData.country,
			items: orderItems,
			totalAmount,
			paymentMethod: formData.paymentMethod,
			eMoneyNumber: formData.eMoneyNumber || undefined,
			eMoneyPin: formData.eMoneyPin || undefined,
			paymentStatus:
				formData.paymentMethod === "CASH" ? "pending" : "completed",
			orderStatus: "processing",
		});

		for (const item of validItems) {
			item.product!._id &&
				transaction.patch(item.product!._id, {
					dec: { stock: item.quantity ?? 0 },
				});
		}

		transaction.patch(cartId, {
			set: { status: "converted_to_order" },
		});

		const result = await transaction.commit({ autoGenerateArrayKeys: true });
		await clearCartId();
		revalidatePath("/");
		return { success: true, data: result };
	} catch (error) {
		console.error("Error creating order:", error);
		return { success: false, error: "Failed to create order" };
	}
}
