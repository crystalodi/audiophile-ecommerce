"use client";

import { useEffect } from "react";
import { useCartDataStore } from "@/store/cartDataStore";
import { useCartStore } from "@/store/cartStore";
import { CART_BY_ID_QUERYResult } from "@/sanity.types";
import { clearCartId } from "@/actions/cartCookieActions";

interface CartInitializerClientProps {
	initialCartId: string | null;
	initialCart: CART_BY_ID_QUERYResult | null;
}

export default function CartInitializerClient({
	initialCartId,
	initialCart,
}: CartInitializerClientProps) {
	const initializeCart = useCartDataStore(state => state.initializeCart);
	const setCartId = useCartStore(state => state.setCartId);
	const clearCart = useCartDataStore(state => state.clearCart);

	useEffect(() => {
		if (initialCartId) {
			setCartId(initialCartId);
		}
		if (initialCart) {
			initializeCart(initialCart);
		} else if (!initialCartId) {
			clearCart();
			clearCartId();
		}
	}, [initialCartId, initialCart, setCartId, initializeCart, clearCart]);

	return null;
}
