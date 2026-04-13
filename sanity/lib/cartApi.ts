import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export async function fetchCart(cartId: string) {
	const CART_BY_ID_QUERY = defineQuery(`
	*[_type == "cart" && _id == $cartId && status == "active"][0] {
			_id,
			items[] {
				product-> {
					_id,
					productName,
					price,
					cartImage,
					"cartDisplayName": coalesce(cartDisplayName, shortName)
				},
				quantity,
				reservedAt,
				_key
			},
			status,
			_createdAt,
    }
	`);

	try {
		const result = await sanityFetch({
			query: CART_BY_ID_QUERY,
			params: { cartId },
		});
		return result.data || null;
	} catch (error) {
		console.error("Error fetching cart:", error);
		return null;
	}
}

export async function fetchCartStockLevels(cartId: string) {
	const CART_STOCK_QUERY = defineQuery(`
	*[_type == "cart" && _id == $cartId && status == "active"][0]{
			_rev,
			status,
			items[]{
				"productId": product->._id,
				"price": product->.price,
				"productName": product->.productName,
				quantity,
				"availableStock": product->.stock - coalesce(
					math::sum(
						*[_type == "cart" && status == "active" && _id != $cartId]
							.items[product._ref == ^.product->._id].quantity
					),
					0
				)
			}
		}
  `);

	try {
		const result = await sanityFetch({
			query: CART_STOCK_QUERY,
			params: { cartId },
		});
		return result.data || null;
	} catch (error) {
		console.error("Error fetching cart stock levels:", error);
		return null;
	}
}
