"use server";

import { writeClient } from "@/sanity/lib/writeClient";
import { CartItem } from "@/store/cartStore";
import { revalidatePath } from "next/cache";
import { clearCartId } from "@/actions/cartCookieActions";

export async function createCart(items: CartItem[]) {
	try {
		const document = {
			_type: "cart",
			items: items.map(item => ({
				product: { _ref: item._id },
				quantity: item.quantity,
				reservedAt: new Date().toISOString(),
			})),
			status: "active",
		};
		const result = await writeClient.create(document, {
			autoGenerateArrayKeys: true,
		});
		revalidatePath("/");
		return { success: true, data: result };
	} catch (error) {
		console.error("Error creating cart:", error);
		return { success: false, error: "Failed to create cart" };
	}
}

export async function addItemToCart(cartId: string, item: CartItem) {
	try {
		if (item._key) {
			await writeClient
				.patch(cartId)
				.set({
					[`items[_key=="${item._key}"].quantity`]: item.quantity,
				})
				.commit();
		} else {
			await writeClient
				.patch(cartId)
				.setIfMissing({ items: [] })
				.append("items", [
					{
						product: { _ref: item._id },
						quantity: item.quantity,
						reservedAt: new Date().toISOString(),
					},
				])
				.commit({ autoGenerateArrayKeys: true });
		}
		revalidatePath("/");
	} catch (error) {
		console.error("Error adding item to cart:", error);
	}
}

export async function expireCart(cartId: string) {
	try {
		await writeClient.patch(cartId).set({ status: "expired" }).commit();
		await clearCartId();
		console.log(`Cart ${cartId} expired`);
		revalidatePath("/");
	} catch (error) {
		console.error("Error expiring cart:", error);
		throw error;
	}
}

export async function clearCart(cartId: string) {
	try {
		await writeClient.transaction().delete(cartId).commit();
		await clearCartId();
		revalidatePath("/");
	} catch (error) {
		console.error("Error deleting cart:", error);
	}
}

export async function updateQuantity(cartId: string, item: CartItem) {
	if (!item._key) {
		console.error("Item does not have a _key");
		return;
	}
	try {
		await writeClient
			.patch(cartId)
			.set({
				[`items[_key=="${item._key}"].quantity`]: item.quantity,
			})
			.commit();
		revalidatePath("/");
	} catch (error) {
		console.error("Error updating item quantity:", error);
	}
}

export async function deleteCartItem(cartId: string, _key: string) {
	try {
		await writeClient
			.patch(cartId)
			.unset([`items[_key=="${_key}"]`])
			.commit();
		revalidatePath("/");
	} catch (error) {
		console.error("Error deleting item from cart", error);
	}
}
