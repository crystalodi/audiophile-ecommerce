"use client";

import { useEffect } from "react";
import { useCartDataStore, CartData } from "@/store/cartDataStore";
import { useCartStore } from "@/store/cartStore";
import { client } from "@/sanity/lib/client";
import { fetchCart } from "@/sanity/lib/cartApi";

export default function CartInitializerClient() {
	const { initializeCart } = useCartDataStore();
	const { cartId, hasHydrated } = useCartStore();

	useEffect(() => {
		if (!cartId || !hasHydrated) return;

		const fetchAndInitializeCart = async () => {
			const cart = await fetchCart(cartId);

			if (cart) {
				initializeCart(cart);
			}
		};

		fetchAndInitializeCart();
	}, [cartId, hasHydrated, initializeCart]);

	useEffect(() => {
		if (!cartId || !hasHydrated) return;

		const subscription = client
			.listen<CartData>(
				`*[_type == "cart" && _id == "${cartId}"] {
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
				}`
			)
			.subscribe(update => {
				if (update.result) {
					initializeCart(update.result);
				}
			});

		return () => subscription.unsubscribe();
	}, [cartId, hasHydrated, initializeCart]);

	return null;
}
