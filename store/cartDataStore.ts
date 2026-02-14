"use client";

import { create } from "zustand";
import { fetchCart } from "@/sanity/lib/cartApi";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/sanity.types";

export interface CartData {
	_id: string;
	items: {
		product: {
			_id: string;
			productName: string;
			price: number;
			cartImage: Product["cartImage"];
		};
		quantity: number;
		reservedAt: string;
	}[];
	status: string;
	createdAt: string;
	expiresAt: string;
}

interface CartDataStore {
	cartData: CartData | null;
	totalItems: number;
	cartTotal: number;
	vatTotal: number;
	grandTotal: number;
	shippingFee: number;
	initializeCart: (cart: CartData) => void;
	refreshCart: () => Promise<void>;
}

const VAT_RATE = 0.2;

export const useCartDataStore = create<CartDataStore>()((set, get) => ({
	cartData: null,
	totalItems: 0,
	cartTotal: 0,
	vatTotal: 0,
	grandTotal: 0,
	shippingFee: 50,
	initializeCart: (cart: CartData) => {
		set({
			cartData: cart,
		});
	},

	refreshCart: async () => {
		const { cartId } = useCartStore.getState();
		const updatedCart = await fetchCart(cartId);

		set({
			cartData: updatedCart,
		});
	},
}));
