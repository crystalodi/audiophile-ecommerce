import { client } from "@/sanity/lib/client";
import { CartItem } from "@/store/cartStore";

// API Functions
export async function createCart(items: CartItem[]) {
	const response = await client.create({
		_type: "cart",
		items: items.map(item => ({
			product: { _ref: item._id },
			quantity: item.quantity,
			reservedAt: new Date().toISOString(),
		})),
		status: "active",
		createdAt: new Date().toISOString(),
		expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
	});
	return response;
}

export async function addItemToCart(cartId: string, item: CartItem) {
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
}

export async function updateCartItemQuantity(cartId: string, item: CartItem) {
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
}

export async function removeItemFromCart(cartId: string, productId: string) {
	const cart = await client.fetch(`*[_type == "cart" && _id == $cartId][0]`, {
		cartId,
	});
	const filteredItems = cart.items.filter(
		(item: any) => item.product._ref !== productId
	);

	await client.patch(cartId).set({ items: filteredItems }).commit();
}

export async function deleteCart(cartId: string) {
	await client.delete(cartId);
}

export async function fetchCart(cartId: string) {
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
                createdAt,
                expiresAt
            }`,
		{ cartId }
	);
	return cart;
}
