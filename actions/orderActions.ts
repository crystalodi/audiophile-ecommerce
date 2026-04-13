"use server";

import { writeClient } from "@/sanity/lib/writeClient";
import { fetchCartStockLevels } from "@/sanity/lib/cartApi";
import { revalidatePath } from "next/cache";
import { clearCartId } from "@/actions/cartCookieActions";
import { getCartId } from "@/actions/cartCookieActions";
import validator from "validator";
import { SHIPPING_FEE, VAT_RATE } from "@/lib/constants";
import { fetchOrderById } from "@/sanity/lib/orderApi";

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

function sanitize(value?: string): string {
	if (!value) {
		return "";
	}
	return validator.blacklist(validator.trim(value), "<>");
}

export async function createOrder(cartId: string, formData: OrderFormData) {
	try {
		const ALLOWED_PAYMENT_METHODS = ["E-MONEY", "CASH"] as const;
		if (!ALLOWED_PAYMENT_METHODS.includes(formData.paymentMethod as any)) {
			return { success: false, error: "Invalid payment method" };
		}

		const cookieCartId = await getCartId();
		if (!cookieCartId || cookieCartId !== cartId) {
			return { success: false, error: "Unauthorized" };
		}

		const cart = await fetchCartStockLevels(cartId);
		if (!cart || !cart.items || cart.items.length === 0) {
			return { success: false, error: "Cart is empty or not cart not found" };
		}

		if (cart.status !== "active") {
			return { success: false, error: "Cart is no longer active" };
		}

		const validItems = cart.items.filter(
			(
				item
			): item is {
				productId: string;
				productName: string;
				price: number;
				quantity: number;
				availableStock: number;
			} =>
				item !== null &&
				item.productId !== null &&
				item.productName !== null &&
				item.price !== null &&
				item.quantity !== null &&
				item.availableStock !== null &&
				item.quantity > 0 &&
				item.availableStock > 0 &&
				item.quantity <= item.availableStock
		);

		if (validItems.length === 0) {
			return { success: false, error: "No valid items in cart" };
		}

		const orderItems = validItems.map(item => ({
			product: { _ref: item.productId },
			quantity: item.quantity,
			price: item.price,
			productName: item.productName,
		}));

		const totalAmount = orderItems.reduce(
			(sum, item) => sum + item.quantity * item.price,
			0
		);

		const vatFee = Math.floor(totalAmount * VAT_RATE);
		const grandTotal = totalAmount + vatFee + SHIPPING_FEE;

		const sanitizedData = {
			name: sanitize(formData.name),
			email: validator.normalizeEmail(formData.email) || "",
			phoneNumber: sanitize(formData.phoneNumber),
			address: sanitize(formData.address),
			zipCode: sanitize(formData.zipCode),
			city: sanitize(formData.city),
			country: sanitize(formData.country),
			paymentMethod: formData.paymentMethod,
			eMoneyNumber: sanitize(formData.eMoneyNumber),
			eMoneyPin: sanitize(formData.eMoneyPin),
		};

		const transaction = writeClient.transaction();

		transaction.create({
			_type: "order",
			cart: { _ref: cartId },
			...sanitizedData,
			items: orderItems,
			totalAmount,
			grandTotal,
			paymentStatus:
				sanitizedData.paymentMethod === "CASH" ? "pending" : "completed",
			orderStatus: "processing",
		});

		for (const item of validItems) {
			item.productId &&
				transaction.patch(item.productId, {
					dec: { stock: item.quantity },
				});
		}

		transaction.patch(cartId, {
			ifRevisionID: cart._rev,
			set: { status: "converted_to_order" },
		});

		const transactionResult = await transaction.commit({
			autoGenerateArrayKeys: true,
		});
		const newOrderAction = transactionResult.results.find(
			action => action.operation === "create"
		);

		await clearCartId();
		revalidatePath("/");
		return {
			success: true,
			data: transactionResult,
			newOrderId: newOrderAction?.id,
			droppedItems: cart.items.length - validItems.length,
		};
	} catch (error) {
		console.error("Error creating order:", error);
		return { success: false, error: "Failed to create order" };
	}
}

export async function getOrderConfirmation(orderId: string) {
	return await fetchOrderById(orderId);
}
