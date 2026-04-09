import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export async function fetchCart(cartId: string) {
	const CART_BY_ID_QUERY = defineQuery(`
	*[_type == "cart" && _id == $cartId][0] {
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
			_createdAt
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
