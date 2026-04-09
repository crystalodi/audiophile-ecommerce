import { useMemo } from "react";
import { useCartDataStore } from "@/store/cartDataStore";
import { urlFor } from "@/sanity/lib/image";

export function useCartProducts() {
	const cartItems = useCartDataStore(state => state.cartData?.items);

	return useMemo(() => {
		return (
			cartItems?.map(item => ({
				_id: item.product._id,
				productName: item.product.productName,
				cartImage: urlFor(item.product.cartImage.asset).url(),
				_key: item._key,
				price: item.product.price,
				quantity: item.quantity,
				cartDisplayName: item.product.cartDisplayName,
			})) ?? []
		);
	}, [cartItems]);
}
