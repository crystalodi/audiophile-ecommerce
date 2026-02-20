import { client } from "@/sanity/lib/client";
import { CartItem } from "@/store/cartStore";

// API Functions
export async function createCart(items: CartItem[]) {
	try {
		const response = await client.create({
			_type: "cart",
			items: items.map(item => ({
				product: { _ref: item._id },
				quantity: item.quantity,
				reservedAt: new Date().toISOString(),
			})),
			status: "active",
		});
		return response;
	} catch (error) {
		console.error("Error creating cart:", error);
		throw error;
	}
}

export async function addItemToCart(cartId: string, item: CartItem) {
	try {
		// First check if item already exists
		const cart = await client.fetch(`*[_type == "cart" && _id == $cartId][0]`, {
			cartId,
		});
		const existingItemIndex = cart.items.findIndex(
			(i: any) => i.product._ref === item._id
		);

		if (existingItemIndex >= 0) {
			// Update existing item quantity
			await client
				.patch(cartId)
				.set({
					[`items[${existingItemIndex}].quantity`]:
						cart.items[existingItemIndex].quantity + item.quantity,
				})
				.commit();
		} else {
			// Add new item
			await client
				.patch(cartId)
				.setIfMissing({ items: [] })
				.append("items", [
					{
						product: { _ref: item._id },
						quantity: item.quantity,
						reservedAt: new Date().toISOString(),
					},
				])
				.commit();
		}
	} catch (error) {
		console.error("Error adding item to cart:", error);
		throw error;
	}
}

export async function updateCartItemQuantity(cartId: string, item: CartItem) {
	try {
		const cart = await client.fetch(`*[_type == "cart" && _id == $cartId][0]`, {
			cartId,
		});
		const itemIndex = cart.items.findIndex(
			(i: any) => i.product._ref === item._id
		);

		if (itemIndex >= 0) {
			if (item.quantity === 0) {
				// Remove item if quantity is 0
				await removeItemFromCart(cartId, item._id);
			} else {
				// Update quantity
				await client
					.patch(cartId)
					.set({ [`items[${itemIndex}].quantity`]: item.quantity })
					.commit();
			}
		}
	} catch (error) {
		console.error("Error updating cart item quantity:", error);
		throw error;
	}
}

export async function removeItemFromCart(cartId: string, productId: string) {
	try {
		const cart = await client.fetch(`*[_type == "cart" && _id == $cartId][0]`, {
			cartId,
		});
		const filteredItems = cart.items.filter(
			(item: any) => item.product._ref !== productId
		);

		await client.patch(cartId).set({ items: filteredItems }).commit();
	} catch (error) {
		console.error("Error removing item from cart:", error);
		throw error;
	}
}

export async function deleteCart(cartId: string) {
	try {
		await client.delete(cartId);
	} catch (error) {
		console.error("Error deleting cart:", error);
		throw error;
	}
}

export async function fetchCart(cartId: string) {
	try {
		const cart = await client.fetch(
			`*[_type == "cart" && _id == $cartId][0] {
				_id,
				items[] {
						product-> {
							_id,
							"productName": coalesce(shortName, productName),
							price,
							cartImage
						},
						quantity,
						reservedAt
				},
				status,
				_createdAt
      } `,
			{ cartId }
		);
		return cart;
	} catch (error) {
		console.error("Error fetching cart:", error);
		return null;
	}
}

export async function expireCart(cartId: string) {
	try {
		await client.patch(cartId).set({ status: "expired" }).commit();
		console.log(`Cart ${cartId} expired`);
	} catch (error) {
		console.error("Error expiring cart:", error);
		throw error;
	}
}
