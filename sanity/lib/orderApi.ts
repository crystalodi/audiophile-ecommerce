"use server";

import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export async function fetchOrderById(orderId: string) {
	const ORDER_BY_ID_QUERY = defineQuery(`
    *[_type == "order" && _id == $orderId][0]{
      items[]{
        productName,
        price,
        quantity,
        "cartImage": product->.cartImage,
        "cartDisplayName": coalesce(product->.cartDisplayName, product->.shortName),
        _key,
        "productId": product->._id
      },
      grandTotal
    }
  `);

	const result = await sanityFetch({
		query: ORDER_BY_ID_QUERY,
		params: { orderId },
	});
	return result.data || null;
}
